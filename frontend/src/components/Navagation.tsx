function Navigation() {
    return (
        <nav className="bg-white border-gray-200">
                <div className="relative flex items-center justify-between h-16">
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="hidden sm:block">
                            <div className="flex space-x-4">
                                <a href="/" className="text-gray-900 hover:text-gray-700">
                                    Home
                                </a>
                                {/* <a href="#" className="text-gray-900 hover:text-gray-700">
                                    About
                                </a> */}
                                <a href="/simulations" className="text-gray-900 hover:text-gray-700">
                                    Simulations
                                </a>
                                <a href="/generator" className="text-gray-900 hover:text-gray-700">
                                    Generator
                                </a>
                                <a href="/contact" className="text-gray-900 hover:text-gray-700">
                                    Contact
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
        </nav>
    );
}

export default Navigation;