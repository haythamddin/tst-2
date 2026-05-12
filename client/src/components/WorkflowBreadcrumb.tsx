import React from 'react';
import { useLocation, Link } from 'wouter';
import { Check, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const steps = [
  { id: 'upload', label: 'Upload', path: '/' },
  { id: 'process', label: 'Process', path: '/processing' },
  { id: 'validate', label: 'Validate', path: '/visual-intelligence' }, // Visual Intelligence is part of validation flow
  { id: 'review', label: 'Review', path: '/validation' },
  { id: 'enrich', label: 'Enrich', path: '/enrichment' },
  { id: 'export', label: 'Export', path: '/export' },
  { id: 'insights', label: 'Insights', path: '/analytics' },
];

export function WorkflowBreadcrumb() {
  const [location] = useLocation();

  // Determine current step index
  const getCurrentStepIndex = () => {
    if (location === '/') return 0;
    if (location === '/processing') return 1;
    if (location === '/visual-intelligence') return 2;
    if (location === '/validation') return 3;
    if (location === '/enrichment') return 4;
    if (location === '/export') return 5;
    if (location === '/analytics') return 6;
    return -1;
  };

  const currentStepIndex = getCurrentStepIndex();

  if (currentStepIndex === -1) return null;

  return (
    <div className="w-full bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-[1600px] mx-auto px-6 py-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isUpcoming = index > currentStepIndex;

              return (
                <React.Fragment key={step.id}>
                  {index > 0 && (
                    <ChevronRight className="w-4 h-4 text-slate-300 mx-1 flex-shrink-0" />
                  )}
                  <Link href={step.path}>
                    <div 
                      className={cn(
                        "flex items-center space-x-2 px-2 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap",
                        isCompleted && "text-slate-500 hover:text-slate-700",
                        isCurrent && "text-coral-600 font-semibold bg-coral-50",
                        isUpcoming && "text-slate-300 hover:text-slate-400"
                      )}
                    >
                      {isCompleted && (
                        <div className="w-4 h-4 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                      )}
                      {isCurrent && (
                        <div className="w-4 h-4 rounded-full bg-coral-100 flex items-center justify-center text-[10px] font-bold text-coral-600">
                          {index + 1}
                        </div>
                      )}
                      {isUpcoming && (
                        <div className="w-4 h-4 rounded-full border border-slate-200 flex items-center justify-center text-[10px] text-slate-300">
                          {index + 1}
                        </div>
                      )}
                      <span>{step.label}</span>
                    </div>
                  </Link>
                </React.Fragment>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
