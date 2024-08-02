from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.models.person import Person, PersonCreate
from src.crud.person import get_person, get_persons, create_person, update_person, delete_person
from src.dependencies import get_db

router = APIRouter()

@router.post("/persons", response_model=Person)
def create_person_endpoint(person: PersonCreate, db: Session = Depends(get_db)):
    return create_person(db=db, person=person)

@router.get("/persons", response_model=List[Person])
def read_persons(skip: int = 0, limit: int = 10, db: Session = Depends(get_db)):
    return get_persons(db=db, skip=skip, limit=limit)

@router.get("/persons/{person_id}", response_model=Person)
def read_person(person_id: int, db: Session = Depends(get_db)):
    db_person = get_person(db=db, person_id=person_id)
    if db_person is None:
        raise HTTPException(status_code=404, detail="Person not found")
    return db_person

@router.put("/persons/{person_id}", response_model=Person)
def update_person_endpoint(person_id: int, person: PersonCreate, db: Session = Depends(get_db)):
    db_person = update_person(db=db, person_id=person_id, person=person)
    if db_person is None:
        raise HTTPException(status_code=404, detail="Person not found")
    return db_person

@router.delete("/persons/{person_id}", response_model=Person)
def delete_person_endpoint(person_id: int, db: Session = Depends(get_db)):
    db_person = delete_person(db=db, person_id=person_id)
    if db_person is None:
        raise HTTPException(status_code=404, detail="Person not found")
    return db_person
