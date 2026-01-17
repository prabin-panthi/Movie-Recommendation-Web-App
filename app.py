from flask import Flask, request, jsonify, render_template
import pickle
import string
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)

with open("indices.pkl", "rb") as f:
    indices = pickle.load(f)

with open("vectorized_matrix.pkl", "rb") as f:
    vectorized_matrix = pickle.load(f)

with open("df.pkl", "rb") as f:
    df = pickle.load(f)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods = ['POST'])
def predict():
        text = request.form.get("text")
        text = str(text).strip().lower().translate(str.maketrans("", "", string.punctuation))

        if text not in indices:
            return jsonify({"prediction": ['err']})
        
        idx = indices[text]
        sim_score = cosine_similarity(vectorized_matrix[idx], vectorized_matrix).flatten()
        sim_idx = np.argsort(sim_score)[::-1][1:13]
        prediction = list(df['title'].iloc[sim_idx])
        
        return jsonify({"prediction": prediction})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)