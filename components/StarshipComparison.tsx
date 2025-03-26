import { Starship } from "@/store/starships";

interface StarshipComparisonProps {
  starships: Starship[];
  isOpen: boolean;
  onClose: () => void;
}

export default function StarshipComparison({ starships, isOpen, onClose }: StarshipComparisonProps) {
  if (!isOpen) return null;

  const compareAttributes = [
    { key: 'name', label: 'Name' },
    { key: 'model', label: 'Model' },
    { key: 'manufacturer', label: 'Manufacturer' },
    { key: 'crew', label: 'Crew' },
    { key: 'hyperdrive_rating', label: 'Hyperdrive Rating' },
  ];

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-yellow-400 rounded-lg p-6 w-[90vw] max-w-4xl max-h-[80vh] overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-yellow-400">Starship Comparison</h2>
          <button 
            onClick={onClose}
            className="text-yellow-400 hover:text-yellow-300"
          >
            ✕
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left p-2 text-yellow-400 border-b border-yellow-400/30">
                  Specification
                </th>
                {starships.map((ship) => (
                  <th 
                    key={ship.url} 
                    className="text-left p-2 text-yellow-400 border-b border-yellow-400/30"
                  >
                    {ship.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compareAttributes.map((attr) => (
                <tr key={attr.key}>
                  <td className="p-2 border-b border-yellow-400/10 text-yellow-400">
                    {attr.label}
                  </td>
                  {starships.map((ship) => (
                    <td 
                      key={ship.url}
                      className="p-2 border-b border-yellow-400/10 text-yellow-400"
                    >
                      {ship[attr.key as keyof Starship]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}