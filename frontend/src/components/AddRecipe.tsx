import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import RecipeForm from './RecipeForm';

const AddRecipe = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAdd = async (recipe: Omit<import("../interfaces/Recipe").Recipe, 'id'>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:3000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(recipe),
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
      <RecipeForm onSubmit={handleAdd} loading={loading} error={error} />
    </div>
  );
};

export default AddRecipe;