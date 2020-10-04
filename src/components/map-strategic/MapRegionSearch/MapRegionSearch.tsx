import React from 'react';
import { TextField, Typography, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from '../../../i18n';
import { useAppDispatch, useAppSelector } from '../../../store';
import { regionSelected } from '../reducer';

import { useSearch } from './useMapRegionSearch';

import assets from '../../../assets';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin: theme.spacing(0, 1),
    [theme.breakpoints.up('md')]: {
      width: 380,
      margin: theme.spacing(0, 2),
    },
  },
  optionIcon: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(2),
  },
}));

const MapRegionSearch = () => {
  const classes = useStyles();
  const { t } = useTranslation();

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
      blurOnSelect
      className={classes.root}
      options={options}
      filterOptions={(e) => e}
      value={value}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      getOptionLabel={(option: any) => option.name}
      groupBy={(option) => option.province.name}
      renderOption={(option) => (
        <>
          <img className={classes.optionIcon} src={assets[`icons/${option.icon}`]} alt="" />
          <Typography noWrap>{option.name}</Typography>
        </>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label={t('strategic.search')}
          placeholder={t('strategic.searchPlaceholder')}
          variant="outlined"
        />
      )}
    />
  );
};

export default MapRegionSearch;
