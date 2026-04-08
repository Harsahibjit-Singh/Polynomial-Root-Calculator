def clean_coefficients(coeffs: list[float]) -> list[float]:
    """
    Removes leading zeros from the coefficient list.
    Example: [0, 0, 1, -3, 2] -> [1, -3, 2]
    """
    # Find the first non-zero index
    first_nonzero = 0
    for i, val in enumerate(coeffs):
        if val != 0:
            first_nonzero = i
            break
    else:
        # If all coefficients are zero, return an empty list or [0]
        return []
    
    return coeffs[first_nonzero:]