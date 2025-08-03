import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import Header from "./components/Header";
import SimulationView from './pages/SimulationView'
import NarrativeLibraryView from "./pages/NarrativeLibraryView";
import Contact from "./pages/Contact";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<NarrativeLibraryView />} />
            <Route path="/simulations" element={<SimulationView />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;