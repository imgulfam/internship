import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from '@/components/forms/RegistrationForm';

describe('RegistrationForm', () => {
  it('should display an error message for an invalid PAN format', () => {
    render(<RegistrationForm />);

    // --- Step 1: Get to the PAN input field ---
    // Find and fill the Aadhaar and Name fields so we can advance
    const aadhaarInput = screen.getByLabelText(/Aadhaar Number/i);
    const nameInput = screen.getByLabelText(/Name as per Aadhaar/i);
    fireEvent.change(aadhaarInput, { target: { value: '345678901234' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });

    // Click the button to go to the next step
    const nextButton = screen.getByRole('button', { name: /Validate & Generate OTP/i });
    fireEvent.click(nextButton);

    // --- Step 2: Test the PAN validation ---
    // Find the PAN input field which is now visible
    const panInput = screen.getByLabelText(/PAN Number/i);
    
    // Simulate typing an invalid PAN
    fireEvent.change(panInput, { target: { value: 'INVALIDPAN' } });

    // Assert that the error message appears in the document
    const errorMessage = screen.getByText('Please enter a valid 10-digit PAN number.');
    expect(errorMessage).toBeInTheDocument();
  });
});