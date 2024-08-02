from pydantic import BaseModel

class InfractionBase(BaseModel):
    placa_patente: str
    timestamp: int
    comentarios: str

class InfractionCreate(InfractionBase):
    pass

class Infraction(InfractionBase):
    id: int

    class Config:
        orm_mode = True