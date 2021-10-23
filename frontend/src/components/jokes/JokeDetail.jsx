import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Box, Typography, LinearProgress, ButtonGroup, Button } from '@mui/material';
import { Token } from '../auth';
import axios from 'axios';

export default class JokeDetail extends React.Component {
  constructor(props) {
    super(props);

    this.token = new Token();
    this.state = {
      loading: true,
      joke: null,
      error: null,
      deleted: false
    };

    this.deleteJoke = this.deleteJoke.bind(this);
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

  deleteJoke() {
    if (window.confirm("Are you sure you want to delete this joke?")) {
      const { joke } = this.state;
      const token = this.token.get();
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
      
      const id = joke.id;
      const url = process.env.REACT_APP_API_URL + `jokes/${id}/delete`;
    
      axios.delete(url, config)
        .then(response => {
          this.setState({
            deleted: true,
            error: null
          });
        })
        .catch(error => {
          this.setState({
            deleted: false,
            error: error.response.status
          });
        });
    }
  }

  render() {
    const { loading, joke, error, deleted } = this.state;

    if (deleted) {
      return <Redirect to="/" />;
    }

    const is_staff = this.token.getUser()?.is_staff;
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
              {
                joke.body.split(/\n+/g).map((str, index) => (
                  <Typography key={index} sx={{ mb: 3 }}>{str}</Typography>
                ))
              }
              {
                is_staff && (
                  <Box>
                    <ButtonGroup sx={{ mt: 5 }} variant="contained">
                      <Button size="large">
                        <Link to={`/${joke.id}/update`}>
                          Update
                        </Link>
                      </Button>
                      <Button size="large" onClick={this.deleteJoke}>
                        Delete
                      </Button>
                    </ButtonGroup>
                  </Box>
                )
              }
            </Box>
          )
        }
      </Box>
    );
  }
}
