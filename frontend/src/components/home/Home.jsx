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
      previousPage: null,
      nextPage: null,
      error: null,
      searchTitle: ''
    };

    this.getJokesList = this.getJokesList.bind(this);
    this.onSearchTitleChange = this.onSearchTitleChange.bind(this);
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

  onSearchTitleChange(title) {
    this.setState({ searchTitle: title });
  }

  handleSearchSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });

    const { searchTitle } = this.state;
    let params = '';

    if (searchTitle) {
      params = `?title=${encodeURIComponent(searchTitle)}`;
    }

    const url = process.env.REACT_APP_API_URL + 'jokes/' + params;
    this.getJokesList(url);
  }

  render() {
    const { loading, jokes, previousPage, nextPage, error } = this.state;
    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Box sx={{ mb: 3 }}>
            <JokeSearchForm
              onSearchTitleChange={this.onSearchTitleChange}
              handleSubmit={this.handleSearchSubmit}
            />
          </Box>
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
