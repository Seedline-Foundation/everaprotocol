// T035 - Implement FeaturesGrid component
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { Card } from '@/components/shared/Card';

interface Feature {
  id: string;
  icon: string;
  title: string;
  description: string;
  benefits: string[];
}

interface FeaturesGridProps {
  headline: string;
  subheadline?: string;
  features: Feature[];
  columns?: 2 | 3 | 4;
}

export function FeaturesGrid({
  headline,
  subheadline,
  features,
  columns = 3,
}: FeaturesGridProps): JSX.Element {
  const gridColsClass = {
    2: 'lg:grid-cols-2',
    3: 'lg:grid-cols-3',
    4: 'lg:grid-cols-4',
  }[columns];

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

        {/* Features Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-2 ${gridColsClass} gap-8`}>
          {features.map((feature, index) => (
            <AnimatedSection
              key={feature.id}
              animation="slide-up"
              delay={index * 0.1}
            >
              <Card
                padding="large"
                shadow="medium"
                className="h-full flex flex-col"
              >
                {/* Icon */}
                <div
                  className="text-5xl mb-4"
                  role="img"
                  aria-label={feature.title}
                >
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-charcoal mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-charcoal/70 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits List */}
                {feature.benefits && feature.benefits.length > 0 && (
                  <div className="mt-auto pt-4 border-t border-charcoal/10">
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <li
                          key={benefitIndex}
                          className="flex items-start gap-2 text-sm text-charcoal/80"
                        >
                          <svg
                            className="w-5 h-5 text-gold flex-shrink-0 mt-0.5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
