
function Home(){
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Welcome to GenAI App!</h2>
            <p className="text-gray-600">
                Use the navigation above to generate synthetic data for various domains.
            </p>
            <a href="/generator" className="text-blue-500 hover:underline">
                Go to Data Generator
            </a>
        </div>
    );
}

export default Home;