// T048 - Implement TeamGrid component
'use client';

import { useState } from 'react';
import { TeamMemberCard } from './TeamMemberCard';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { TeamMember } from '@/types';

type TeamCategory = 'all' | 'founders' | 'team' | 'advisors';

interface TeamGridProps {
  members: TeamMember[];
  showFilters?: boolean;
  variant?: 'compact' | 'detailed';
  title?: string;
  subtitle?: string;
}

export function TeamGrid({
  members,
  showFilters = false,
  variant = 'detailed',
  title,
  subtitle,
}: TeamGridProps): JSX.Element {
  const [activeFilter, setActiveFilter] = useState<TeamCategory>('all');

  // Categorize members
  const founders = members.filter((m) => m.isFounder);
  const advisors = members.filter((m) => m.isAdvisor);
  const team = members.filter((m) => !m.isFounder && !m.isAdvisor);

  // Filter members based on active filter
  const getFilteredMembers = (): TeamMember[] => {
    switch (activeFilter) {
      case 'founders':
        return founders;
      case 'advisors':
        return advisors;
      case 'team':
        return team;
      default:
        return members;
    }
  };

  const filteredMembers = getFilteredMembers();

  // Category labels for filter buttons
  const filterOptions: { key: TeamCategory; label: string; count: number }[] = [
    { key: 'all', label: 'All Team', count: members.length },
    { key: 'founders', label: 'Founders', count: founders.length },
    { key: 'team', label: 'Core Team', count: team.length },
    { key: 'advisors', label: 'Advisors', count: advisors.length },
  ];

  return (
    <section className="w-full">
      {/* Header */}
      {(title || subtitle) && (
        <div className="text-center mb-12">
          {title && (
            <AnimatedSection>
              <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
                {title}
              </h2>
            </AnimatedSection>
          )}
          {subtitle && (
            <AnimatedSection delay={0.1}>
              <p className="text-lg md:text-xl text-charcoal/70 max-w-3xl mx-auto">
                {subtitle}
              </p>
            </AnimatedSection>
          )}
        </div>
      )}

      {/* Category Filters */}
      {showFilters && filterOptions.length > 1 && (
        <AnimatedSection delay={0.2}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filterOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => setActiveFilter(option.key)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  activeFilter === option.key
                    ? 'bg-gold text-charcoal'
                    : 'bg-stone-50 text-charcoal/70 hover:bg-stone-100'
                }`}
              >
                {option.label} ({option.count})
              </button>
            ))}
          </div>
        </AnimatedSection>
      )}

      {/* Team Grid */}
      {filteredMembers.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-charcoal/60">No team members found in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {filteredMembers.map((member, index) => (
            <AnimatedSection key={member.id} delay={0.1 * (index % 4)}>
              <TeamMemberCard member={member} variant={variant} />
            </AnimatedSection>
          ))}
        </div>
      )}

      {/* Team Stats (if showing all) */}
      {activeFilter === 'all' && filterOptions.length > 1 && (
        <AnimatedSection delay={0.4}>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
            {filterOptions.filter((opt) => opt.key !== 'all' && opt.count > 0).map((option) => (
              <div
                key={option.key}
                className="text-center p-6 bg-stone-50 rounded-lg"
              >
                <div className="text-3xl font-bold text-gold mb-2">{option.count}</div>
                <div className="text-sm text-charcoal/70 font-semibold">
                  {option.label}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      )}
    </section>
  );
}
