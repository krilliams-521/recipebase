import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

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
    <Router>
      <div className="bg-surface min-h-screen text-foreground font-body">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <RecipeList recipes={recipes} />
              </>
            }
          />
          <Route
            path="/recipes/:id"
            element={<RecipeDetails recipes={recipes} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
