from sqlalchemy.orm import Session
from src.models.vehicle import VehicleCreate
from src.db.models import Vehicle

def get_vehicle(db: Session, vehicle_id: int) -> Vehicle:
    return db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()

def get_vehicles(db: Session, skip: int = 0, limit: int = 10) -> list[Vehicle]:
    return db.query(Vehicle).offset(skip).limit(limit).all()

def create_vehicle(db: Session, vehicle: VehicleCreate) -> Vehicle:
    db_vehicle = Vehicle(
        license_plate=vehicle.license_plate,
        brand=vehicle.brand,
        color=vehicle.color,
        owner_id=vehicle.owner_id,
    )
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle

def update_vehicle(db: Session, vehicle_id: int, vehicle: VehicleCreate) -> Vehicle:
    db_vehicle: Vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if db_vehicle:
        db_vehicle.license_plate = vehicle.license_plate
        db_vehicle.brand = vehicle.brand
        db_vehicle.color = vehicle.color
        db_vehicle.owner_id = vehicle.owner_id
        db.commit()
        db.refresh(db_vehicle)
    return db_vehicle

def delete_vehicle(db: Session, vehicle_id: int) -> Vehicle:
    db_vehicle: Vehicle = db.query(Vehicle).filter(Vehicle.id == vehicle_id).first()
    if db_vehicle:
        db.delete(db_vehicle)
        db.commit()
    return db_vehicle
