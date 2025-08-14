

interface FormData {
  aadhaarNumber: string;
  nameAsPerAadhaar: string;
  panNumber: string;
}

// This is a helper type for FastAPI's validation error structure
type FastAPIValidationError = {
  loc: (string | number)[];
  msg: string;
  type: string;
};

export async function submitRegistration(data: FormData) {
  const response = await fetch('http://127.0.0.1:8000/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        aadhaar_number: data.aadhaarNumber,
        name_as_per_aadhaar: data.nameAsPerAadhaar,
        pan_number: data.panNumber.toUpperCase(),
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    // This part is now smarter. It specifically handles detailed validation errors.
    if (response.status === 422 && errorData.detail) {
      const formattedErrors = (errorData.detail as FastAPIValidationError[])
        .map(err => `${err.loc[1]}: ${err.msg}`)
        .join(', ');
      throw new Error(formattedErrors);
    }
    // Handles other errors like "PAN already registered"
    throw new Error(errorData.detail || 'An unknown error occurred.');
  }

  return response.json();
}