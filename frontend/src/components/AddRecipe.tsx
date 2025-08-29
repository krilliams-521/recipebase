import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Recipe } from '../interfaces/Recipe';

const AddRecipe = () => {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState<string>('');
  const [steps, setSteps] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const newRecipe: Omit<Recipe, 'id'> = {
      title,
      ingredients: ingredients.split('\n').map(i => i.trim()).filter(Boolean),
      steps: steps.split('\n').map(s => s.trim()).filter(Boolean),
    };
    try {
      const res = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe),
      });
      if (!res.ok) throw new Error('Failed to add recipe');
      navigate('/');
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add New Recipe</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Ingredients (one per line)</label>
          <textarea
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={5}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2">Steps (one per line)</label>
          <textarea
            value={steps}
            onChange={e => setSteps(e.target.value)}
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
          {loading ? 'Adding...' : 'Add Recipe'}
        </button>
        <Link
          to="/"
          className="inline-block ml-4 text-blue-500 hover:underline"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AddRecipe;