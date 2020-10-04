import React from 'react';
import { TextField, Typography, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import { useAppDispatch, useAppSelector } from '../../store';
import { regionSelected } from '../map/strategic/reducer';

import { useSearch } from './useSearch';

import assets from '../../assets';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 380,
    margin: theme.spacing(0, 2),
    [theme.breakpoints.down('md')]: {
      width: '100%',
      margin: theme.spacing(0, 1),
    },
  },
  optionIcon: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(2),
  }
}));

const Search = () => {
  const classes = useStyles();

  const dispatch = useAppDispatch();
  const selectedRegion = useAppSelector((state) => state.strategic.selectedRegion);
  const onChange = (e: any, value: any) => dispatch(regionSelected(value ? value.key : null));

  const { options, inputValue, onInputChange, regions } = useSearch();
  const value = regions[selectedRegion] || null;

  return (
    <Autocomplete
      size="small"
      clearOnBlur
      clearOnEscape
      className={classes.root}
      options={options}
      filterOptions={(e) => e}
      value={value}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      getOptionLabel={(option: any) => option.name}
      renderOption={(option) => (
        <>
          <img className={classes.optionIcon} src={assets[`icons/${option.icon}`]} alt="" />
          <Typography noWrap>{`${option.province.name}, ${option.name}`}</Typography>
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          placeholder="Search by region, province or resource..."
          variant="outlined"
        />
      )}
    />
  );
};

export default Search;