from sqlalchemy.orm import Session
from src.models.person import PersonCreate
from src.db.models import Person

def get_person(db: Session, person_id: int) -> Person:
    return db.query(Person).filter(Person.id == person_id).first()

def get_persons(db: Session, skip: int = 0, limit: int = 10) -> list[Person]:
    return db.query(Person).offset(skip).limit(limit).all()

def create_person(db: Session, person: PersonCreate) -> Person:
    db_person = Person(name=person.name, email=person.email)
    db.add(db_person)
    db.commit()
    db.refresh(db_person)
    return db_person

def update_person(db: Session, person_id: int, person: PersonCreate) -> Person:
    db_person: Person = db.query(Person).filter(Person.id == person_id).first()
    if db_person:
        db_person.name = person.name
        db_person.email = person.email
        db.commit()
        db.refresh(db_person)
    return db_person

def delete_person(db: Session, person_id: int) -> Person:
    db_person: Person = db.query(Person).filter(Person.id == person_id).first()
    if db_person:
        db.delete(db_person)
        db.commit()
    return db_person
