import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material';
import { Login, Token } from './auth';
import { Header, Footer } from './common';
import { Home, JokeDetail } from './home';
import { JokeCreate, JokeUpdate } from './jokes';
import { About } from './about';
import { RandomJoke } from './random';
import '../css/index.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.token = new Token();
    this.theme = createTheme({
      palette: {
        mode: 'light'
      }
    });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(credentials) {
    this.token.set(credentials);
    this.setState({});
  }

  logout() {
    this.token.delete();
    this.setState({});
  }

  render() {
    const token = this.token.get();
    return (
      <ThemeProvider theme={this.theme}>
        <CssBaseline />
        <BrowserRouter>
          <Header token={token} logout={this.logout} />
          <Container sx={{ my: 5 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/random" component={RandomJoke} />
              <Route path="/login" render={() => <Login login={this.login} />} />
              <Route path="/new" component={JokeCreate} />
              <Route path="/:id/update" component={JokeUpdate} />
              <Route path="/:id" component={JokeDetail} />
            </Switch>
          </Container>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
