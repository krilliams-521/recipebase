import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';
import EditRecipe from './components/EditRecipe';

function App() {
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
                <div className="max-w-5xl mx-auto px-4 py-4 flex justify-start">
                  <a
                    href="/add-recipe"
                    className="bg-black hover:bg-gray-800 text-white py-2 px-4 rounded"
                  >
                    Add Recipe
                  </a>
                </div>
                <RecipeList />
              </>
            }
          />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit-recipe/:id" element={<EditRecipe />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
