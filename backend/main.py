from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from db import SessionLocal, Base, engine
from models import Recipe
from schemas import RecipeCreate, RecipeRead
from typing import List
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="RecipeBase API")

# Add this before your endpoints
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or specify your frontend URL, e.g., ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.get("/recipes/", response_model=List[RecipeRead])
def get_recipes(db: Session = Depends(get_db)):
    return db.query(Recipe).all()

@app.post("/recipes/", response_model=RecipeRead)
def create_recipe(recipe: RecipeCreate, db: Session = Depends(get_db)):
    db_recipe = Recipe(
        title=recipe.title,
        ingredients=recipe.ingredients,
        steps=recipe.steps
    )
    db.add(db_recipe)
    db.commit()
    db.refresh(db_recipe)
    return db_recipe

@app.get("/recipes/{recipe_id}", response_model=RecipeRead)
def get_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    return recipe

@app.delete("/recipes/{recipe_id}", status_code=204)
def delete_recipe(recipe_id: int, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    db.delete(recipe)
    db.commit()
    return

@app.put("/recipes/{recipe_id}", response_model=RecipeRead)
def update_recipe(recipe_id: int, updated: RecipeCreate, db: Session = Depends(get_db)):
    recipe = db.query(Recipe).filter(Recipe.id == recipe_id).first()
    if recipe is None:
        raise HTTPException(status_code=404, detail="Recipe not found")
    recipe.title = updated.title
    recipe.ingredients = updated.ingredients
    recipe.steps = updated.steps
    db.commit()
    db.refresh(recipe)
    return recipe