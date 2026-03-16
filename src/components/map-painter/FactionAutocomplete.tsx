import React from 'react';
import { TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

type FactionAutocompleteProps = {
  options: any[];
  value: any;
  disabled?: boolean;
  showFactionIcon?: boolean;
  label?: string;
  placeholder?: string;
  helperText?: string;
  onChange: (event: React.ChangeEvent<{}>, value: any) => void;
};

const FactionAutocomplete = ({
  options = [],
  value = null,
  disabled = false,
  showFactionIcon = true,
  label,
  placeholder,
  helperText,
  onChange,
}: FactionAutocompleteProps) => {
  return (
    <Autocomplete
      size="small"
      options={options}
      value={value}
      onChange={onChange}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.name}
      disabled={disabled}
      renderOption={(option) =>
        <FactionAutocompleteItem option={option} />
      }
      renderInput={(params) =>
        <FactionAutocompleteInput
          params={params}
          value={value}
          label={label}
          helperText={helperText}
          showFactionIcon={showFactionIcon}
          placeholder={placeholder}
        />
      }
    />
  );
}

const FactionAutocompleteItem = (props: any) => {
  return (
    <Typography noWrap>{props.option.name}</Typography>
  );
};

const FactionAutocompleteInput = (props: any) => {
  return (
    <TextField
      {...props.params}
      label={props.label}
      helperText={props.helperText}
      variant="outlined"
      placeholder={props.placeholder}
      InputLabelProps={{ shrink: true }}
    />
  )
};

export default FactionAutocomplete;
