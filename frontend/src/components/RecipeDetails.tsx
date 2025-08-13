import { useParams, Link } from 'react-router-dom';
import type { Recipe } from '../interfaces/Recipe';

interface RecipeDetailsProps {
  recipes: Recipe[];
}

const RecipeDetails = ({ recipes }: RecipeDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const recipe = recipes.find((r) => r.id === Number(id));

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

      <Link
        to="/"
        className="inline-block mt-8 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
      >
        Back to Recipes
      </Link>
    </div>
  );
};

export default RecipeDetails;
