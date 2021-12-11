import React from 'react';
import { Grid, Typography } from '@mui/material';

export default class Error404 extends React.Component {
  render() {
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h5">
            Hey there! You might be lost. Who knows. But this page doesn't exist. Sorry!
          </Typography>
        </Grid>
      </Grid>
    );
  }
}
