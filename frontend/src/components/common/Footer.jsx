import React from 'react';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';

export default class Footer extends React.Component {
  render() {
    return (
      <Box sx={{ mt: 'auto' }}>
        <AppBar position="relative">
          <Toolbar sx={{ mx: 'auto' }}>
            <Box>
              <Typography>&copy; farnswj1 2021</Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }
}
