import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

export default class Header extends React.Component {
  render() {
    return (
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            color="inherit"
            sx={{ flexGrow: 1 }}
          >
            Jokes API
          </Typography>
          <Typography color="inherit">About</Typography>
        </Toolbar>
      </AppBar>
    );
  }
}
