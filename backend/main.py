from fastapi import FastAPI

app = FastAPI(title="RecipeBase API")

@app.get("/health")
def health_check():
    return {"status": "ok"}