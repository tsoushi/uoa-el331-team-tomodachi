import React from 'react';
import './ExploratorySearch.css';

import styled from '@emotion/styled';

interface SearchResult {
  id: string;
  text: string;
  leftWords: string;
  rightWords: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

// result.textを中央に表示する
const Term = styled.li`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  margin: 5px;
`

const TermItemLeft = styled.span`
  flex: 1;
  white-space: nowrap;
  padding-right: 10px;
  text-align: right;
`

const TermItemRight = styled.span`
  flex: 1;
  white-space: nowrap;
  padding-left: 10px;
  text-align: left;
`

const TermCenterItem = styled.span`
  color: #FFD700;
`

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div>
      {results.length > 0 ? (
        <ul>
          {results.map((result) => (
            <Term key={result.id}>
              <TermItemLeft>{result.leftWords}</TermItemLeft>
              <TermCenterItem>{result.text}</TermCenterItem>
              <TermItemRight>{result.rightWords}</TermItemRight>
            </Term>
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}

export default SearchResults;
