import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MoleculeDrawingPage from './pages/MoleculeDrawingPage';
import DrugPredictionPage from './pages/DrugPredictionPage';
import DrugDatabasePage from './pages/DrugDatabasePage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import NotFoundPage from './pages/NotFoundPage';

const App: React.FC = () => {
  const [backendMessage, setBackendMessage] = useState<string>('');

  useEffect(() => {
    const fetchBackendMessage = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/data');
        setBackendMessage(response.data.message);
      } catch (error) {
        console.error('Error connecting to Flask:', error);
        setBackendMessage('Failed to connect to backend.');
      }
    };

    fetchBackendMessage();
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage backendMessage={backendMessage} />} />
            <Route path="/draw" element={<MoleculeDrawingPage />} />
            <Route path="/prediction/:id" element={<DrugPredictionPage />} />
            <Route path="/database" element={<DrugDatabasePage />} />
            <Route path="/admin-dashboard" element={<AdminDashboardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
