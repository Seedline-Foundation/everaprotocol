// T050 - Implement JobFilterBar component
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export interface JobFilters {
  category: string;
  location: string;
  employmentType: string;
}

interface JobFilterBarProps {
  onFilterChange: (filters: JobFilters) => void;
  matchingJobsCount: number;
  totalJobsCount: number;
  categories: string[];
}

export function JobFilterBar({
  onFilterChange,
  matchingJobsCount,
  totalJobsCount,
  categories,
}: JobFilterBarProps): JSX.Element {
  const [filters, setFilters] = useState<JobFilters>({
    category: 'All Positions',
    location: 'All Locations',
    employmentType: 'All Types',
  });

  const locations = ['All Locations', 'Remote', 'On-site', 'Hybrid'];
  const employmentTypes = ['All Types', 'Full-time', 'Part-time', 'Contract'];

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const hasActiveFilters =
    filters.category !== 'All Positions' ||
    filters.location !== 'All Locations' ||
    filters.employmentType !== 'All Types';

  const clearFilters = () => {
    const defaultFilters: JobFilters = {
      category: 'All Positions',
      location: 'All Locations',
      employmentType: 'All Types',
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="bg-white border border-stone-200 rounded-lg p-6 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-charcoal">Filter Positions</h2>
          <p className="text-sm text-charcoal/60 mt-1">
            Showing{' '}
            <span className="font-semibold text-gold">{matchingJobsCount}</span>{' '}
            of {totalJobsCount} positions
          </p>
        </div>

        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="text-sm text-coral hover:text-coral/80 font-medium flex items-center gap-1.5 transition-colors"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            Clear Filters
          </motion.button>
        )}
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label
            htmlFor="category-filter"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Category
          </label>
          <select
            id="category-filter"
            value={filters.category}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div>
          <label
            htmlFor="location-filter"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Location
          </label>
          <select
            id="location-filter"
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          >
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Employment Type Filter */}
        <div>
          <label
            htmlFor="employment-type-filter"
            className="block text-sm font-medium text-charcoal mb-2"
          >
            Employment Type
          </label>
          <select
            id="employment-type-filter"
            value={filters.employmentType}
            onChange={(e) =>
              handleFilterChange('employmentType', e.target.value)
            }
            className="w-full px-4 py-2.5 bg-white border border-stone-300 rounded-lg text-charcoal focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all"
          >
            {employmentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-stone-200"
        >
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-charcoal/60">Active filters:</span>
            {filters.category !== 'All Positions' && (
              <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium flex items-center gap-1.5">
                {filters.category}
                <button
                  onClick={() => handleFilterChange('category', 'All Positions')}
                  className="hover:bg-gold/20 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
            {filters.location !== 'All Locations' && (
              <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium flex items-center gap-1.5">
                {filters.location}
                <button
                  onClick={() => handleFilterChange('location', 'All Locations')}
                  className="hover:bg-gold/20 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
            {filters.employmentType !== 'All Types' && (
              <span className="px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium flex items-center gap-1.5">
                {filters.employmentType}
                <button
                  onClick={() => handleFilterChange('employmentType', 'All Types')}
                  className="hover:bg-gold/20 rounded-full p-0.5"
                >
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
