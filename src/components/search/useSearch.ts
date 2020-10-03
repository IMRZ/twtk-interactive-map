import { useEffect, useState } from 'react';
import FlexSearch from 'flexsearch';

import { regions } from '../../data/common';

const values = Object.values(regions).sort((a, b) => a.province.name.localeCompare(b.province.name));

const index = FlexSearch.create({
  encode: 'icase',
  tokenize: 'full',
  async: true,
  depth: 2,
  doc: {
    id: 'key',
    field: [
      'name',
      'icon',
      'province:name',
    ],
  },
});

index.add(values);

async function searchRegions(query: string) {
  return index.search(query, 10);
}

export function useSearch() {
  const [options, setOptions] = useState(values);
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e: any, value: any, reason: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue) {
      searchRegions(inputValue).then((result: any) => setOptions(result));
    } else {
      setOptions(values);
    }
  }, [inputValue])

  return {
    options,
    inputValue,
    regions,
    onInputChange,
  }
}
