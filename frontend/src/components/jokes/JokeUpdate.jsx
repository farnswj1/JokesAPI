import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Box,
  LinearProgress,
  Typography,
  FormControl,
  TextField,
  Button
} from '@mui/material';
import { Token } from '../auth';
import axios from 'axios';

export default class JokeCreate extends React.Component {
  constructor(props) {
    super(props);

    this.token = new Token();
    this.state = {
      loading: true,
      title: null,
      body: null,
      success: null,
      error: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const url = process.env.REACT_APP_API_URL + 'jokes/' + id;
    axios.get(url)
      .then(response => {
        this.setState({
          loading: false,
          title: response.data.title,
          body: response.data.body,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          loading: false,
          title: null,
          body: null,
          error: error.response.status
        });
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = this.token.get();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };
    const { title, body } = this.state;

    const data = new FormData();
    data.append('title', title);
    data.append('body', body);

    const id = this.props.match.params.id;
    const url = process.env.REACT_APP_API_URL + `jokes/${id}/update`;
    
    axios.put(url, data, config)
      .then(response => {
        this.setState({
          success: response.data.id,
          error: null
        });
      })
      .catch(error => {
        this.setState({
          success: null,
          error: error.response.status
        });
      });
  }

  render() {
    const { loading, title, body, success, error } = this.state;
    const is_staff = this.token.getUser()?.is_staff;

    if (!is_staff) {
      return <Redirect to="/" />;
    } else if (success) {
      return <Redirect to={"/" + success} />;
    } else if (loading) {
      return <LinearProgress color="inherit" />
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h4" sx={{ mb: 5 }}>Update Joke</Typography>
          <Box component="form" onSubmit={this.handleSubmit}>
            <FormControl fullWidth variant="outlined">
              {
                error && (
                  <Typography sx={{ mb: 3 }}>
                    Please double check your inputs.
                  </Typography>
                )
              }
              <TextField
                id="title"
                label="Title"
                sx={{ mb: 3 }}
                defaultValue={title}
                required
                onChange={event => this.setState({ title: event.target.value })}
              />
              <TextField
                id="body"
                label="Body"
                sx={{ mb: 3 }}
                multiline
                maxRows={30}
                defaultValue={body}
                required
                onChange={event => this.setState({ body: event.target.value })}
              />
              </FormControl>
              <Button variant="contained" type="submit" size="large">
                Submit
              </Button>
            </Box>
        </Grid>
      </Grid>
    );
  }
}
