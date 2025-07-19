import type { Recipe } from '../interfaces/Recipe';

interface RecipeListProps {
  recipes: Recipe[];
}

const RecipeList: React.FC<RecipeListProps> = ({ recipes }) => {
  return (
    <main className="max-w-5xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {recipe.title}
            </h3>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Ingredients:</strong>{' '}
              {recipe.ingredients.slice(0, 3).join(', ')}...
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {recipe.steps.length} steps
            </p>
          </div>
          <button className="mt-4 self-start bg-black hover:bg-gray-800 text-white text-sm font-medium py-2 px-4 rounded">
            View Details
          </button>
        </div>
      ))}
    </main>
  );
};

export default RecipeList;
