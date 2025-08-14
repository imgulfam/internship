

"use client";

import { useState } from 'react';
import Input from '@/components/ui/Input';
import { submitRegistration } from '@/lib/api';
import ProgressTracker from '@/components/ui/ProgressTracker';

interface FormData {
  aadhaarNumber: string;
  nameAsPerAadhaar: string;
  panNumber: string;
}

interface FormErrors {
  aadhaarNumber?: string;
  nameAsPerAadhaar?: string;
  panNumber?: string;
}

export default function RegistrationForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    aadhaarNumber: '',
    nameAsPerAadhaar: '',
    panNumber: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const validateField = (name: keyof FormData, value: string): string => {
    switch (name) {
      case 'aadhaarNumber':
        return /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/.test(value) ? '' : 'Please enter a valid 12-digit Aadhaar number.';
      case 'nameAsPerAadhaar':
        return value.length >= 2 ? '' : 'Name is required.';
      case 'panNumber':
        return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(value.toUpperCase()) ? '' : 'Please enter a valid 10-digit PAN number.';
      default:
        return '';
    }
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as { name: keyof FormData; value: string };
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
    setServerError('');
  };
  
  const handleNextStep = () => {
    const aadhaarError = validateField('aadhaarNumber', formData.aadhaarNumber);
    // FIXED THE TYPO HERE
    const nameError = validateField('nameAsPerAadhaar', formData.nameAsPerAadhaar);

    const newErrors: FormErrors = {};
    if (aadhaarError) newErrors.aadhaarNumber = aadhaarError;
    if (nameError) newErrors.nameAsPerAadhaar = nameError;
    setErrors(newErrors);

    if (!aadhaarError && !nameError) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const panError = validateField('panNumber', formData.panNumber);
    if(panError) {
        setErrors({panNumber: panError});
        return;
    }

    setServerError('');
    setIsSubmitting(true);
    try {
      await submitRegistration(formData); 
      alert('Registration Successful!');
      setStep(3);
    } catch (error) {
      if (error instanceof Error) {
        setServerError(error.message);
      } else {
        setServerError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="w-full max-w-2xl p-8 space-y-8 bg-white shadow-lg rounded-lg">
        <div className="flex flex-col items-center space-y-6">
          <h1 className="text-2xl font-bold text-center text-blue-800">Udyam Registration Form</h1>
          <ProgressTracker currentStep={step} />
        </div>
        
        {serverError && <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-400 rounded-md">{serverError}</div>}
        
        {step > 2 ? (
            <div className="p-4 text-center text-green-800 bg-green-100 rounded-md">
                <h3 className="font-bold">Thank You!</h3>
                <p>Your registration has been submitted successfully.</p>
            </div>
        ) : (
          <div className="mt-8">
            {step === 1 && (
               <div>
                <h2 className="text-lg font-semibold">Step 1: Aadhaar Verification</h2>
                <p className="text-sm text-gray-600 mb-4">Enter your Aadhaar Number and Name as per Aadhaar.</p>
                <Input label="Aadhaar Number" name="aadhaarNumber" value={formData.aadhaarNumber} onChange={handleChange} error={errors.aadhaarNumber} />
                <Input label="Name as per Aadhaar" name="nameAsPerAadhaar" value={formData.nameAsPerAadhaar} onChange={handleChange} error={errors.nameAsPerAadhaar} />
              </div>
            )}
            {step === 2 && (
              <div>
                <h2 className="text-lg font-semibold">Step 2: PAN Verification</h2>
                <p className="text-sm text-gray-600 mb-4">Enter your PAN to continue.</p>
                <Input label="PAN Number" name="panNumber" value={formData.panNumber} onChange={handleChange} error={errors.panNumber} />
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-8">
          <button type="button" onClick={() => setStep(1)} disabled={step === 1 || step > 2} className="px-4 py-2 font-semibold text-white bg-gray-400 rounded-md disabled:opacity-50">Back</button>
          {step === 1 ? (
            <button type="button" onClick={handleNextStep} className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">Validate & Generate OTP</button>
          ) : step === 2 ? (
            <button type="submit" disabled={isSubmitting} className="px-4 py-2 font-semibold text-white bg-green-600 rounded-md hover:bg-green-700 disabled:opacity-50">
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          ) : null }
        </div>
      </form>
    </div>
  );
}