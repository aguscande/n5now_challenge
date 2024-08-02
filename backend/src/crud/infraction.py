from sqlalchemy.orm import Session
from src.models.infraction import InfractionCreate
from src.db.models import Infraction

def create_infraction(db: Session, infraction: InfractionCreate) -> Infraction:
    db_infraction = Infraction(
        placa_patente=infraction.placa_patente,
        timestamp=infraction.timestamp,
        comentarios=infraction.comentarios,
    )
    db.add(db_infraction)
    db.commit()
    db.refresh(db_infraction)
    return db_infraction
