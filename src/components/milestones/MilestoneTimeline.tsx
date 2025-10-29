// T052 - Implement MilestoneTimeline component
'use client';

import { Milestone } from '@/types';
import { MilestoneCard } from './MilestoneCard';

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps): JSX.Element {
  const getStatusNodeColor = (status: Milestone['status']): string => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-500';
      case 'in-progress':
        return 'bg-gold border-gold';
      case 'planned':
        return 'bg-white border-stone-300';
      case 'delayed':
        return 'bg-coral border-coral';
      default:
        return 'bg-white border-stone-300';
    }
  };

  const getStatusIcon = (status: Milestone['status']): JSX.Element | null => {
    switch (status) {
      case 'completed':
        return (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case 'in-progress':
        return (
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={3}
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case 'delayed':
        return (
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="relative max-w-4xl mx-auto">
      {/* Timeline Line */}
      <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-stone-300" aria-hidden="true" />

      {/* Milestones */}
      <div className="space-y-8">
        {milestones.map((milestone, index) => (
          <div key={milestone.id} id={`milestone-${milestone.id}`} className="relative">
            {/* Timeline Node */}
            <div className="absolute left-0 top-6 flex items-center justify-center">
              <div
                className={`w-16 h-16 rounded-full border-4 ${getStatusNodeColor(
                  milestone.status
                )} flex items-center justify-center shadow-lg z-10 relative`}
              >
                {getStatusIcon(milestone.status)}
                
                {/* Progress Ring for in-progress milestones */}
                {milestone.status === 'in-progress' && milestone.progress !== undefined && (
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 64 64">
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.3)"
                      strokeWidth="4"
                    />
                    <circle
                      cx="32"
                      cy="32"
                      r="28"
                      fill="none"
                      stroke="white"
                      strokeWidth="4"
                      strokeDasharray={`${2 * Math.PI * 28}`}
                      strokeDashoffset={`${2 * Math.PI * 28 * (1 - milestone.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
            </div>

            {/* Milestone Card */}
            <div className="ml-24">
              <MilestoneCard milestone={milestone} index={index} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
