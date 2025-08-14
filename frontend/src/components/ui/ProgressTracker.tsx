
import React from 'react';

type ProgressTrackerProps = {
  currentStep: number;
};

const steps = ['Aadhaar Verification', 'PAN Verification'];

export default function ProgressTracker({ currentStep }: ProgressTrackerProps) {
  return (
    <div className="w-full px-4 sm:px-0">
      {/* THE FIX IS IN THE LINE BELOW */}
      <div className="relative flex justify-center gap-x-20 sm:gap-x-24">
        {/* The connecting line */}
        <div className="absolute left-0 top-3.5 h-0.5 w-full bg-gray-200" aria-hidden="true" />
        <div 
          className="absolute left-0 top-3.5 h-0.5 bg-blue-600 transition-all duration-500" 
          style={{ width: `calc(${currentStep > 1 ? '100% - 6rem' : '0%'})` }}
        />
        
        {steps.map((stepName, stepIdx) => {
          const stepNumber = stepIdx + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={stepName} className="relative flex flex-col items-center w-24">
              {/* Circle */}
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300
                  ${isActive ? 'border-2 border-blue-600 bg-white text-blue-600' : ''}
                  ${isCompleted ? 'bg-blue-600 text-white' : ''}
                  ${!isActive && !isCompleted ? 'border-2 border-gray-300 bg-white text-gray-500' : ''}
                `}
              >
                {isCompleted ? (
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                ) : (
                  stepNumber
                )}
              </div>
              {/* Text */}
              <p className={`mt-2 text-xs text-center font-semibold ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                {stepName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}