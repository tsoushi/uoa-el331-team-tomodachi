import React, { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './ExploratorySearch.css';

const ExploratorySearch: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<{ id: number, text: string }[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);

    const fakeResults = [
      { id: 1, text: 'Result 1 for ' + searchQuery },
      { id: 2, text: 'Result 2 for ' + searchQuery },
    ];
    setResults(fakeResults);
  };

  return (
    <div className="App">
      <h1>Corpus Search</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
}

export default ExploratorySearch;