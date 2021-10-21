import React from 'react';
import { Grid, Typography } from '@mui/material';

export default class About extends React.Component {
  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h4" sx={{ mb: 5 }}>About Us</Typography>
        </Grid>
      </Grid>
    );
  }
}
