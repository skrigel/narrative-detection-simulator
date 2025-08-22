import SimulationRunner from "../components/SimulationRunner";


export default function SimulationView() {

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Run Simulations Below</h2>
      <p className="text-gray-600 mb-6">
        Use our simulation tools to test how narratives spread and their potential impact.
      </p>
      <SimulationRunner />
    </div>
  );
}
