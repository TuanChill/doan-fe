import { cn } from "@/lib/utils";
import type React from "react";

interface StepIndicatorProps {
  step: number;
  currentStep: number;
  label: string;
  icon: React.ReactNode;
}

export default function StepIndicator({
  step,
  currentStep,
  label,
  icon,
}: StepIndicatorProps) {
  const isActive = currentStep >= step;
  const isComplete = currentStep > step;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-colors",
          isActive ? "bg-red-700 text-white" : "bg-gray-200 text-gray-500"
        )}
      >
        {isComplete ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          icon
        )}
      </div>
      <span
        className={cn(
          "text-sm font-medium whitespace-nowrap",
          isActive ? "text-red-700" : "text-gray-500"
        )}
      >
        {label}
      </span>
    </div>
  );
}
