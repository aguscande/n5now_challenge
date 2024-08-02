from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.models.official import Official, OfficialCreate
from src.crud.official import get_official, get_officials, create_official, update_official, delete_official
from src.dependencies import get_db

router = APIRouter()

@router.post("/officials", response_model=Official)
def create_official_endpoint(official: OfficialCreate, db: Session = Depends(get_db)):
    return create_official(db=db, official=official)

@router.get("/officials", response_model=List[Official])
def read_officials(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)) -> List[Official]:
    return get_officials(db=db, skip=skip, limit=limit)

@router.get("/officials/{official_id}", response_model=Official)
def read_official(official_id: int, db: Session = Depends(get_db)):
    db_official = get_official(db=db, official_id=official_id)
    if db_official is None:
        raise HTTPException(status_code=404, detail="Official not found")
    return db_official

@router.put("/officials/{official_id}", response_model=Official)
def update_official_endpoint(official_id: int, official: OfficialCreate, db: Session = Depends(get_db)):
    db_official = update_official(db=db, official_id=official_id, official=official)
    if db_official is None:
        raise HTTPException(status_code=404, detail="Official not found")
    return db_official

@router.delete("/officials/{official_id}", response_model=Official)
def delete_official_endpoint(official_id: int, db: Session = Depends(get_db)) -> Official:
    db_official = delete_official(db=db, official_id=official_id)
    if db_official is None:
        raise HTTPException(status_code=404, detail="Official not found")
    return db_official
