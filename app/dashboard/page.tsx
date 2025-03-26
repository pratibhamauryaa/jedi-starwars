'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';

import SearchBar from '@/components/SearchBar';
import Filters, { FilterState } from '@/components/Filters';
import StarshipTable from '@/components/StarshipTable';

import { useStarships } from '@/hooks/useStarships';
import { selectedStarshipsAtom, Starship } from '@/store/starships';


export default function DashboardPage() {
  // Search term
  const [searchTerm, setSearchTerm] = useState('');
  // Filters (hyperdrive rating + crew size)
  const [filters, setFilters] = useState<FilterState>({
    hyperdrive: '',
    crew: '',
  });
  
  // Global store for selected starships
  const [selectedStarships, setSelectedStarships] = useAtom(selectedStarshipsAtom);

  // Use our updated hook with debounced search + manual infinite scrolling
  const {
    starships,        // combined array of starships from all pages
    fetchNextPage,    // function to load next page
    hasNextPage,      // boolean indicating if more pages exist
    isLoading,
    isError,
  } = useStarships(searchTerm);

  // Apply client-side filters (hyperdrive & crew) to the combined results
  const filteredStarships = starships.filter((starship) => {
    const numericCrew = parseInt(starship.crew.replace(/[^0-9]/g, ''), 10) || 0;
    const numericHyperdrive = parseFloat(starship.hyperdrive_rating) || 0;

    // Hyperdrive filter
    if (filters.hyperdrive === '<1.0' && numericHyperdrive >= 1.0) return false;
    if (filters.hyperdrive === '1.0-2.0' && (numericHyperdrive < 1.0 || numericHyperdrive > 2.0)) return false;
    if (filters.hyperdrive === '>2.0' && numericHyperdrive <= 2.0) return false;

    // Crew filter
    if (filters.crew === '1-5' && !(numericCrew >= 1 && numericCrew <= 5)) return false;
    if (filters.crew === '6-50' && !(numericCrew >= 6 && numericCrew <= 50)) return false;
    if (filters.crew === '50+' && numericCrew < 50) return false;

    return true;
  });

  // Toggle starship selection (up to 3)
  const handleSelectStarship = (starship: Starship) => {
    setSelectedStarships((current) => {
      // If already selected, remove it
      if (current.some((s) => s.url === starship.url)) {
        return current.filter((s) => s.url !== starship.url);
      }
      // If we have space, add it
      if (current.length < 3) {
        return [...current, starship];
      }
      // Otherwise, no change
      return current;
    });
  };

  // Handle loading/error states
  if (isLoading) return <div className="p-4">Loading starships...</div>;
  if (isError) return <div className="p-4 text-red-500">Failed to fetch starships!</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Star Wars Fleet Dashboard</h1>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
    <SearchBar onSearch={setSearchTerm} />

    <Filters filters={filters} setFilters={setFilters} />
  </div>

      <StarshipTable
        data={filteredStarships}
        onSelectStarship={handleSelectStarship}
        selectedStarships={selectedStarships}
      />

    
      {hasNextPage && (
        <button
          onClick={fetchNextPage}
          className="mt-4 px-4 py-2 border rounded"
        >
          Load More
        </button>
      )}

      {/* Currently selected starships */}
      <div className="mt-4">
        <p>Selected Starships ({selectedStarships.length}):</p>
        <ul>
          {selectedStarships.map((s) => (
            <li key={s.url}>{s.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
