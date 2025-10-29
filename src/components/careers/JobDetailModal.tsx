// T051 - Implement JobDetailModal component
'use client';

import { useEffect } from 'react';
import { JobListing } from '@/types';
import { Button } from '@/components/shared/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

interface JobDetailModalProps {
  job: JobListing | null;
  isOpen: boolean;
  onClose: () => void;
}

export function JobDetailModal({
  job,
  isOpen,
  onClose,
}: JobDetailModalProps): JSX.Element {
  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleApplyClick = () => {
    if (job) {
      trackEvent('job_application_click', {
        jobId: job.id,
        jobTitle: job.title,
        category: job.category,
        location: job.location,
      });
    }
  };

  if (!job) return <></>;

  const getEmploymentTypeLabel = (type: string): string => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 rounded-full bg-stone-100 hover:bg-stone-200 transition-colors"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-6 h-6 text-charcoal"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-charcoal via-charcoal to-charcoal/90 px-8 py-8 text-white">
                  <div className="flex items-start justify-between pr-12">
                    <div>
                      <h2 className="text-3xl font-bold mb-3">{job.title}</h2>
                      <div className="flex flex-wrap gap-3">
                        <span className="px-3 py-1 bg-gold/20 text-gold rounded-full text-sm font-medium border border-gold/30">
                          {getEmploymentTypeLabel(job.employmentType)}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium">
                          {job.category}
                        </span>
                        <span className="px-3 py-1 bg-white/10 text-white rounded-full text-sm font-medium">
                          {job.location}
                        </span>
                      </div>
                    </div>
                  </div>

                  {job.compensation && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-gold"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-lg font-semibold">
                          {job.compensation}
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="px-8 py-6 max-h-[60vh] overflow-y-auto">
                  {/* Description */}
                  <section className="mb-8">
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      About This Role
                    </h3>
                    <p className="text-charcoal/80 leading-relaxed">
                      {job.description}
                    </p>
                  </section>

                  {/* Responsibilities */}
                  <section className="mb-8">
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      Responsibilities
                    </h3>
                    <ul className="space-y-3">
                      {job.responsibilities.map((responsibility, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-charcoal/80"
                        >
                          <svg
                            className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{responsibility}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Qualifications */}
                  <section className="mb-8">
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      Qualifications
                    </h3>
                    <ul className="space-y-3">
                      {job.qualifications.map((qualification, index) => (
                        <li
                          key={index}
                          className="flex items-start gap-3 text-charcoal/80"
                        >
                          <svg
                            className="w-5 h-5 text-gold mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{qualification}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  {/* Company Culture */}
                  <section className="bg-stone-50 rounded-lg p-6 mb-8">
                    <h3 className="text-xl font-bold text-charcoal mb-3">
                      Why Join Evera?
                    </h3>
                    <ul className="space-y-2 text-charcoal/80">
                      <li className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        Work on cutting-edge blockchain technology
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        Fight misinformation and protect truth
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        Fully remote, flexible working hours
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        Competitive salary + equity + token allocation
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        Health insurance and wellness benefits
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-gold">•</span>
                        Professional development budget
                      </li>
                    </ul>
                  </section>
                </div>

                {/* Footer */}
                <div className="px-8 py-6 bg-stone-50 border-t border-stone-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-charcoal/60">
                      We're an equal opportunity employer committed to building a
                      diverse team.
                    </p>
                    <Button
                      variant="primary"
                      href={job.applyUrl}
                      onClick={handleApplyClick}
                      className="w-full sm:w-auto"
                    >
                      Apply Now
                      <svg
                        className="w-5 h-5 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
