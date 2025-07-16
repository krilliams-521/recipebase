import './App.css';

function App() {
  const recipes = [
    {
      id: 1,
      title: 'Spaghetti Carbonara',
      ingredients: ['Spaghetti', 'Eggs', 'Parmesan', 'Pancetta'],
      steps: ['Boil pasta', 'Fry pancetta', 'Mix with eggs & cheese'],
    },
    {
      id: 2,
      title: 'Avocado Toast',
      ingredients: ['Bread', 'Avocado', 'Lemon', 'Chili flakes'],
      steps: ['Toast bread', 'Smash avocado', 'Assemble and top'],
    },
    {
      id: 3,
      title: 'Chicken Stir Fry',
      ingredients: ['Chicken', 'Soy Sauce', 'Broccoli', 'Garlic'],
      steps: ['Slice chicken', 'Sauté veggies', 'Stir everything together'],
    },
    {
      id: 4,
      title: 'Pancakes',
      ingredients: ['Flour', 'Milk', 'Eggs', 'Maple Syrup'],
      steps: ['Mix batter', 'Cook on griddle', 'Serve with syrup'],
    },
    {
      id: 5,
      title: 'Caprese Salad',
      ingredients: ['Tomato', 'Mozzarella', 'Basil', 'Balsamic'],
      steps: ['Slice tomatoes', 'Layer with cheese', 'Drizzle dressing'],
    },
    {
      id: 6,
      title: 'Chili Con Carne',
      ingredients: ['Beef', 'Beans', 'Tomato', 'Spices'],
      steps: ['Brown beef', 'Simmer with ingredients', 'Serve hot'],
    },
  ];

  return (
    <div className="bg-surface min-h-screen text-foreground font-body">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-brand">RecipeBase</h1>
          <nav className="space-x-4 text-sm text-gray-600">
            <a href="#" className="hover:text-brand-dark">
              Home
            </a>
            <a href="#" className="hover:text-brand-dark">
              Planner
            </a>
            <a href="#" className="hover:text-brand-dark">
              Login
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-brand-light py-10">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-brand">
            Welcome to RecipeBase
          </h2>
          <p className="mt-2 text-gray-700">
            Your cozy personal recipe manager 🍲
          </p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-lg font-semibold text-brand-dark">
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
            <button className="mt-4 self-start bg-brand hover:bg-brand-dark text-white text-sm font-medium py-2 px-4 rounded">
              View Details
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
