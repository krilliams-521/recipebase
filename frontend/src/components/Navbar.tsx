const Navbar = () => {
  return (
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
  );
};

export default Navbar;
