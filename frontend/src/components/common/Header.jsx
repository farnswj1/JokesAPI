import React from 'react';
import { Link } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

export default class Header extends React.Component {
  render() {
    const { token, logout } = this.props;
    return (
      <Box>
        <AppBar position="sticky">
          <Toolbar>
            <Typography sx={{ flexGrow: 1 }}>
              <Link to="/">Jokes API</Link>
            </Typography>
            <Typography sx={{ mr: 3 }}>
              <Link to="/random">Random</Link>
            </Typography>
            <Typography sx={{ mr: 3 }}>
              <Link to="/about">About</Link>
            </Typography>
            {
              token ? (
                <Typography onClick={logout}>
                  <Link to="/">Logout</Link>
                </Typography>
              ) : (
                <Typography>
                  <Link to="/login">Login</Link>
                </Typography>
              )
            }
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
