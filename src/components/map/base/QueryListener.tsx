import React from 'react';
import { useLocation } from 'react-router';

const QueryListener = () => {
  const location = useLocation();

  console.log(location);

  return null;
};

export default QueryListener;
