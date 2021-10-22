import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Container } from '@mui/material';
import { Header, Footer } from './common';
import { Home, JokeDetail } from './home';
import { About } from './about';
import { RandomJoke } from './random';
import '../css/index.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.theme = createTheme({
      palette: {
        mode: 'light'
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Header />
          <Container sx={{ my: 5 }}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/random" component={RandomJoke} />
              <Route path="/:id" component={JokeDetail} />
            </Switch>
          </Container>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
