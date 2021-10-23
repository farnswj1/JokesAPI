import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Typography, FormControl, TextField, Button } from '@mui/material';
import axios from 'axios';

export default class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: null,
      password: null,
      success: null,
      error: null
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const { username, password } = this.state;
    const data = { username: username, password: password };

    axios.post(process.env.REACT_APP_API_URL + 'login', data)
      .then(response => {
        const { login } = this.props;
        login(response.data);
        this.setState({ success: true, error: null });
      })
      .catch(error => {
        this.setState({ success: false, error: error.response.status });
      });
  }

  render() {
    const { success, error } = this.state;

    if (success) {
      return <Redirect to="/" />;
    }

    return (
      <Grid container justifyContent="center">
        <Grid item xs={12} sm={10} md={8}>
          <Typography variant="h4" sx={{ mb: 5 }}>Login</Typography>
          <form onSubmit={this.handleSubmit}>
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
                onChange={event => this.setState({ username: event.target.value })}
              />
              <TextField
                id="password"
                label="Password"
                type="password"
                sx={{ mb: 3 }}
                required
                onChange={event => this.setState({ password: event.target.value })}
              />
              </FormControl>
              <Button variant="contained" type="submit" size="large">
                Login
              </Button>
            </form>
        </Grid>
      </Grid>
    );
  }
}
