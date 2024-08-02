from pydantic import BaseModel

class OfficialBase(BaseModel):
    name: str
    number: int

class OfficialCreate(OfficialBase):
    pass

class Official(OfficialBase):
    id: int

    class Config:
        orm_mode = True