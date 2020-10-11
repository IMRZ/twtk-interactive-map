import { useEffect, useState } from 'react';
import FlexSearch from 'flexsearch';

import { regions } from '../../../data/common';
import startpos from '../../../data/startpos';

const regionOptions = Object.values(regions).map((region) => {
  return {
    ...region,
    searchType: 'region',
    searchKey: `region:${region.key}`,
  };
});

const startposOptions = Object.values(startpos)
  .reduce((accumulator, obj) => ([ ...accumulator, ...Object.values(obj) ]), [])
  .map((startpos: any) => {
    return {
      ...startpos,
      searchType: 'startpos',
      searchKey: `startpos:${startpos.campaign}:${startpos.key}`,
    };
  });

const allOptions = [...regionOptions, ...startposOptions];

const regionIndex = FlexSearch.create({
  encode: 'icase',
  tokenize: 'full',
  async: true,
  depth: 2,
  doc: {
    id: 'searchKey',
    field: [
      'name',
      'icon',
      'province:name',
    ],
  },
});
regionIndex.add(regionOptions);

const startposIndex = FlexSearch.create({
  encode: 'icase',
  tokenize: 'full',
  async: true,
  depth: 2,
  doc: {
    id: 'searchKey',
    field: ['name'],
  },
});
startposIndex.add(startposOptions);

async function searchRegions(query: string) {
  const [regionResult, startposResult] = await Promise.all([
    regionIndex.search(query),
    startposIndex.search(query),
  ]);

  return [...regionResult, ...startposResult];
}

export function useSearch() {
  const [options, setOptions] = useState(allOptions);
  const [inputValue, setInputValue] = useState('');

  const onInputChange = (e: any, value: any, reason: string) => {
    setInputValue(value);
  };

  useEffect(() => {
    if (inputValue) {
      searchRegions(inputValue).then((result: any) => setOptions(result));
    } else {
      setOptions(allOptions);
    }
  }, [inputValue]);

  return {
    options,
    inputValue,
    allOptions: allOptions.reduce((acc, val)=> (acc[val.searchKey]=val, acc),{}),
    onInputChange,
  };
}
