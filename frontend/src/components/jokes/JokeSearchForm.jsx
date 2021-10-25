import React from 'react';
import { Box, FormControl, TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export default class JokeSearchForm extends React.Component {
  render() {
    const { onSearchTitleChange, handleSubmit } = this.props;
    return (
      <Box component="form" onSubmit={handleSubmit}>
        <FormControl fullWidth variant="outlined">
          <TextField
            id="title"
            label="Search jokes"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" onClick={handleSubmit}>
                  <IconButton>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={event => onSearchTitleChange(event.target.value)}
          />
        </FormControl>
      </Box>
    );
  }
}
