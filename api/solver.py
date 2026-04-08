import numpy as np
from typing import List, Union

def calculate_roots(coefficients: List[float]):
    """
    Calculates roots and formats them as either floats or 
    dictionaries for complex numbers.
    """
    # NumPy calculates roots for any degree automatically
    raw_roots = np.roots(coefficients)
    
    formatted_roots = []
    for r in raw_roots:
        # Check if the root has an imaginary part
        if np.iscomplex(r):
            formatted_roots.append({
                "real": round(float(r.real), 4),
                "imag": round(float(r.imag), 4)
            })
        else:
            # It's a real number
            formatted_roots.append(round(float(r.real), 4))
            
    return formatted_roots