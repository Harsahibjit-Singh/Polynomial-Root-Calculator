<!-- to turn on backend

uvicorn main:app --reload  -->



# 🧮 Polynomial Root Solver API

A lightweight, high-performance FastAPI backend that calculates the roots of polynomials of **any degree**. This project uses **NumPy's** numerical methods to find both real and complex roots.

---

## 🌍 Live API Access

Don't want to run the server locally? The API is currently deployed and publicly accessible! You can send your requests directly to our live production server. 

**Base URL:** `https://polynomial-root-calculator.vercel.app/`  
**Live Endpoint:** `POST https://polynomial-root-calculator.vercel.app/solve`  
**Interactive Docs:** `https://polynomial-root-calculator.vercel.app/docs`

*Tip: If you are building a frontend, simply replace `http://127.0.0.1:8000` with `https://polynomial-root-calculator.vercel.app` in your JavaScript `fetch` calls to connect to the live engine.*

---

## 📁 File Overview

- **`main.py`**: The entry point. It sets up the FastAPI application, manages **CORS** settings (so your frontend can talk to it), and defines the `/solve` endpoint.
- **`models.py`**: Defines the **Pydantic** schemas. It acts as a gatekeeper, ensuring that any data entering or leaving the API follows the correct format.
- **`solver.py`**: The mathematical core. It takes the coefficients and uses `numpy.roots` to find solutions.
- **`utils.py`**: Helper functions for "data cleaning," such as removing leading zeros from input lists to correctly identify the polynomial degree.
- **`requirements.txt`**: Lists the Python libraries needed to run the app.

---

## 🚀 Installation & Setup

1. **Navigate to the API folder:**
   ```bash
   cd api


2. **Install dependencies:**
   pip install -r requirements.txt

3. **Start the server:**
    uvicorn main:app --reload

The API will be available at: **https://polynomial-root-calculator.vercel.app**


## 🔌 API Usage

### Endpoint
POST /solve

### Request
```json
{
  "coefficients": [1, -3, 2]
}
```

Represents:
x² - 3x + 2 = 0

### Response
```json
{
  "degree": 2,
  "roots": [2.0, 1.0]
}
```

### Complex Response
```json
{
  "degree": 2,
  "roots": [
    {"real": 0.0, "imag": 1.0},
    {"real": 0.0, "imag": -1.0}
  ]
}
```

---

## 💻 Frontend Integration

Example:

```javascript
const response = await fetch('http://127.0.0.1:8000/solve', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ coefficients: [1, 0, -4] })
});

const data = await response.json();
console.log(data.roots);
```

---

## 🛠 Testing

Visit:
http://127.0.0.1:8000/docs

---

## 🔥 Features

- Supports any degree polynomial
- Handles real and complex roots
- Clean backend structure
- Easy frontend integration

---

## 📌 Future Improvements

- String input parsing
- Graph plotting
- Derivatives & integrals
- Deployment

---

## 👨‍💻 Author

Backend project for API design and numerical computation.
