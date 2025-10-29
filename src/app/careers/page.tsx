// T063 - Implement careers page
'use client';

import { useState, useMemo } from 'react';
import { JobListingCard } from '@/components/careers/JobListingCard';
import { JobFilterBar, JobFilters } from '@/components/careers/JobFilterBar';
import { JobDetailModal } from '@/components/careers/JobDetailModal';
import { EmailCaptureForm } from '@/components/shared/EmailCaptureForm';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { jobListings, jobCategories, noOpeningsMessage } from '@/content/careers';
import { JobListing } from '@/types';

export default function CareersPage(): JSX.Element {
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState<JobFilters>({
    category: 'All Positions',
    location: 'All Locations',
    employmentType: 'All Types',
  });

  const handleViewDetails = (job: JobListing) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedJob(null), 300); // Wait for animation
  };

  // Filter jobs based on active filters
  const filteredJobs = useMemo(() => {
    return jobListings.filter((job) => {
      const categoryMatch =
        filters.category === 'All Positions' || job.category === filters.category;
      
      const locationMatch =
        filters.location === 'All Locations' || job.location === filters.location;
      
      const employmentTypeMatch =
        filters.employmentType === 'All Types' ||
        job.employmentType === filters.employmentType.toLowerCase().replace(' ', '-');

      return categoryMatch && locationMatch && employmentTypeMatch;
    });
  }, [filters]);

  const hasJobs = filteredJobs.length > 0;

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-charcoal via-charcoal to-charcoal/90 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                Join the Fight for Truth
              </h1>
              <p className="text-xl md:text-2xl text-stone mb-8">
                Build the future of verifiable information. Join a team of
                innovators working to restore trust in the digital age.
              </p>
              <div className="flex flex-wrap gap-4 text-white/80">
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Fully Remote</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Competitive Salary + Equity + Tokens</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-gold"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Flexible Hours</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Job Listings Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* Filter Bar */}
          <JobFilterBar
            onFilterChange={setFilters}
            matchingJobsCount={filteredJobs.length}
            totalJobsCount={jobListings.length}
            categories={jobCategories}
          />

          {/* Job Cards Grid */}
          {hasJobs ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job, index) => (
                <JobListingCard
                  key={job.id}
                  job={job}
                  onViewDetails={handleViewDetails}
                  index={index}
                />
              ))}
            </div>
          ) : (
            /* No Openings State */
            <AnimatedSection animation="fade">
              <div className="max-w-2xl mx-auto text-center py-16">
                <div className="mb-8">
                  <svg
                    className="w-24 h-24 mx-auto text-charcoal/20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-charcoal mb-4">
                  {noOpeningsMessage.title}
                </h2>
                <p className="text-lg text-charcoal/70 mb-8">
                  {noOpeningsMessage.description}
                </p>

                {/* Email Capture for Talent Pool */}
                <div className="bg-white rounded-lg p-8 shadow-lg border border-stone-200">
                  <h3 className="text-xl font-bold text-charcoal mb-4">
                    Join Our Talent Pool
                  </h3>
                  <p className="text-charcoal/70 mb-6">
                    We'll notify you when positions matching your interests
                    become available.
                  </p>
                  <EmailCaptureForm
                    source="careers-talent-pool"
                    onSuccess={() => {
                      // Could show a success message or redirect
                    }}
                  />
                </div>

                <p className="mt-6 text-sm text-charcoal/60">
                  Or reach out directly at{' '}
                  <a
                    href={noOpeningsMessage.ctaLink}
                    className="text-gold hover:underline font-medium"
                  >
                    careers@evera.network
                  </a>
                </p>
              </div>
            </AnimatedSection>
          )}
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <AnimatedSection animation="fade">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-charcoal mb-4">
                Our Culture & Values
              </h2>
              <p className="text-lg text-charcoal/70">
                We're building more than a protocol—we're building a movement
                to restore truth in the information age.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '🎯',
                  title: 'Mission-Driven',
                  description:
                    'Every line of code contributes to fighting misinformation',
                },
                {
                  icon: '🌍',
                  title: 'Global Team',
                  description:
                    'Remote-first with team members across 15+ countries',
                },
                {
                  icon: '🚀',
                  title: 'Fast-Paced',
                  description:
                    'Move quickly, iterate often, and ship features that matter',
                },
                {
                  icon: '🤝',
                  title: 'Collaborative',
                  description:
                    'Open communication, transparent decisions, shared ownership',
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="bg-stone-50 rounded-lg p-6 text-center hover:shadow-lg transition-shadow"
                >
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    {value.title}
                  </h3>
                  <p className="text-charcoal/70">{value.description}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Job Detail Modal */}
      <JobDetailModal
        job={selectedJob}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}
