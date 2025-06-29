"use client";

import { motion } from 'framer-motion';
import { Check, MapPin, CreditCard, Package } from 'lucide-react';

interface CheckoutStep {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}

const steps: CheckoutStep[] = [
  {
    id: 1,
    title: "Address",
    description: "Shipping details",
    icon: MapPin
  },
  {
    id: 2,
    title: "Payment",
    description: "Payment method",
    icon: CreditCard
  },
  {
    id: 3,
    title: "Confirmation",
    description: "Review order",
    icon: Package
  }
];

interface CheckoutProgressBarProps {
  currentStep: number;
  className?: string;
}

export function CheckoutProgressBar({ currentStep, className = '' }: CheckoutProgressBarProps) {
  const completionPercentage = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Progress Bar */}
      <div className="md:hidden mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {steps.length}</span>
          <span className="text-sm text-muted-foreground">{Math.round(completionPercentage)}% Complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <motion.div
            className="bg-primary h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
        <div className="mt-2">
          <h3 className="font-semibold">{steps[currentStep - 1].title}</h3>
          <p className="text-sm text-muted-foreground">{steps[currentStep - 1].description}</p>
        </div>
      </div>

      {/* Desktop Step Indicator */}
      <div className="hidden md:block">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted -z-10">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>

          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isCurrent = currentStep === step.id;
            const isUpcoming = currentStep < step.id;

            return (
              <motion.div
                key={step.id}
                className="flex flex-col items-center relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Step Circle */}
                <motion.div
                  className={`
                    w-10 h-10 rounded-full border-2 flex items-center justify-center relative z-10
                    ${isCompleted 
                      ? 'bg-primary border-primary text-primary-foreground' 
                      : isCurrent 
                        ? 'bg-background border-primary text-primary' 
                        : 'bg-background border-muted-foreground text-muted-foreground'
                    }
                  `}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Check className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </motion.div>

                {/* Step Info */}
                <div className="mt-3 text-center">
                  <h4 className={`text-sm font-medium ${
                    isCurrent ? 'text-primary' : isCompleted ? 'text-foreground' : 'text-muted-foreground'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {step.description}
                  </p>
                </div>

                {/* Current Step Indicator */}
                {isCurrent && (
                  <motion.div
                    className="absolute -bottom-2 w-2 h-2 bg-primary rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Step Description */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 text-center"
        >
          <h3 className="text-lg font-semibold mb-1">
            {steps[currentStep - 1].title}
          </h3>
          <p className="text-muted-foreground">
            {steps[currentStep - 1].description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}