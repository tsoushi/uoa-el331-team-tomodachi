import React from 'react';
import './ExploratorySearch.css';

interface SearchResult {
  id: string;
  text: string;
  leftWords: string;
  rightWords: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <li key={result.id}><span>{result.leftWords}</span><span className="yellow_text">{result.text}</span><span>{result.rightWords}</span></li>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResults;
