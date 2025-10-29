// T049 - Implement JobListingCard component
'use client';

import { JobListing } from '@/types';
import { Card } from '@/components/shared/Card';
import { Button } from '@/components/shared/Button';
import { motion } from 'framer-motion';

interface JobListingCardProps {
  job: JobListing;
  onViewDetails: (job: JobListing) => void;
  index?: number;
}

export function JobListingCard({
  job,
  onViewDetails,
  index = 0,
}: JobListingCardProps): JSX.Element {
  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  const getEmploymentTypeColor = (type: string): string => {
    switch (type) {
      case 'full-time':
        return 'bg-gold/10 text-gold border-gold/30';
      case 'part-time':
        return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'contract':
        return 'bg-purple-100 text-purple-700 border-purple-300';
      default:
        return 'bg-stone-100 text-charcoal border-stone-300';
    }
  };

  const getEmploymentTypeLabel = (type: string): string => {
    return type
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <Card
        clickable
        onClick={() => onViewDetails(job)}
        className="h-full flex flex-col hover:shadow-xl transition-shadow duration-300"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition-colors">
              {job.title}
            </h3>
            <div className="flex flex-wrap gap-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium border ${getEmploymentTypeColor(
                  job.employmentType
                )}`}
              >
                {getEmploymentTypeLabel(job.employmentType)}
              </span>
            </div>
          </div>
          
          {/* Posted date badge */}
          <div className="ml-4 text-right">
            <span className="text-xs text-charcoal/60">
              {formatDate(job.postedDate)}
            </span>
          </div>
        </div>

        {/* Meta Info */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-charcoal/70">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            <span>{job.category}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span>{job.location}</span>
          </div>

          {job.compensation && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4"
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
              <span>{job.compensation}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-charcoal/80 mb-6 flex-1 line-clamp-3">
          {job.description}
        </p>

        {/* View Details Button */}
        <div className="mt-auto">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(job);
            }}
            className="w-full group-hover:bg-gold group-hover:text-charcoal group-hover:border-gold"
          >
            View Details
            <svg
              className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Button>
        </div>
      </Card>
    </motion.div>
  );
}
