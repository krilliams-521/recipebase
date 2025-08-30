import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Recipe } from '../interfaces/Recipe';

interface RecipeFormProps {
  initialRecipe?: Recipe;
  onSubmit: (recipe: Omit<Recipe, 'id'>) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const RecipeForm = ({
  initialRecipe,
  onSubmit,
  loading,
  error,
}: RecipeFormProps) => {
  const [title, setTitle] = useState(initialRecipe?.title || '');
  const [ingredients, setIngredients] = useState<string>(
    initialRecipe ? initialRecipe.ingredients.join('\n') : ''
  );
  const [steps, setSteps] = useState<string>(
    initialRecipe ? initialRecipe.steps.join('\n') : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      title,
      ingredients: ingredients
        .split('\n')
        .map((i) => i.trim())
        .filter(Boolean),
      steps: steps
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-gray-700 font-semibold mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Ingredients (one per line)
        </label>
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={5}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-2">
          Steps (one per line)
        </label>
        <textarea
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
          className="w-full border rounded px-3 py-2"
          rows={5}
          required
        />
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save Recipe'}
      </button>
      <Link to="/" className="inline-block ml-4 text-blue-500 hover:underline">
        Cancel
      </Link>
    </form>
  );
};

export default RecipeForm;
