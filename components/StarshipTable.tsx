'use client';

import { Starship } from '@/store/starships';

interface StarshipTableProps {
  data: Starship[];
  onSelectStarship: (starship: Starship) => void;
  selectedStarships: Starship[];
  isLoading: boolean;
}

export default function StarshipTable({
  data,
  onSelectStarship,
  selectedStarships,
  isLoading
}: StarshipTableProps) {

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="p-4 overflow-x-auto border border-gray-200 dark:border-gray-700 shadow-sm sm:rounded-lg">
     <div className='text-2xl font-bold mb-4 color:blue-500'>
        Star Ships
      </div>
      <table className="w-full border-collapse text-left text-sm text-gray-500 dark:text-gray-400">
        {/* Sticky header */}
        <thead className="sticky top-0 bg-gray-100 dark:bg-gray-800 text-xs uppercase tracking-wider text-gray-700 dark:text-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Select
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Model
            </th>
            <th scope="col" className="px-6 py-3">
              Manufacturer
            </th>
            <th scope="col" className="px-6 py-3">
              Crew
            </th>
            <th scope="col" className="px-6 py-3">
              Hyperdrive Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((ship, idx) => {
            const isSelected = selectedStarships.some((s) => s.url === ship.url);
          
            const rowClasses = `
              ${idx % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50 dark:bg-gray-900'}
              hover:bg-gray-100 dark:hover:bg-gray-700
              transition-colors
            `;

            return (
              <tr key={ship.url} className={rowClasses}>
                <td className="px-6 py-4">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onSelectStarship(ship)}
                    className="h-4 w-4 accent-blue-600 dark:accent-blue-500 cursor-pointer"
                  />
                </td>
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">
                  {ship.name}
                </td>
                <td className="px-6 py-4">
                  {ship.model}
                </td>
                <td className="px-6 py-4">
                  {ship.manufacturer}
                </td>
                <td className="px-6 py-4">
                  {ship.crew}
                </td>
                <td className="px-6 py-4">
                  {ship.hyperdrive_rating}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
