from sqlalchemy.orm import Session
from src.models.official import OfficialCreate
from src.db.models import Official

def get_official(db: Session, official_id: int) -> Official | None:
    return db.query(Official).filter(Official.id == official_id).first()

def get_officials(db: Session, skip: int = 0, limit: int = 10) -> list[Official]:
    return db.query(Official).offset(skip).limit(limit).all()

def create_official(db: Session, official: OfficialCreate) -> Official:
    db_official = Official(name=official.name, number=official.number)
    db.add(db_official)
    db.commit()
    db.refresh(db_official)
    return db_official

def update_official(db: Session, official_id: int, official: OfficialCreate) -> Official:
    db_official: Official = db.query(Official).filter(Official.id == official_id).first()
    if db_official:
        db_official.name = official.name
        db_official.number = official.number
        db.commit()
        db.refresh(db_official)
    return db_official

def delete_official(db: Session, official_id: int) -> Official:
    db_official: Official = db.query(Official).filter(Official.id == official_id).first()
    if db_official:
        db.delete(db_official)
        db.commit()
    return db_official
