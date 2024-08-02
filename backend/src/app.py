from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import IntegrityError
from src.routers import auth, infractions, officials, persons, vehicles

# Create FastAPI app
app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Handle global errors
@app.exception_handler(IntegrityError)
async def integrity_error_handler(request: Request, exc: IntegrityError):
    return JSONResponse(
        status_code=404,
        content={"detail": "Entidad no encontrada."},
    )

app.include_router(auth.router)
app.include_router(infractions.router)
app.include_router(officials.router)
app.include_router(persons.router)
app.include_router(vehicles.router)
