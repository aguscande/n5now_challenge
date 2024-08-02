from pydantic import BaseModel

class VehicleBase(BaseModel):
    license_plate: str
    brand: str
    color: str
    owner_id: int

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: int

    class Config:
        orm_mode = True