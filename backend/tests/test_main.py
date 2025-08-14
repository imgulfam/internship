import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app, get_db
from app.database import Base

# Use an in-memory SQLite database for testing
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base.metadata.create_all(bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def cleanup_db():
    yield
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)

def test_successful_registration():
    """
    Tests a successful submission with valid and unique data.
    """
    response = client.post("/submit", json={
        "aadhaar_number": "345678901234",  # FIXED: Valid Aadhaar starting with '3'
        "name_as_per_aadhaar": "Test User",
        "pan_number": "ABCDE1234F"
    })
    assert response.status_code == 200
    data = response.json()
    assert data["pan_number"] == "ABCDE1234F"

def test_duplicate_pan_registration():
    """
    Tests that submitting a duplicate PAN returns a 400 error.
    """
    client.post("/submit", json={
        "aadhaar_number": "234567890123",
        "name_as_per_aadhaar": "First User",
        "pan_number": "BCDEF2345G"
    })
    response = client.post("/submit", json={
        "aadhaar_number": "345678901234",
        "name_as_per_aadhaar": "Second User",
        "pan_number": "BCDEF2345G"
    })
    assert response.status_code == 400
    assert response.json() == {"detail": "PAN number already registered."}

def test_invalid_pan_format():
    """
    [cite_start]Tests that submitting an invalid PAN format returns a 422 error. [cite: 36]
    """
    response = client.post("/submit", json={
        "aadhaar_number": "456789012345",
        "name_as_per_aadhaar": "Invalid PAN User",
        "pan_number": "INVALIDPAN"
    })
    assert response.status_code == 422
    data = response.json()
    # FIXED: Updated assertion to match the actual Pydantic V2 error message
    assert "String should match pattern" in data["detail"][0]["msg"]