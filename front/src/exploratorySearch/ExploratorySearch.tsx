import { useState } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import './ExploratorySearch.css';
import axios from 'axios';

type Result = {
  id: string,
  targetWord: string,
  searchTerms: {
          textFileId: string,
          textFileName: string,
          leftWords: string[],
          rightWords: string[]
  }[],
  createdAt: string,
  updatedAt: string
}

const ExploratorySearch = ({textFileIDs}: { textFileIDs: string[] }) => {
  const [_, setQuery] = useState<string>('');
  const [results, setResults] = useState<{ id: string, text: string ,leftWords :string,rightWords: string}[]>([]);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);

    try {
      const response = await axios.post(`${import.meta.env.VITE_APP_ORIGIN}/exploratory-search`, {
        word: searchQuery,
        textFileIDs
      });
      const result = response.data.result as Result;
      setResults(result.searchTerms.map((searchTerm) => {
        return {
          id: searchTerm.textFileId,
          text: result.targetWord, // TODO: これは真ん中に表示し、色などを変えて強調する
          leftWords: searchTerm.leftWords.join(' '), // TODO: これがtextの左側に表示されるようにする
          rightWords: searchTerm.rightWords.join(' '), // TODO: これがtextの右側に表示されるようにする
        }
      }));
    } catch (error) {
      console.error(error);
    }

  }

  return (
    <div className="App">
      <h1>Corpus Search</h1>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={results} />
    </div>
  );
}

export default ExploratorySearch;