#!/bin/bash
# filepath: frontend/upload_recipes.sh

API_URL="http://localhost:8000/recipes"

# Path to your db.json file
DB_FILE="db.json"

# Loop through each recipe and POST to the API
jq -c '.recipes[]' "$DB_FILE" | while read -r recipe; do
  curl -X POST "$API_URL/" \
    -H "Content-Type: application/json" \
    -d "$recipe"
  echo # Print a newline for readability
done