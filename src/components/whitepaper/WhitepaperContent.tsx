// T044 - Implement WhitepaperContent component
'use client';

import { Card } from '@/components/shared/Card';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

export interface WhitepaperSection {
  id: string;
  title: string;
  content: string | string[];
  subsections?: WhitepaperSubsection[];
  level: 1 | 2 | 3;
}

export interface WhitepaperSubsection {
  id: string;
  title: string;
  content: string | string[];
}

interface WhitepaperContentProps {
  sections: WhitepaperSection[];
  className?: string;
}

export function WhitepaperContent({
  sections,
  className = '',
}: WhitepaperContentProps): JSX.Element {
  const renderContent = (content: string | string[]): JSX.Element => {
    if (Array.isArray(content)) {
      return (
        <>
          {content.map((paragraph, index) => (
            <p key={index} className="mb-4 text-charcoal/80 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </>
      );
    }
    return <p className="mb-4 text-charcoal/80 leading-relaxed">{content}</p>;
  };

  const getHeadingClass = (level: 1 | 2 | 3): string => {
    switch (level) {
      case 1:
        return 'text-4xl md:text-5xl font-bold text-charcoal mb-6 mt-12 first:mt-0';
      case 2:
        return 'text-3xl md:text-4xl font-bold text-charcoal mb-4 mt-10';
      case 3:
        return 'text-2xl md:text-3xl font-semibold text-charcoal mb-4 mt-8';
    }
  };

  return (
    <article className={`prose prose-lg max-w-none ${className}`}>
      {sections.map((section, sectionIndex) => (
        <AnimatedSection key={section.id} delay={0.1 * (sectionIndex % 5)}>
          <section id={section.id} className="mb-12 scroll-mt-24">
            {/* Section Title */}
            <h2 className={getHeadingClass(section.level)}>
              {section.title}
            </h2>

            {/* Section Content */}
            <div className="space-y-4">
              {renderContent(section.content)}
            </div>

            {/* Subsections */}
            {section.subsections && section.subsections.length > 0 && (
              <div className="mt-8 space-y-8">
                {section.subsections.map((subsection) => (
                  <div
                    key={subsection.id}
                    id={subsection.id}
                    className="scroll-mt-24"
                  >
                    <h3 className="text-xl md:text-2xl font-semibold text-charcoal mb-4">
                      {subsection.title}
                    </h3>
                    <div className="space-y-4 pl-4 border-l-4 border-gold/30">
                      {renderContent(subsection.content)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </AnimatedSection>
      ))}
    </article>
  );
}

// Helper component for callout boxes
export function WhitepaperCallout({
  type = 'info',
  title,
  children,
}: {
  type?: 'info' | 'warning' | 'success';
  title?: string;
  children: React.ReactNode;
}): JSX.Element {
  const typeStyles = {
    info: 'bg-stone-50 border-charcoal/20',
    warning: 'bg-coral/5 border-coral/30',
    success: 'bg-gold/5 border-gold/30',
  };

  const iconMap = {
    info: '💡',
    warning: '⚠️',
    success: '✅',
  };

  return (
    <Card
      padding="medium"
      className={`border-l-4 ${typeStyles[type]} my-6`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{iconMap[type]}</span>
        <div className="flex-1">
          {title && (
            <h4 className="font-semibold text-charcoal mb-2">{title}</h4>
          )}
          <div className="text-charcoal/80 text-sm">{children}</div>
        </div>
      </div>
    </Card>
  );
}

// Helper component for code blocks
export function WhitepaperCode({
  code,
  language = 'javascript',
}: {
  code: string;
  language?: string;
}): JSX.Element {
  return (
    <pre className="bg-charcoal text-stone p-4 rounded-lg overflow-x-auto my-6">
      <code className={`language-${language} text-sm`}>{code}</code>
    </pre>
  );
}

// Helper component for lists
export function WhitepaperList({
  items,
  ordered = false,
}: {
  items: string[];
  ordered?: boolean;
}): JSX.Element {
  const ListTag = ordered ? 'ol' : 'ul';
  const listClass = ordered
    ? 'list-decimal list-inside space-y-2 my-4 pl-4'
    : 'list-disc list-inside space-y-2 my-4 pl-4';

  return (
    <ListTag className={listClass}>
      {items.map((item, index) => (
        <li key={index} className="text-charcoal/80 leading-relaxed">
          {item}
        </li>
      ))}
    </ListTag>
  );
}
