import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Recipe } from '../interfaces/Recipe';

const RecipeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setRecipe(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-red-500">{error}</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back
        </Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-red-500">Recipe not found.</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Go back
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800">{recipe.title}</h2>

      <h3 className="mt-6 text-xl font-semibold text-gray-700">Ingredients</h3>
      <ul className="list-disc list-inside text-gray-600 mt-2">
        {recipe.ingredients.map((ing, idx) => (
          <li key={idx}>{ing}</li>
        ))}
      </ul>

      <h3 className="mt-6 text-xl font-semibold text-gray-700">Steps</h3>
      <ol className="list-decimal list-inside text-gray-600 mt-2 space-y-1">
        {recipe.steps.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>

      <div className="flex gap-4 mt-8">
        <Link
          to="/"
          className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
        >
          Back to Recipes
        </Link>
        <Link
          to={`/edit-recipe/${recipe.id}`}
          className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
        >
          Edit Recipe
        </Link>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
          onClick={async () => {
            if (window.confirm('Are you sure you want to delete this recipe?')) {
              try {
                const res = await fetch(`http://localhost:3000/recipes/${recipe.id}`, {
                  method: 'DELETE',
                });
                if (!res.ok) throw new Error('Failed to delete recipe');
                navigate('/');
              } catch {
                alert('Error deleting recipe.');
              }
            }
          }}
        >
          Delete Recipe
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
