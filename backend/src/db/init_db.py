from database import engine, Base
from models import Person, Official, Vehicle, Infraction

# Create all tables in the database
Base.metadata.create_all(bind=engine)