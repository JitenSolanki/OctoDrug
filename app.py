from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow frontend to access backend

@app.route('/api/data', methods=['GET'])
def get_data():
    return jsonify({"message": "Hello from Flask Backend!"})

if __name__ == '__main__':
    app.run(debug=True)
