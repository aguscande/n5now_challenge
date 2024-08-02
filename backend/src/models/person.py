from pydantic import BaseModel

class PersonBase(BaseModel):
    name: str
    email: str

class PersonCreate(PersonBase):
    pass

class Person(PersonBase):
    id: int

    class Config:
        orm_mode = True