import { useState, useEffect, useContext } from 'react';
import debounce from 'lodash.debounce';
import { ThemeContext } from '../context/ThemeContext';
import SearchHistory from './SearchHistory';

interface SearchBarProps {
  onSearch: (query: string, page: number) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const [query, setQuery] = useState<string>('');
  const [history, setHistory] = useState<string[]>(() => {
    const saved = localStorage.getItem('searchHistory');
    return saved ? JSON.parse(saved) : [];
  });
  const { isDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(history));
  }, [history]);

  const debouncedSearch = debounce((value: string) => {
    if (value.trim()) {
      onSearch(value, 1);
      setHistory((prev) => {
        const newHistory = [value, ...prev.filter((q) => q !== value)].slice(0, 5);
        return newHistory;
      });
    }
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('', 1);
  };

  const handleSelectHistory = (selectedQuery: string) => {
    setQuery(selectedQuery);
    onSearch(selectedQuery, 1);
  };

  const handleClearHistory = () => {
    setHistory([]);
  };

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  return (
    <div className="relative mb-8">
      <div className="flex items-center space-x-3">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            placeholder="Search for a movie..."
            value={query}
            onChange={handleChange}
            className="input"
            aria-label="Search movies"
          />
          {query && (
            <button
              onClick={handleClear}
              className="btn-icon absolute right-12 top-1/2 transform -translate-y-1/2"
              aria-label="Clear search"
            >
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
          <SearchHistory
            history={history}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
          />
        </div>
        <button
          onClick={() => onSearch(query, 1)}
          className="btn-primary"
          aria-label="Search"
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;