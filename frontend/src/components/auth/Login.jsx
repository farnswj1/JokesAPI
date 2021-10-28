import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Box, Typography, FormControl, TextField, Button } from '@mui/material';
import Token from './token';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
  
    this.token = new Token();
    this.state = {
      success: null,
      error: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const data = new FormData();
    data.append('username', event.target.username.value);
    data.append('password', event.target.password.value);

    const url = process.env.REACT_APP_API_URL + 'login';

    axios.post(url, data)
      .then(response => {
        const { login } = this.props;
        this.setState({ success: true, error: null });
        login(response.data);
      })
      .catch(error => {
        this.setState({ success: false, error: error.response.status });
      });
  }

  render() {
    const { success, error } = this.state;
    const token = this.token.get();

    if (success || token) {
      return <Redirect to="/" />;
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h4" sx={{ mb: 5 }}>Login</Typography>
          <Box component="form" onSubmit={this.handleSubmit}>
            <FormControl fullWidth variant="outlined">
              {
                error && (
                  <Typography sx={{ mb: 3 }}>
                    Please enter a valid username and password.
                  </Typography>
                )
              }
              <TextField
                id="username"
                label="Username"
                sx={{ mb: 3 }}
                required
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                sx={{ mb: 3 }}
                required
              />
              </FormControl>
              <Button variant="contained" type="submit" size="large">
                Login
              </Button>
            </Box>
        </Grid>
      </Grid>
    );
  }
}
