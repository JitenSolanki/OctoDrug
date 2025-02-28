import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, FileText, AlertCircle } from 'lucide-react';

const MoleculeDrawingPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [smilesInput, setSmilesInput] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [editorLoaded, setEditorLoaded] = useState(false); // Track if JSME has loaded

  useEffect(() => {
    // Load the JSME script dynamically
    const script = document.createElement('script');
    script.src = 'https://www.cheminfo.org/jsme/jsme.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = initializeJSME;

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initializeJSME = () => {
    if (window.JSME) {
      const params = {
        width: 600,
        height: 400,
        jme: 'sketcher', // ID of the div where the JSME editor will be attached
        editable: true, // Enable molecule editing
      };

      // Create the JSME editor
      const editor = new window.JSME('sketcher', params);
      setEditorLoaded(true); // Mark the editor as loaded

      // Add a callback to capture the molecule structure (Optional)
      editor.addEventListener('structureChange', function () {
        console.log('Structure changed!');
        // Optionally, you can store the structure or handle events here
      });
    } else {
      setError('Failed to load JSME editor');
    }
  };

  const handleSmilesSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!smilesInput.trim()) {
      setError('Please enter a valid SMILES string');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setTimeout(() => {
        setIsLoading(false);
        navigate('/prediction/123');
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError('Failed to process SMILES string. Please try again.');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      setError('');
    }
  };

  const handleFileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadedFile) {
      setError('Please upload a file first');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      setTimeout(() => {
        setIsLoading(false);
        navigate('/prediction/123');
      }, 1500);
    } catch (err) {
      setIsLoading(false);
      setError('Failed to process the file. Please try again.');
    }
  };

  const handleSketchSubmit = () => {
    // Get the molecule from the JSME editor and submit it
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigate('/prediction/123');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Draw or Upload Molecule</h1>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Molecule Sketcher</h2>
        <div className="border border-gray-300 rounded-lg p-2 mb-6">
          <div
            id="sketcher"
            className="w-full h-[400px] bg-gray-50 flex items-center justify-center"
          >
            {editorLoaded ? (
              <p className="text-gray-500">Sketcher loaded, start drawing your molecule!</p>
            ) : (
              <p className="text-gray-500">Loading sketcher...</p>
            )}
          </div>
        </div>
        <button
          onClick={handleSketchSubmit}
          disabled={isLoading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Processing...' : 'Analyze Molecule'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Enter SMILES String</h2>
          <form onSubmit={handleSmilesSubmit}>
            <div className="mb-4">
              <label htmlFor="smiles" className="block text-sm font-medium text-gray-700 mb-1">
                SMILES Notation
              </label>
              <input
                type="text"
                id="smiles"
                value={smilesInput}
                onChange={(e) => setSmilesInput(e.target.value)}
                placeholder="e.g., CC(=O)OC1=CC=CC=C1C(=O)O"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              />
              <p className="mt-1 text-sm text-gray-500">
                Enter a valid SMILES string representation of your molecule
              </p>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              <FileText className="h-5 w-5 mr-2" />
              {isLoading ? 'Processing...' : 'Submit SMILES'}
            </button>
          </form>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Upload Molecule File</h2>
          <form onSubmit={handleFileSubmit}>
            <div className="mb-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                MOL or SDF File
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        accept=".mol,.sdf"
                        onChange={handleFileUpload}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">MOL or SDF files up to 10MB</p>
                </div>
              </div>
              {uploadedFile && (
                <p className="mt-2 text-sm text-green-600">
                  File selected: {uploadedFile.name}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !uploadedFile}
              className="w-full flex items-center justify-center bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed"
            >
              <Upload className="h-5 w-5 mr-2" />
              {isLoading ? 'Processing...' : 'Upload and Analyze'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MoleculeDrawingPage;
