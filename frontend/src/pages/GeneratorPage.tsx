import { useAppContext } from "../context/AppContext";

function GeneratorPage() {
  const { domain, setDomain } = useAppContext();

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Generate Synthetic Data</h2>
      <label className="block mb-2">
        Select Domain:
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="ml-2 border px-2 py-1"
        >
          <option value="healthcare">Healthcare</option>
          <option value="finance">Finance</option>
          <option value="retail">Retail</option>
        </select>
      </label>
      <p className="mt-4 text-gray-600">Current domain: {domain}</p>
      <a href="/" className="text-blue-500 hover:underline">
                Return Home
            </a>
    </div>
  );
}

export default GeneratorPage;
