from pydantic import BaseModel
from typing import List, Union

# This is what we expect from the user
class PolynomialRequest(BaseModel):
    coefficients: List[float]

# This represents a complex root in the format: {"real": 0, "imag": 1}
class ComplexRoot(BaseModel):
    real: float
    imag: float

# This is the final JSON response format
class RootResponse(BaseModel):
    degree: int
    roots: List[Union[float, ComplexRoot]]