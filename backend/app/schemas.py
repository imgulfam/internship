

from pydantic import BaseModel, Field, ConfigDict # FIXED: Import ConfigDict
from typing import Annotated
from datetime import datetime

AadhaarStr = Annotated[str, Field(pattern=r"^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$")]
NameStr = Annotated[str, Field(min_length=2)]
PanStr = Annotated[str, Field(pattern=r"^[A-Z]{5}[0-9]{4}[A-Z]{1}$")]

class RegistrationBase(BaseModel):
    aadhaar_number: AadhaarStr
    name_as_per_aadhaar: NameStr
    pan_number: PanStr

class RegistrationCreate(RegistrationBase):
    pass

class Registration(RegistrationBase):
    id: int
    submitted_at: datetime

    # FIXED: Using model_config instead of class Config
    model_config = ConfigDict(from_attributes=True)