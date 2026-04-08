from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import PolynomialRequest, RootResponse
from utils import clean_coefficients
from solver import calculate_roots

app = FastAPI(title="Polynomial Root Solver")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, change this to your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/solve", response_model=RootResponse)
async def solve_polynomial(data: PolynomialRequest):
    # 1. Clean leading zeros
    coeffs = clean_coefficients(data.coefficients)
    
    # 2. Basic Validation: Is the list empty or just a constant (like [5])?
    if not coeffs:
        raise HTTPException(status_code=400, detail="Coefficients cannot be all zeros.")
    
    if len(coeffs) == 1:
        raise HTTPException(status_code=400, detail="Degree 0 polynomial (constant) has no roots.")

    # 3. Calculate Degree
    degree = len(coeffs) - 1
    
    # 4. Calculate Roots
    try:
        roots = calculate_roots(coeffs)
        return {
            "degree": degree,
            "roots": roots
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Polynomial API. Use /solve (POST) to find roots."}