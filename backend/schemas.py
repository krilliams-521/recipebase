from pydantic import BaseModel
from typing import List, Optional

class RecipeBase(BaseModel):
    title: str
    ingredients: List[str]
    steps: List[str]

class RecipeCreate(RecipeBase):
    pass

class RecipeRead(RecipeBase):
    id: int

    class Config:
        orm_mode = True