import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

export default class Header extends React.Component {
  render() {
    return (
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link to="/">Jokes API</Link>
            </Typography>
            <Typography color="inherit">
              <Link to="/about">About</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
