'use client';

import { ChangeEvent, useState } from 'react';

interface SearchBarProps {
  onSearch: (term: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xs">
      <input
        type="text"
        placeholder="Search Starships..."
        value={search}
        onChange={handleChange}
        className="
          block w-full appearance-none rounded-md border 
          border-gray-300 bg-white px-3 py-2 pr-8 text-sm 
          text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1
          focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200
          dark:focus:border-indigo-500 dark:focus:ring-indigo-500
        "
      />
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 dark:text-gray-500">
        <svg
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10 6a4 4 0 100 8 4 4 0 000-8zM21 
               21l-4.35-4.35"
          />
        </svg>
      </div>
    </div>
  );
}
