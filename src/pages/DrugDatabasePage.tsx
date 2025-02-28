import React, { useState } from 'react';
import { Search, Filter, Download, ExternalLink } from 'lucide-react';

const DrugDatabasePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState('all');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setSearchResults([]);
    setSelectedDrug(null);

    try {
      // In a real app, this would be an API call to the Django backend
      // which would then query PubChem API
      // For now, we'll simulate a successful search with mock data
      setTimeout(() => {
        const mockResults = [
          {
            id: 2244,
            name: 'Aspirin',
            formula: 'C9H8O4',
            molecularWeight: 180.16,
            smiles: 'CC(=O)OC1=CC=CC=C1C(=O)O',
            category: 'NSAID',
            image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=2244&t=l'
          },
          {
            id: 3672,
            name: 'Ibuprofen',
            formula: 'C13H18O2',
            molecularWeight: 206.29,
            smiles: 'CC(C)CC1=CC=C(C=C1)C(C)C(=O)O',
            category: 'NSAID',
            image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=3672&t=l'
          },
          {
            id: 5743,
            name: 'Paracetamol',
            formula: 'C8H9NO2',
            molecularWeight: 151.16,
            smiles: 'CC(=O)NC1=CC=C(C=C1)O',
            category: 'Analgesic',
            image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=1983&t=l'
          },
          {
            id: 5426,
            name: 'Atorvastatin',
            formula: 'C33H35FN2O5',
            molecularWeight: 558.64,
            smiles: 'CC(C)C1=C(C(=C(N1CCC(CC(CC(=O)O)O)O)C2=CC=C(C=C2)F)C3=CC=CC=C3)C(=O)NC4=CC=CC=C4',
            category: 'Statin',
            image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=60823&t=l'
          },
          {
            id: 4541,
            name: 'Metformin',
            formula: 'C4H11N5',
            molecularWeight: 129.17,
            smiles: 'CN(C)C(=N)NC(=N)N',
            category: 'Antidiabetic',
            image: 'https://pubchem.ncbi.nlm.nih.gov/image/imgsrv.fcgi?cid=4091&t=l'
          }
        ];
        
        setSearchResults(mockResults);
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setIsLoading(false);
      console.error('Search failed:', err);
    }
  };

  const handleDrugSelect = (drug: any) => {
    setSelectedDrug(drug);
  };

  const filteredResults = activeFilter === 'all' 
    ? searchResults 
    : searchResults.filter(drug => drug.category === activeFilter);

  const categories = ['all', ...new Set(searchResults.map(drug => drug.category))];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Drug Database</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-grow relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by drug name, SMILES, or formula..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !searchQuery.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {searchResults.length > 0 && (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Search Results</h2>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <select
                      value={activeFilter}
                      onChange={(e) => setActiveFilter(e.target.value)}
                      className="text-sm border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Formula
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        MW
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredResults.map((drug) => (
                      <tr 
                        key={drug.id} 
                        className={`hover:bg-gray-50 cursor-pointer ${selectedDrug?.id === drug.id ? 'bg-indigo-50' : ''}`}
                        onClick={() => handleDrugSelect(drug)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {drug.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {drug.formula}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {drug.molecularWeight}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            {drug.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button 
                            className="text-indigo-600 hover:text-indigo-900"
                            onClick={(e) => {
                              e.stopPropagation();
                              window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${drug.id}`, '_blank');
                            }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            {selectedDrug ? (
              <div className="bg-white shadow-md rounded-lg p-6 sticky top-4">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">{selectedDrug.name}</h2>
                  <button 
                    className="text-gray-400 hover:text-gray-500"
                    onClick={() => window.open(`https://pubchem.ncbi.nlm.nih.gov/compound/${selectedDrug.id}`, '_blank')}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex justify-center mb-4">
                  <img 
                    src={selectedDrug.image} 
                    alt={selectedDrug.name} 
                    className="max-w-full h-auto"
                  />
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Formula</p>
                    <p className="font-medium">{selectedDrug.formula}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Molecular Weight</p>
                    <p className="font-medium">{selectedDrug.molecularWeight}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">SMILES</p>
                    <p className="font-mono text-xs bg-gray-50 p-2 rounded overflow-x-auto">
                      {selectedDrug.smiles}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-medium">{selectedDrug.category}</p>
                  </div>
                </div>
                <div className="mt-6 flex space-x-2">
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                  <button className="flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                    Analyze
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 shadow-md rounded-lg p-6 text-center">
                <p className="text-gray-500">Select a drug to view details</p>
              </div>
            )}
          </div>
        </div>
      )}

      {searchQuery && !isLoading && searchResults.length === 0 && (
        <div className="bg-white shadow-md rounded-lg p-8 text-center">
          <p className="text-gray-500 mb-2">No results found for "{searchQuery}"</p>
          <p className="text-sm text-gray-400">Try a different search term or check the spelling</p>
        </div>
      )}
    </div>
  );
};

export default DrugDatabasePage;