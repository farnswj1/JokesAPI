import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Typography, Button, LinearProgress } from '@mui/material';
import { JokeList, JokeSearchForm } from '../jokes';
import { Token } from '../auth';
import axios from 'axios';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.token = new Token();
    this.state = {
      loading: true,
      jokes: [],
      previousPage: null,
      nextPage: null,
      error: null,
    };

    this.getJokesList = this.getJokesList.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  componentDidMount() {
    const url = process.env.REACT_APP_API_URL + 'jokes/';
    this.getJokesList(url);
  }

  getJokesList(url) {
    axios.get(url)
      .then(response => {
        this.setState({
          loading: false,
          jokes: response.data.results,
          previousPage: response.data.previous,
          nextPage: response.data.next,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          jokes: [],
          previousPage: null,
          nextPage: null,
          error: error.response.status,
        });
      });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    let params = '';
    const title = event.target.title.value;

    if (title) {
      params = `?title=${encodeURIComponent(title)}`;
    }

    const url = process.env.REACT_APP_API_URL + 'jokes/' + params;
    this.getJokesList(url);
  }

  render() {
    const { loading, jokes, previousPage, nextPage, error } = this.state;
    const is_staff = this.token.getUser()?.is_staff;
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h2" align="center" sx={{ mb: 3 }}>
            Jokes API
          </Typography>
          <Box sx={{ mb: 3 }}>
            <JokeSearchForm
              handleSubmit={this.handleSearchSubmit}
            />
          </Box>
          {
            is_staff && (
              <Link to="/new">
                <Button variant="contained" sx={{ mb: 3 }}>Add New Joke</Button>
              </Link>
            )
          }
          {
            loading ? (
              <LinearProgress color="inherit" />
            ) : error ? (
              <Typography variant="h5">There was an error with the server.</Typography>
            ) : jokes.length === 0 ? (
              <Typography variant="h5">No joke met the search criteria.</Typography>
            ) : (
              <JokeList
                jokes={jokes}
                previousPage={previousPage}
                nextPage={nextPage}
                switchPage={this.getJokesList}
              />
            )
          }
        </Grid>
      </Grid>
    );
  }
}
