
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base # FIXED: Updated import path

# TODO: Replace with your actual PostgreSQL connection string
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Gulfam%402003@localhost:5432/mydatabase"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Using the modern import path
Base = declarative_base()


