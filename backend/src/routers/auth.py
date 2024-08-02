from fastapi import APIRouter, Depends, status, HTTPException
from sqlalchemy.orm import Session

from src.dependencies import get_db
from src.db.models import Official
from src.models.auth import TokenForm
from src.auth import create_access_token

# Router
router = APIRouter()

@router.post("/token", tags=["Auth Service"])
async def login_for_access_token(
    form_data: TokenForm,
    db: Session = Depends(get_db),
):
    official = db.query(Official).filter(Official.name == form_data.name, Official.number == form_data.number).first()
    if not official:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales inválidas",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token = create_access_token(data={"sub": official.name, "num": official.number})
    return {"access_token": access_token, "token_type": "bearer"}
