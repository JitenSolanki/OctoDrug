import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AlertCircle, Download, Share2, Bookmark } from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DrugPredictionPage = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [predictionData, setPredictionData] = useState<any>(null);

  useEffect(() => {
    // In a real app, this would fetch data from the Django backend
    // For now, we'll simulate loading prediction data
    const fetchPredictionData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          setPredictionData({
            molecule: {
              name: 'Aspirin',
              smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
              molecularWeight: 180.16,
              formula: 'C9H8O4',
              image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=2244&t=l'
            },
            predictions: {
              solubility: 0.72,
              logP: 1.43,
              drugLikeness: 0.85,
              toxicity: {
                hepatotoxicity: 0.23,
                cardiotoxicity: 0.15,
                nephrotoxicity: 0.18,
                neurotoxicity: 0.12
              },
              targetOrgans: [
                { organ: 'Liver', probability: 0.23 },
                { organ: 'Kidney', probability: 0.18 },
                { organ: 'Heart', probability: 0.15 },
                { organ: 'Brain', probability: 0.12 },
                { organ: 'Lungs', probability: 0.08 }
              ],
              drugInteractions: [
                { drug: 'Warfarin', severity: 'High', description: 'Increased risk of bleeding' },
                { drug: 'Methotrexate', severity: 'Moderate', description: 'Decreased renal clearance' },
                { drug: 'ACE inhibitors', severity: 'Moderate', description: 'Decreased antihypertensive effect' }
              ],
              bioavailability: 0.68,
              halfLife: '3.1-4.5 hours'
            }
          });
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        setError('Failed to load prediction data');
        setIsLoading(false);
      }
    };

    fetchPredictionData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Analyzing molecule...</h2>
          <p className="text-gray-500 mt-2">Our AI is processing your structure and generating predictions</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!predictionData) return null;

  // Prepare chart data
  const toxicityChartData = {
    labels: Object.keys(predictionData.predictions.toxicity),
    datasets: [
      {
        label: 'Toxicity Risk',
        data: Object.values(predictionData.predictions.toxicity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const targetOrgansChartData = {
    labels: predictionData.predictions.targetOrgans.map((item: any) => item.organ),
    datasets: [
      {
        label: 'Target Probability',
        data: predictionData.predictions.targetOrgans.map((item: any) => item.probability),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{predictionData.molecule.name}</h1>
          <p className="text-gray-600 mb-4">SMILES: {predictionData.molecule.smiles}</p>
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              MW: {predictionData.molecule.molecularWeight}
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
              Formula: {predictionData.molecule.formula}
            </div>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
            <Bookmark className="h-4 w-4 mr-2" />
            Save
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Molecule Structure</h2>
          <div className="flex justify-center">
            <img 
              src={predictionData.molecule.image} 
              alt={predictionData.molecule.name} 
              className="max-w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Basic Properties</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Solubility</p>
              <p className="text-2xl font-bold">{predictionData.predictions.solubility.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${predictionData.predictions.solubility * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">LogP</p>
              <p className="text-2xl font-bold">{predictionData.predictions.logP.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-green-600 h-2.5 rounded-full" 
                  style={{ width: `${(predictionData.predictions.logP / 5) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Drug-likeness</p>
              <p className="text-2xl font-bold">{predictionData.predictions.drugLikeness.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-purple-600 h-2.5 rounded-full" 
                  style={{ width: `${predictionData.predictions.drugLikeness * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-gray-50 p-4 rounded-md">
              <p className="text-sm text-gray-500">Bioavailability</p>
              <p className="text-2xl font-bold">{predictionData.predictions.bioavailability.toFixed(2)}</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                <div 
                  className="bg-yellow-600 h-2.5 rounded-full" 
                  style={{ width: `${predictionData.predictions.bioavailability * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-4 bg-gray-50 p-4 rounded-md">
            <p className="text-sm text-gray-500">Half-life</p>
            <p className="text-xl font-semibold">{predictionData.predictions.halfLife}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Toxicity Profile</h2>
          <div className="h-64">
            <Bar 
              data={toxicityChartData} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 1,
                    title: {
                      display: true,
                      text: 'Risk Probability'
                    }
                  },
                  x: {
                    title: {
                      display: true,
                      text: 'Toxicity Type'
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Target Organs</h2>
          <div className="h-64">
            <Doughnut 
              data={targetOrgansChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  }
                }
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Potential Drug Interactions</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Drug
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Severity
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {predictionData.predictions.drugInteractions.map((interaction: any, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {interaction.drug}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      interaction.severity === 'High' 
                        ? 'bg-red-100 text-red-800' 
                        : interaction.severity === 'Moderate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {interaction.severity}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {interaction.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">AI Analysis Summary</h2>
        <p className="text-gray-700 mb-4">
          Based on our AI analysis, {predictionData.molecule.name} shows good drug-likeness properties with moderate solubility.
          The compound has a relatively low toxicity profile, with the liver being the primary target organ.
          Potential interactions with Warfarin should be monitored closely due to increased bleeding risk.
        </p>
        <p className="text-gray-700">
          This molecule could be a promising candidate for further development, but additional studies on its hepatotoxicity
          would be recommended before proceeding to clinical trials.
        </p>
      </div>
    </div>
  );
};

export default DrugPredictionPage;