
# from sqlalchemy import create_engine
# from sqlalchemy.orm import sessionmaker, declarative_base # FIXED: Updated import path

# # TODO: Replace with your actual PostgreSQL connection string
# SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Gulfam%402003@localhost:5432/mydatabase"

# engine = create_engine(SQLALCHEMY_DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# # Using the modern import path
# Base = declarative_base()


import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load environment variables from .env file
load_dotenv()

# Get PostgreSQL connection string from environment
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

if not SQLALCHEMY_DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable not set in .env file")

# Create SQLAlchemy engine
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()
