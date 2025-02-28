import React, { useState, useEffect } from 'react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Users, Database, Activity, AlertTriangle, Clock, BarChart2 } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const AdminDashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    // In a real app, this would fetch data from the Django backend
    // For now, we'll simulate loading dashboard data
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        setTimeout(() => {
          // Mock data
          setDashboardData({
            stats: {
              totalUsers: 1248,
              activeUsers: 876,
              totalQueries: 15782,
              averageResponseTime: 1.2
            },
            userActivity: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              datasets: [
                {
                  label: 'Active Users',
                  data: [650, 730, 810, 790, 850, 870, 876],
                  borderColor: 'rgba(75, 192, 192, 1)',
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  tension: 0.4
                },
                {
                  label: 'New Users',
                  data: [120, 85, 90, 70, 95, 80, 75],
                  borderColor: 'rgba(153, 102, 255, 1)',
                  backgroundColor: 'rgba(153, 102, 255, 0.2)',
                  tension: 0.4
                }
              ]
            },
            queryTypes: {
              labels: ['Structure Drawing', 'SMILES Upload', 'MOL Upload', 'Database Search', 'Property Prediction'],
              datasets: [
                {
                  label: 'Query Distribution',
                  data: [4215, 3842, 2103, 3521, 2101],
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
                }
              ]
            },
            modelPerformance: {
              labels: ['Solubility', 'Toxicity', 'Drug-likeness', 'Target Prediction', 'Interaction'],
              datasets: [
                {
                  label: 'Accuracy',
                  data: [0.87, 0.82, 0.91, 0.78, 0.84],
                  backgroundColor: 'rgba(54, 162, 235, 0.6)',
                  borderColor: 'rgba(54, 162, 235, 1)',
                  borderWidth: 1,
                }
              ]
            },
            recentQueries: [
              { id: 1, user: 'user123', type: 'Structure Drawing', molecule: 'Aspirin', timestamp: '2025-06-10 14:32:45', status: 'completed' },
              { id: 2, user: 'researcher42', type: 'SMILES Upload', molecule: 'CC(=O)OC1=CC=CC=C1C(=O)O', timestamp: '2025-06-10 14:28:12', status: 'completed' },
              { id: 3, user: 'pharma_dev', type: 'Database Search', molecule: 'Ibuprofen', timestamp: '2025-06-10 14:15:33', status: 'completed' },
              { id: 4, user: 'chemist007', type: 'MOL Upload', molecule: 'Paracetamol', timestamp: '2025-06-10 14:05:21', status: 'failed' },
              { id: 5, user: 'bio_analyst', type: 'Property Prediction', molecule: 'Metformin', timestamp: '2025-06-10 13:58:47', status: 'completed' }
            ],
            errorRates: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
              datasets: [
                {
                  label: 'Error Rate (%)',
                  data: [4.2, 3.8, 3.5, 3.2, 2.8, 2.5, 2.3],
                  borderColor: 'rgba(255, 99, 132, 1)',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  tension: 0.4
                }
              ]
            }
          });
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        console.error('Failed to load dashboard data:', err);
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-700">Loading dashboard...</h2>
        </div>
      </div>
    );
  }

  if (!dashboardData) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-indigo-100 rounded-full p-3">
              <Users className="h-6 w-6 text-indigo-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Total Users</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.stats.totalUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 rounded-full p-3">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Active Users</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.stats.activeUsers}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-3">
              <Database className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Total Queries</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.stats.totalQueries}</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 rounded-full p-3">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-5">
              <p className="text-sm font-medium text-gray-500 truncate">Avg. Response Time</p>
              <p className="mt-1 text-3xl font-semibold text-gray-900">{dashboardData.stats.averageResponseTime}s</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="bg-white shadow-md rounded-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'users'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              User Analytics
            </button>
            <button
              onClick={() => setActiveTab('models')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'models'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Model Performance
            </button>
            <button
              onClick={() => setActiveTab('queries')}
              className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                activeTab === 'queries'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Recent Queries
            </button>
          </nav>
        </div>
        
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Activity</h3>
                <div className="h-80">
                  <Line 
                    data={dashboardData.userActivity}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of Users'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Query Distribution</h3>
                <div className="h-80">
                  <Doughnut 
                    data={dashboardData.queryTypes}
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
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Model Performance</h3>
                <div className="h-80">
                  <Bar 
                    data={dashboardData.modelPerformance}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 1,
                          title: {
                            display: true,
                            text: 'Accuracy'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'users' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
                <div className="h-80">
                  <Line 
                    data={dashboardData.userActivity}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of Users'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Engagement</h3>
                <div className="h-80">
                  <Bar 
                    data={{
                      labels: ['0-5', '6-10', '11-20', '21-50', '51-100', '100+'],
                      datasets: [{
                        label: 'Queries per User',
                        data: [320, 450, 280, 120, 60, 18],
                        backgroundColor: 'rgba(54, 162, 235, 0.6)',
                      }]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Number of Users'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Queries Made'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Demographics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">User Types</h4>
                    <div className="h-60">
                      <Doughnut 
                        data={{
                          labels: ['Academic', 'Industry', 'Healthcare', 'Student', 'Other'],
                          datasets: [{
                            data: [35, 25, 20, 15, 5],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                              'rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                            ],
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Geographic Distribution</h4>
                    <div className="h-60">
                      <Doughnut 
                        data={{
                          labels: ['North America', 'Europe', 'Asia', 'Australia', 'Other'],
                          datasets: [{
                            data: [40, 30, 20, 5, 5],
                            backgroundColor: [
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                              'rgba(75, 192, 192, 0.6)',
                              'rgba(153, 102, 255, 0.6)',
                            ],
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 mb-2">Device Usage</h4>
                    <div className="h-60">
                      <Doughnut 
                        data={{
                          labels: ['Desktop', 'Mobile', 'Tablet'],
                          datasets: [{
                            data: [65, 25, 10],
                            backgroundColor: [
                              'rgba(54, 162, 235, 0.6)',
                              'rgba(255, 99, 132, 0.6)',
                              'rgba(255, 206, 86, 0.6)',
                            ],
                          }]
                        }}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'models' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Model Accuracy</h3>
                <div className="h-80">
                  <Bar 
                    data={dashboardData.modelPerformance}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 1,
                          title: {
                            display: true,
                            text: 'Accuracy'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Error Rates</h3>
                <div className="h-80">
                  <Line 
                    data={dashboardData.errorRates}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Error Rate (%)'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-gray-200 lg:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Model Performance by Molecule Type</h3>
                <div className="h-80">
                  <Bar 
                    data={{
                      labels: ['Small Molecules', 'Peptides', 'Macrocycles', 'Natural Products', 'Organometallics'],
                      datasets: [
                        {
                          label: 'Accuracy',
                          data: [0.92, 0.85, 0.78, 0.88, 0.72],
                          backgroundColor: 'rgba(54, 162, 235, 0.6)',
                          borderColor: 'rgba(54, 162, 235, 1)',
                          borderWidth: 1,
                        },
                        {
                          label: 'Precision',
                          data: [0.90, 0.83, 0.75, 0.86, 0.70],
                          backgroundColor: 'rgba(255, 99, 132, 0.6)',
                          borderColor: 'rgba(255, 99, 132, 1)',
                          borderWidth: 1,
                        },
                        {
                          label: 'Recall',
                          data: [0.88, 0.81, 0.73, 0.84, 0.68],
                          backgroundColor: 'rgba(255, 206, 86, 0.6)',
                          borderColor: 'rgba(255, 206, 86, 1)',
                          borderWidth: 1,
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        y: {
                          beginAtZero: true,
                          max: 1,
                          title: {
                            display: true,
                            text: 'Score'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'queries' && (
            <div>
              <div className="bg-white p-4 rounded-lg border border-gray-200 mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Queries</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          User
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Molecule
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Timestamp
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData.recentQueries.map((query: any) => (
                        <tr key={query.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {query.user}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.type}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.molecule}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {query.timestamp}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              query.status === 'completed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {query.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Query Distribution</h3>
                  <div className="h-80">
                    <Doughnut 
                      data={dashboardData.queryTypes}
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
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Query Volume</h3>
                  <div className="h-80">
                    <Bar 
                      data={{
                        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                        datasets: [{
                          label: 'Queries',
                          data: [420, 380, 450, 475, 410, 230, 180],
                          backgroundColor: 'rgba(54, 162, 235, 0.6)',
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          y: {
                            beginAtZero: true,
                            title: {
                              display: true,
                              text: 'Number of Queries'
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;