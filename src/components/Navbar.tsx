import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, FlaskRound as Flask, Database, BarChart3, Home } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-indigo-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Flask className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl">DrugDiscovery AI</span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 flex items-center">
                <Home className="h-4 w-4 mr-1" />
                Home
              </Link>
              <Link to="/draw" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 flex items-center">
                <Flask className="h-4 w-4 mr-1" />
                Draw Molecule
              </Link>
              <Link to="/database" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 flex items-center">
                <Database className="h-4 w-4 mr-1" />
                Drug Database
              </Link>
              <Link to="/admin-dashboard" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-600 flex items-center">
                <BarChart3 className="h-4 w-4 mr-1" />
                Admin Dashboard
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
            <Link 
              to="/draw" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Flask className="h-4 w-4 mr-2" />
              Draw Molecule
            </Link>
            <Link 
              to="/database" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Database className="h-4 w-4 mr-2" />
              Drug Database
            </Link>
            <Link 
              to="/admin-dashboard" 
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-indigo-600 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;