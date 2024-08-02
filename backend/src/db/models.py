from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
try:
    from src.db.database import Base
except ImportError:
    from database import Base

# Define models
class Person(Base):
    __tablename__ = "persons"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    email = Column(String, nullable=False, unique=True)
    vehicles = relationship('Vehicle', back_populates='owner', cascade='all, delete-orphan')

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    license_plate = Column(String, index=True, nullable=False, unique=True)
    brand = Column(String, nullable=False)
    color = Column(String, nullable=False)
    owner_id = Column(Integer, ForeignKey('persons.id', ondelete='CASCADE'), nullable=False)
    owner = relationship("Person", back_populates='vehicles', single_parent=True)
    infractions = relationship('Infraction', back_populates='vehicle', cascade='all, delete-orphan')

class Official(Base):
    __tablename__ = "officials"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, nullable=False)
    number = Column(Integer, nullable=False, unique=True)

class Infraction(Base):
    __tablename__ = "infractions"

    id = Column(Integer, primary_key=True, index=True)
    placa_patente = Column(String, ForeignKey('vehicles.license_plate', ondelete='CASCADE'), nullable=False)
    timestamp = Column(Integer, nullable=False)
    comentarios = Column(String, nullable=False)
    vehicle = relationship('Vehicle', back_populates='infractions', single_parent=True)
