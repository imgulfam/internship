

from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from .database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    aadhaar_number = Column(String(12), unique=True, nullable=False)
    name_as_per_aadhaar = Column(String, nullable=False)
    pan_number = Column(String(10), unique=True, nullable=False)
    submitted_at = Column(DateTime(timezone=True), server_default=func.now())