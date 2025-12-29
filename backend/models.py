from sqlalchemy import Column, Integer, String, JSON
from db import Base

class Recipe(Base):
    __tablename__ = "recipes"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    ingredients = Column(JSON, nullable=False)
    steps = Column(JSON, nullable=False)