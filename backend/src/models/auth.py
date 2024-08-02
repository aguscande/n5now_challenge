from pydantic import BaseModel

class TokenForm(BaseModel):
    name: str
    number: int
