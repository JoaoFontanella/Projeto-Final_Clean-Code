import { useState } from 'react';

const useSearchSuggestions = (fetchFn, onSearch) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.trim() === '') {
      setSuggestions([]);
      return;
    }

    try {
      const results = await fetchFn('', value);
      setSuggestions(results.slice(0, 5));
    } catch (err) {
      console.error('Erro ao buscar sugestões:', err);
      setSuggestions([]);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSearch(inputValue);
      setSuggestions([]);
    }
  };

  return {
    inputValue,
    setInputValue,
    suggestions,
    handleInputChange,
    handleKeyDown,
    setSuggestions,
  };
};

export default useSearchSuggestions;
