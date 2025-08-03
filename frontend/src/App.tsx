import { Routes, Route } from "react-router-dom";
import GeneratorPage from "./pages/GeneratorPage";
import Home from "./pages/Home"
import Header from "./components/Header";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/generator" element={<GeneratorPage />} />
          </Routes>
        </main>
      </div>
    </AppProvider>
  );
}

export default App;