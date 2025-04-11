import { useState } from 'react';

interface SearchHistoryProps {
  history: string[];
  onSelect: (query: string) => void;
  onClear: () => void;
}

function SearchHistory({ history, onSelect, onClear }: SearchHistoryProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (history.length === 0) return null;

  return (
    <div className="relative w-full max-w-md">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-icon absolute right-0 top-1/2 transform -translate-y-1/2"
        aria-label="Toggle search history"
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg z-10 border border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center p-3 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Recent Searches
            </h3>
            <button
              onClick={() => {
                onClear();
                setIsOpen(false);
              }}
              className="text-red-500 hover:text-red-700 text-sm transition-colors duration-200"
            >
              Clear All
            </button>
          </div>
          <ul className="max-h-48 overflow-y-auto">
            {history.map((query, index) => (
              <li
                key={index}
                className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200 text-gray-900 dark:text-gray-100"
                onClick={() => {
                  onSelect(query);
                  setIsOpen(false);
                }}
              >
                {query}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchHistory;