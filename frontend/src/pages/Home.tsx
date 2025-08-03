export default function Home() {
  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <main className="max-w-7xl mx-auto px-6 py-12 space-y-24">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <p className="text-sm font-medium text-blue-600 uppercase tracking-wide">
            Brand Narrative Intelligence
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900">
            Simulate, Detect, and Defend Against Narrative Threats
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stress test your brand's messaging in synthetic social networks. Identify weak points before they go live.
          </p>
        </section>

        <hr className="border-gray-200" />

        {/* Section 1: Narrative Simulation */}
        <section className="section grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Synthetic Spread Simulation</h2>
            <p className="text-gray-600">
              Model how different message variants perform across ideological clusters and influencer nodes. Test virality,
              drift, and hijack potential.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-48 flex items-center justify-center">
            {/* Placeholder for graphic */}
            <span className="text-gray-400">[ Simulation Graphic Placeholder ]</span>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Section 2: Manipulation Detection */}
        <section className="section grid md:grid-cols-2 gap-8 items-center">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-48 flex items-center justify-center">
            <span className="text-gray-400">[ Detection Graphic Placeholder ]</span>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Narrative Manipulation Detection</h2>
            <p className="text-gray-600">
              Detect coordinated attacks, botnet amplification, and synthetic virality before it breaks containment. Get a risk
              score before you deploy.
            </p>
          </div>
        </section>

        <hr className="border-gray-200" />

        {/* Section 3: Real-Time Dashboard */}
        <section className="section grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Live Scenario Monitoring</h2>
            <p className="text-gray-600">
              View narrative spread in real time. Monitor entropy, drift, and polarity shifts across synthetic ecosystems.
              Build muscle memory for live brand defense.
            </p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm h-48 flex items-center justify-center">
            <span className="text-gray-400">[ Dashboard Preview Placeholder ]</span>
          </div>
        </section>
      </main>
    </div>
  );
}
