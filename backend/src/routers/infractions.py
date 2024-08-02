from fastapi import APIRouter, Depends, Query, HTTPException, status
from pydantic import EmailStr
from sqlalchemy.orm import Session
from src.db.models import Infraction, Person, Vehicle
from src.models.infraction import InfractionCreate
from src.crud.infraction import create_infraction
from src.dependencies import get_db
from src.auth import get_current_user

router = APIRouter()

@router.post("/cargar_infraccion", dependencies=[Depends(get_current_user)], tags=["Infractions Service"])
async def create_infraction_endpoint(infraction: InfractionCreate, db: Session = Depends(get_db)):
    try:
        # Check if the license plate exists
        vehicle = db.query(Vehicle).filter(Vehicle.license_plate == infraction.placa_patente).first()
        if not vehicle:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"La placa {infraction.placa_patente} no está asociada a ningun vehículo."
            )
        return create_infraction(db=db, infraction=infraction)
    except HTTPException as e:
        # Re-raise HTTP exceptions
        raise e
    except Exception as e:
        # Handle unknown errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Un error inesperado ha ocurrido: {str(e)}"
        )

@router.get("/generar_informe", tags=["Infractions Service"])
async def generate_report(email: EmailStr = Query(..., description="Email para consultar el listado de infracciones de cualquier vehículo a su nombre."), db: Session = Depends(get_db)):
    try:
        # Fetch the person by email
        person = db.query(Person).filter(Person.email == email).first()
        if not person:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Email '{email}' no encontrado."
            )

        # Fetch vehicles and associated infractions
        vehicles = db.query(Vehicle).filter(Vehicle.owner_id == person.id).all()
        if not vehicles:
            return {"message": "Este email no tiene vehiculos registrados."}

        result: list = []
        for vehicle in vehicles:
            infractions = db.query(Infraction).filter(Infraction.placa_patente == vehicle.license_plate).all()

            if infractions:
                vehicle_info = {
                    "license_plate": vehicle.license_plate,
                    "brand": vehicle.brand,
                    "color": vehicle.color,
                    "infractions": [infraction for infraction in infractions],
                }
                result.append(vehicle_info)

        return result
    except HTTPException as e:
        # Re-raise HTTP exceptions
        raise e
    except Exception as e:
        # Handle unknown errors
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error interno: {str(e)}"
        )
