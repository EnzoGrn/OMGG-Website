"use client";

import { cn } from "@/lib/utils";
import { IconType } from "react-icons";

export interface TimelineStep {
  id: number;
  title: string;
  subTitle: string;
  description: string;
  icon: IconType;
}

interface StepTimelineProps {
  steps: TimelineStep[];
  currentStep: number;
  completedSteps: number[];
  onStepClick?: (stepId: number) => void;
}

export type SubmitStepStatus = "completed" | "current" | "pending";

export function StepTimeline({ steps, currentStep, completedSteps, onStepClick }: StepTimelineProps) {

  const getStepStatus = (stepId: number): SubmitStepStatus => {
    if (completedSteps.includes(stepId))
      return "completed";
    if (stepId === currentStep)
      return "current";
    return "pending";
  };

  const getStepColor = (status: SubmitStepStatus): string => {
    switch (status) {
      case "completed":
        return "bg-[#0DF776] border-[#0DF776]/50 ring-0 lg:ring-2 ring-[#0DF776]/50 text-foreground";
      case "current":
        return "bg-primary border-primary/50 ring-0 lg:ring-2 ring-primary/50 text-foreground";
      default:
        return "bg-gray-300 border-gray-300 text-muted-foreground";
    }
  };

  return (
    <div className="w-full py-8 overflow-x-visible max-w-5xl mx-auto">

      {/* Desktop Timeline */}
      <div className="hidden md:flex items-center justify-between w-full">
        {steps.map((step, index) => {
          const status = getStepStatus(step.id);
          const Icon = step.icon;
          const isClickable = onStepClick && (status === "completed" || status === "current");
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className={cn("flex items-center", !isLast && "flex-1")}>
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300",
                    getStepColor(status),
                    isClickable && "cursor-pointer hover:scale-110",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  <Icon className="w-7 h-7" />
                </button>
                <span className={cn(
                  "text-sm font-medium text-center max-w-[120px]",
                  status === "current" ? "text-primary font-bold" : "text-muted-foreground"
                )}>
                  {step.title}
                </span>
              </div>

              {!isLast && (
                <div className="flex-1 mx-4 h-1 bg-gray-300 relative rounded-full">
                  <div
                    className={cn("absolute top-0 left-0 h-full transition-all duration-500 rounded-full",
                      (completedSteps.includes(steps[index + 1].id) || steps[index + 1].id === currentStep) ? "bg-[#0DF776] w-full" : "bg-gray-300 w-0"
                    )}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Timeline - Only Icons */}
      <div className="flex justify-center md:hidden w-full overflow-x-auto px-4 scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        <div className="flex items-center justify-center min-w-max max-w-lg">
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            const isClickable = onStepClick && (status === "completed" || status === "current");

            return (
              <div key={step.id} className="flex items-center w-full">
                <button
                  onClick={() => isClickable && onStepClick(step.id)}
                  disabled={!isClickable}
                  className={cn(
                    "w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300",
                    getStepColor(status),
                    isClickable && "cursor-pointer",
                    !isClickable && "cursor-not-allowed"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </button>

                {index < steps.length - 1 && (
                  <div className="w-8 h-1 bg-gray-300 mx-1 relative flex-shrink-0 rounded-full">
                    <div
                      className={cn(
                        "absolute top-0 left-0 h-full transition-all duration-500 rounded-full",
                        (completedSteps.includes(steps[index + 1].id) || steps[index + 1].id === currentStep) ? "bg-[#0DF776] w-full" : "bg-gray-300 w-0"
                      )}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
