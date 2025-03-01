import React from 'react';
import { Link } from 'react-router-dom';
import { PenTool, Database, Zap } from 'lucide-react';

interface HomePageProps {
  backendMessage: string;
}

const HomePage: React.FC<HomePageProps> = ({ backendMessage }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            Revolutionizing DrugAssist
          </h1>
          <p className="text-xl mb-8">
            Accelerate your pharmaceutical research with our advanced AI-powered platform.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/draw"
              className="inline-flex items-center justify-center px-6 py-3 text-indigo-700 bg-white hover:bg-gray-100 rounded-md"
            >
              <PenTool className="mr-2 h-5 w-5" /> Draw Molecule
            </Link>
            <Link
              to="/database"
              className="inline-flex items-center justify-center px-6 py-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-md"
            >
              <Database className="mr-2 h-5 w-5" /> Explore Database
            </Link>
          </div>
        </div>
      </section>

      {/* Backend Message Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Backend Response</h2>
          {/* Handle different states for backend message */}
          <p className="mt-4 text-xl text-gray-600">
            {backendMessage || 'Loading backend data...'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
