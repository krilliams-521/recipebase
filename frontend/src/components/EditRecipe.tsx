import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import type { Recipe } from '../interfaces/Recipe';

const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const [initialRecipe, setInitialRecipe] = useState<Recipe | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`http://localhost:3000/recipes/${id}`);
        if (!res.ok) throw new Error('Failed to fetch recipe');
        const data = await res.json();
        setInitialRecipe(data);
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

  const handleEdit = async (recipe: Omit<Recipe, 'id'>) => {
    setSubmitLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...recipe, id: Number(id) }),
      });
      if (!res.ok) throw new Error('Failed to update recipe');
      navigate(`/recipes/${id}`);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setSubmitError(err.message);
      } else {
        setSubmitError('An unknown error occurred');
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !initialRecipe) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-10">
        <p className="text-red-500">{error || 'Recipe not found.'}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Edit Recipe</h2>
      <RecipeForm
        initialRecipe={initialRecipe}
        onSubmit={handleEdit}
        loading={submitLoading}
        error={submitError}
      />
    </div>
  );
};

export default EditRecipe;
