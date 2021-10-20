import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import { Header, Footer } from './common';
import { Home } from './home';
import '../css/index.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.theme = createTheme({
      palette: {
        background: {
          default: '#001833'
        },
        primary: {
          main: '#0055b3'
        },
        secondary: {
          main: '#ff0000'
        }
      }
    });
  }

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <CssBaseline/>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
          </Switch>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    );
  }
}
