from flask import Flask, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example: Fetch data from another API or return hardcoded data
    external_api_url = "https://api.example.com/data"  # Replace with actual URL
    try:
        response = requests.get(external_api_url)
        response.raise_for_status()  # Check for errors in the API response
        data = response.json()  # Parse JSON response from the external API
        return jsonify(data)  # Return the data to the frontend
    except requests.exceptions.RequestException as e:
        # Handle errors in case of failure to fetch data from the external API
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
