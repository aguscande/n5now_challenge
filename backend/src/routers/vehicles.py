from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from src.db.models import Person
from src.models.vehicle import Vehicle, VehicleCreate
from src.crud.vehicle import get_vehicle, get_vehicles, create_vehicle, update_vehicle, delete_vehicle
from src.dependencies import get_db

router = APIRouter()

@router.post("/vehicles", response_model=Vehicle)
def create_vehicle_endpoint(vehicle: VehicleCreate, db: Session = Depends(get_db)):
    # Check if the owner_id exists in the Person table
    owner = db.query(Person).filter(Person.id == vehicle.owner_id).first()
    if not owner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"La Persona con el id '{vehicle.owner_id}' no existe."
        )
    
    # Create the vehicle if owner_id is valid
    return create_vehicle(db=db, vehicle=vehicle)

@router.get("/vehicles", response_model=List[Vehicle])
def read_vehicles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_vehicles(db=db, skip=skip, limit=limit)

@router.get("/vehicles/{vehicle_id}", response_model=Vehicle)
def read_vehicle(vehicle_id: int, db: Session = Depends(get_db)):
    db_vehicle = get_vehicle(db=db, vehicle_id=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

@router.put("/vehicles/{vehicle_id}", response_model=Vehicle)
def update_vehicle_endpoint(vehicle_id: int, vehicle: VehicleCreate, db: Session = Depends(get_db)):
    # Check if the owner_id exists in the Person table
    owner = db.query(Person).filter(Person.id == vehicle.owner_id).first()
    if not owner:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"La Persona con el id '{vehicle.owner_id}' no existe."
        )
    
    db_vehicle = update_vehicle(db=db, vehicle_id=vehicle_id, vehicle=vehicle)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle

@router.delete("/vehicles/{vehicle_id}", response_model=Vehicle)
def delete_vehicle_endpoint(vehicle_id: int, db: Session = Depends(get_db)):
    db_vehicle = delete_vehicle(db=db, vehicle_id=vehicle_id)
    if db_vehicle is None:
        raise HTTPException(status_code=404, detail="Vehicle not found")
    return db_vehicle
