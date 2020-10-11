import React from 'react';
import { useHistory } from 'react-router-dom';
import qs from 'qs';
import { TextField, Typography, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { useTranslation } from '../../../i18n';
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

  const [selected, setSelected] = React.useState<any>(null);

  const history = useHistory();
  const onChange = (e: any, value: any) => {
    if (value) {
      if (value.searchType === 'region') {
        const search = qs.stringify({ x: value.settlement.x, y: value.settlement.y });
        const pathname = '/maps/strategic';
        history.push({ pathname, search });
        setSelected(value);
      } else {
        const search = qs.stringify({ x: value.pin.x, y: value.pin.y, campaign: value.campaign });
        const pathname = '/maps/startpos';
        history.push({ pathname, search });
        setSelected(value);
      }
    } else {
      setSelected(null);
    }
  };

  const { options, inputValue, onInputChange, allOptions } = useSearch();
  const value = selected ? allOptions[selected.searchKey] : null;

  return (
    <Autocomplete
      size="small"
      clearOnBlur
      clearOnEscape
      blurOnSelect
      className={classes.root}
      options={options}
      getOptionSelected={(option: any, value: any) => option.searchKey === value?.searchKey}
      filterOptions={(e) => e}
      value={value}
      inputValue={inputValue}
      onChange={onChange}
      onInputChange={onInputChange}
      getOptionLabel={(option: any) => option.name}
      groupBy={(option) => option.searchType}
      renderOption={(option) => (
        option.searchType === 'region' ? (
          <>
            <img className={classes.optionIcon} src={assets[`icons/${option.icon}`]} alt="" />
            <div>
              <Typography variant="subtitle1" noWrap>{option.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary" noWrap>{option.province.name}</Typography>
            </div>
          </>
        ) : (
          <>
            <img className={classes.optionIcon} src={assets[`characters/${option.icon}/mini`]} alt="" />
            <div>
              <Typography variant="subtitle1" noWrap>{option.name}</Typography>
              <Typography variant="subtitle1" color="textSecondary" noWrap>{t(`markers.${option.campaign}`)}</Typography>
            </div>
          </>
        )
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
