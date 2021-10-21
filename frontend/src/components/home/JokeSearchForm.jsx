import React from 'react';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default class JokeSearchForm extends React.Component {
  render() {
    return (
      <FormControl fullWidth variant="outlined">
        <TextField
          id="title"
          label="Search jokes"
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </FormControl>
    );
  }
}
