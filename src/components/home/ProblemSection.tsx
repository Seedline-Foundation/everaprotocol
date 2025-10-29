// T033 - Implement ProblemSection component
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card } from '@/components/shared/Card';

interface Problem {
  id: string;
  icon: string;
  title: string;
  description: string;
  impact: string;
}

interface ProblemSectionProps {
  headline: string;
  subheadline?: string;
  problems: Problem[];
}

export function ProblemSection({
  headline,
  subheadline,
  problems,
}: ProblemSectionProps): JSX.Element {
  return (
    <section className="py-20 bg-stone-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <AnimatedSection animation="fade">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">
              {headline}
            </h2>
            {subheadline && (
              <p className="text-xl text-charcoal/70 max-w-3xl mx-auto">
                {subheadline}
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <AnimatedSection
              key={problem.id}
              animation="slide-up"
              delay={index * 0.1}
            >
              <Card
                padding="large"
                shadow="medium"
                className="h-full hover:shadow-large transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="text-5xl mb-4" role="img" aria-label={problem.title}>
                  {problem.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-charcoal mb-3">
                  {problem.title}
                </h3>

                {/* Description */}
                <p className="text-charcoal/70 mb-4 leading-relaxed">
                  {problem.description}
                </p>

                {/* Impact Badge */}
                <div className="mt-auto pt-4 border-t border-charcoal/10">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-coral/10 rounded-full">
                    <svg
                      className="w-4 h-4 text-coral"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    <span className="text-sm font-semibold text-coral">
                      {problem.impact}
                    </span>
                  </div>
                </div>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
