import React from 'react';
import { Grid, Box, Typography, LinearProgress } from '@mui/material';
import JokeSearchForm from './JokeSearchForm';
import JokeList from './JokeList';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      jokes: [],
      error: null
    };
  }

  componentDidMount() {
    axios.get(process.env.REACT_APP_API_URL + 'jokes/')
      .then(response => {
        this.setState({
          loading: false,
          jokes: response.data.results,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          jokes: [],
          error: error.response.status
        });
      });
  }

  render() {
    const { jokes, loading, error } = this.state;
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Box sx={{ mb: 3 }}>
          <JokeSearchForm />
          </Box>
          {
            loading ? (
              <LinearProgress color="inherit" />
            ) : error ? (
              <Typography variant="h5">There was an error with the server.</Typography>
            ) : jokes.length === 0 ? (
              <Typography variant="h5">No joke met the search criteria.</Typography>
            ) : (
              <JokeList jokes={jokes}/>
            )
          }
        </Grid>
      </Grid>
    );
  }
}
