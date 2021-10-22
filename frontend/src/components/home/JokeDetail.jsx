import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import axios from 'axios';

export default class JokeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      joke: null,
      error: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const url = process.env.REACT_APP_API_URL + 'jokes/' + id;
    axios.get(url)
      .then(response => {
        this.setState({
          loading: false,
          joke: response.data,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          joke: null,
          error: error.response.status
        });
      });
  }

  render() {
    const { loading, joke, error } = this.state;
    return (
      <Box>
        {
          loading ? (
            <LinearProgress color="inherit" />
          ) : error ? (
            <Typography variant="h5">There was an error with the server.</Typography>
          ) : (
            <Box>
              <Typography variant="h4" sx={{ mb: 5 }}>{joke.title}</Typography>
              <Typography>{joke.body}</Typography>
            </Box>
          )
        }
      </Box>
    );
  }
}
