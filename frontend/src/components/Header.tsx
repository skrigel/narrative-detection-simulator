import Navigation from "./Navagation";

function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm px-6 py-2">
      <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">
        Brand Narrative Simulator
      </h1>
      <Navigation />

      </div>
    
    </header>
  );
}

export default Header;
