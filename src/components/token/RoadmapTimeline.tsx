// T040 - Implement RoadmapTimeline component
'use client';

import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card } from '@/components/shared/Card';
import { Milestone } from '@/types';

interface RoadmapTimelineProps {
  milestones: Milestone[];
  showProgress?: boolean;
  showEvidence?: boolean;
}

export function RoadmapTimeline({
  milestones,
  showProgress = true,
  showEvidence = true,
}: RoadmapTimelineProps): JSX.Element {
  // Sort milestones by target date
  const sortedMilestones = [...milestones].sort(
    (a, b) => a.targetDate.getTime() - b.targetDate.getTime()
  );

  const getStatusConfig = (status: Milestone['status']) => {
    const configs = {
      completed: {
        badge: '✓',
        badgeClass: 'bg-gold/20 text-gold border-gold/30',
        iconClass: 'bg-gold',
        lineClass: 'bg-gold',
        label: 'Completed',
      },
      'in-progress': {
        badge: '⚡',
        badgeClass: 'bg-charcoal/10 text-charcoal border-charcoal/20',
        iconClass: 'bg-charcoal',
        lineClass: 'bg-charcoal/30',
        label: 'In Progress',
      },
      planned: {
        badge: '📅',
        badgeClass: 'bg-stone/50 text-charcoal/60 border-charcoal/10',
        iconClass: 'bg-stone',
        lineClass: 'bg-stone',
        label: 'Planned',
      },
      delayed: {
        badge: '⏱',
        badgeClass: 'bg-coral/20 text-coral border-coral/30',
        iconClass: 'bg-coral',
        lineClass: 'bg-coral/30',
        label: 'Delayed',
      },
    };
    return configs[status];
  };

  const getCategoryColor = (category: Milestone['category']): string => {
    const colors: Record<Milestone['category'], string> = {
      development: 'text-charcoal',
      marketing: 'text-gold',
      partnerships: 'text-coral',
    };
    return colors[category] || 'text-charcoal';
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="w-full">
      <AnimatedSection animation="fade">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-charcoal mb-4">
            Development Roadmap
          </h2>
          <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
            Track our progress as we build the future of information verification
          </p>
        </div>
      </AnimatedSection>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-stone hidden md:block" />

        {/* Milestones */}
        <div className="space-y-8">
          {sortedMilestones.map((milestone, index) => {
            const statusConfig = getStatusConfig(milestone.status);
            const isCompleted = milestone.status === 'completed';
            const isDelayed = milestone.status === 'delayed';

            return (
              <AnimatedSection
                key={milestone.id}
                animation="slide-left"
                delay={index * 0.1}
              >
                <div className="relative pl-0 md:pl-20">
                  {/* Timeline Icon (Desktop) */}
                  <div className="absolute left-6 top-6 hidden md:block">
                    <div
                      className={`w-5 h-5 rounded-full ${statusConfig.iconClass} border-4 border-white shadow-lg`}
                    />
                  </div>

                  {/* Milestone Card */}
                  <Card padding="large" shadow="medium" className="hover:shadow-large transition-shadow">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                      {/* Content */}
                      <div className="flex-1">
                        {/* Status Badge & Category */}
                        <div className="flex items-center gap-3 mb-3">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${statusConfig.badgeClass}`}
                          >
                            {statusConfig.badge} {statusConfig.label}
                          </span>
                          <span
                            className={`text-xs font-semibold uppercase tracking-wider ${getCategoryColor(
                              milestone.category
                            )}`}
                          >
                            {milestone.category}
                          </span>
                        </div>

                        {/* Title & Description */}
                        <h3 className="text-2xl font-bold text-charcoal mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-charcoal/70 mb-4">
                          {milestone.description}
                        </p>

                        {/* Dates */}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-charcoal/60 mb-4">
                          <div>
                            <span className="font-semibold">Target:</span>{' '}
                            {formatDate(milestone.targetDate)}
                          </div>
                          {isCompleted && milestone.completedDate && (
                            <div className="text-gold">
                              <span className="font-semibold">Completed:</span>{' '}
                              {formatDate(milestone.completedDate)}
                            </div>
                          )}
                        </div>

                        {/* Progress Bar */}
                        {showProgress && milestone.progress !== undefined && (
                          <div className="mb-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-charcoal/70">
                                Progress
                              </span>
                              <span className="text-xs font-bold text-gold">
                                {milestone.progress}%
                              </span>
                            </div>
                            <div className="w-full h-2 bg-stone rounded-full overflow-hidden">
                              <div
                                className={`h-full transition-all duration-500 ${
                                  isCompleted ? 'bg-gold' : 'bg-charcoal'
                                }`}
                                style={{ width: `${milestone.progress}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Delay Reason */}
                        {isDelayed && milestone.delayExplanation && (
                          <div className="mb-4 p-3 bg-coral/10 border border-coral/30 rounded-lg">
                            <p className="text-sm text-coral">
                              <span className="font-semibold">Delay Reason:</span>{' '}
                              {milestone.delayExplanation}
                            </p>
                          </div>
                        )}

                        {/* Evidence Links */}
                        {showEvidence &&
                          milestone.evidence &&
                          milestone.evidence.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {milestone.evidence.map((item, idx) => (
                                <a
                                  key={idx}
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-charcoal/5 hover:bg-charcoal/10 rounded-lg text-xs font-medium text-charcoal transition-colors"
                                >
                                  {item.type === 'github' && '💻'}
                                  {item.type === 'announcement' && '📢'}
                                  {item.type === 'contract' && '�'}
                                  <span>{item.label}</span>
                                  <svg
                                    className="w-3 h-3"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                  </svg>
                                </a>
                              ))}
                            </div>
                          )}
                      </div>
                    </div>
                  </Card>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </div>
  );
}
