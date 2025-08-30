import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800 hover:text-gray-900">
          RecipeBase
        </Link>
        <nav className="space-x-4 text-sm text-gray-600">
          <Link to="/" className="hover:text-gray-800">
            Home
          </Link>
          <Link to="#" className="hover:text-gray-800">
            Planner
          </Link>
          <Link to="#" className="hover:text-gray-800">
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;