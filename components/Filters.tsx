'use client';

import { Dispatch, SetStateAction } from 'react';

export interface FilterState {
  hyperdrive: string;
  crew: string;
}

interface FiltersProps {
  filters: FilterState;
  setFilters: Dispatch<SetStateAction<FilterState>>;
}

export default function Filters({ filters, setFilters }: FiltersProps) {
  const handleHyperdriveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, hyperdrive: e.target.value }));
  };

  const handleCrewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({ ...prev, crew: e.target.value }));
  };

  return (
    <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
      {/* Hyperdrive Filter */}
      <div className="relative w-full max-w-xs">
        <select
          value={filters.hyperdrive}
          onChange={handleHyperdriveChange}
          className="
            block w-full appearance-none rounded-md border 
            border-gray-300 bg-white px-3 py-2 pr-8 text-sm 
            text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 
            focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 
            dark:focus:border-indigo-500 dark:focus:ring-indigo-500
          "
        >
          <option value="" disabled>
            Hyperdrive rating...
          </option>
          <option value="">All</option>
          <option value="<1.0">{'<1.0'}</option>
          <option value="1.0-2.0">1.0-2.0</option>
          <option value=">2.0">{'>2.0'}</option>
        </select>
        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-gray-500">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a.5.5 0 01-.35-.15l-3-3a.5.5 0 01.7-.7L10 10.29l2.65-2.64a.5.5 0 01.7.7l-3 3A.5.5 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {/* Crew Size Filter */}
      <div className="relative w-full max-w-xs">
        <select
          value={filters.crew}
          onChange={handleCrewChange}
          className="
            block w-full appearance-none rounded-md border 
            border-gray-300 bg-white px-3 py-2 pr-8 text-sm 
            text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 
            focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 
            dark:focus:border-indigo-500 dark:focus:ring-indigo-500
          "
        >
          <option value="" disabled>
            Crew size...
          </option>
          <option value="">All</option>
          <option value="1-5">1-5</option>
          <option value="6-50">6-50</option>
          <option value="50+">50+</option>
        </select>
        {/* Custom arrow icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400 dark:text-gray-500">
          <svg
            className="h-4 w-4"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a.5.5 0 01-.35-.15l-3-3a.5.5 0 01.7-.7L10 10.29l2.65-2.64a.5.5 0 01.7.7l-3 3A.5.5 0 0110 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
