

from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.middleware.cors import CORSMiddleware

from . import models, schemas
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Udyam Registration Form API",
    description="API to handle form submissions mimicking the Udyam portal."
)

origins = ["http://localhost:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/submit", response_model=schemas.Registration)
def create_registration(
    registration: schemas.RegistrationCreate, 
    db: Session = Depends(get_db)
):
    db_user_aadhaar = db.query(models.Registration).filter(models.Registration.aadhaar_number == registration.aadhaar_number).first()
    if db_user_aadhaar:
        raise HTTPException(status_code=400, detail="Aadhaar number already registered.")

    db_user_pan = db.query(models.Registration).filter(models.Registration.pan_number == registration.pan_number).first()
    if db_user_pan:
        raise HTTPException(status_code=400, detail="PAN number already registered.")

    # FIXED: Using model_dump() instead of the deprecated dict()
    db_registration = models.Registration(**registration.model_dump())
    
    db.add(db_registration)
    db.commit()
    db.refresh(db_registration)
    
    return db_registration