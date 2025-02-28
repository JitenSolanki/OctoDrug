import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full text-center">
        <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">404</h1>
        <p className="mt-2 text-2xl font-semibold text-gray-700">Page not found</p>
        <p className="mt-4 text-gray-500">The page you're looking for doesn't exist or has been moved.</p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;