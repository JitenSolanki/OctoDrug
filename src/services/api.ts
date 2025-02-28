import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const moleculeService = {
  processSMILES: (data: { smiles: string; name?: string }) => 
    api.post('/molecules/process_smiles/', data),
  
  processMOLFile: (data: { mol_file: string; name?: string }) => 
    api.post('/molecules/process_mol_file/', data),
  
  getMolecule: (id: string) => 
    api.get(`/molecules/${id}/`),
  
  getMolecules: () => 
    api.get('/molecules/'),
};

export const predictionService = {
  getPrediction: (id: string) => 
    api.get(`/predictions/${id}/`),
};

export const drugDatabaseService = {
  search: (data: { query: string; search_type?: 'name' | 'smiles' | 'formula' | 'all' }) => 
    api.post('/drug-database/search/', data),
};

export const adminDashboardService = {
  getStats: () => 
    api.get('/admin-dashboard/stats/'),
};

export const queryLogService = {
  getQueries: () => 
    api.get('/queries/'),
};

export default api;