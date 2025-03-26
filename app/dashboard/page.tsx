'use client';

import { useState } from 'react';
import { useAtom } from 'jotai';

import SearchBar from '@/components/SearchBar';
import Filters, { FilterState } from '@/components/Filters';
import StarshipTable from '@/components/StarshipTable';

import { useStarships } from '@/hooks/useStarships';
import { selectedStarshipsAtom, Starship } from '@/store/starships';
import StarshipComparison from '@/components/StarshipComparison';
import LoadingTrigger from '@/components/LoadingTrigger';


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
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  // Use our updated hook with debounced search + manual infinite scrolling
  const {
    starships,        
    fetchNextPage,    
    hasNextPage,      
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
      if (current.some((s) => s.url === starship.url)) {
        return current.filter((s) => s.url !== starship.url);
      }
      if (current.length < 3) {
        return [...current, starship];
      }
      return current;
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Star Wars Fleet Dashboard</h1>
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <SearchBar onSearch={setSearchTerm} />
        <Filters filters={filters} setFilters={setFilters} />
      </div>

      {/* Show loading and error states within the table section */}
      {isError ? (
        <div className="p-4 text-red-500">Failed to fetch starships!</div>
      ) : (
        <>
         {/* Currently selected starships */}
      <div className="mt-4 flex items-center justify-between mb-4">
        <p>Selected Starships ({selectedStarships.length}):</p>
        {selectedStarships.length > 1 && (
          <button
            onClick={() => setIsComparisonOpen(true)}
            className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300 transition-colors"
          >
            Compare Selected ({selectedStarships.length})
          </button>
        )}
      </div>
          <StarshipTable
            data={filteredStarships}
            onSelectStarship={handleSelectStarship}
            selectedStarships={selectedStarships}
            isLoading={isLoading}
          />

          {hasNextPage && (
            <LoadingTrigger
              onTrigger={fetchNextPage} 
              enabled={!isLoading && hasNextPage} 
            />
          )}
        </>
      )}
      <StarshipComparison
        starships={selectedStarships}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </div>
  );
}
