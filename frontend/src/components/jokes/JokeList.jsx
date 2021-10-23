import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText, ButtonGroup, Button } from '@mui/material';

export default class JokeList extends React.Component {
  render() {
    const { jokes, previousPage, nextPage, switchPage } = this.props;
    return (
      <List>
        {
          jokes.map(joke => (
            <ListItemButton key={joke.id}>
              <Link to={`${joke.id}`}>
                <ListItemText primary={joke.title} />
              </Link>
            </ListItemButton>
          ))
        }
        {
          (previousPage || nextPage) && (
            <ButtonGroup
              variant="contained"
              sx={{ mt: 5 }}
            >
              <Button
                size="large"
                disabled={!previousPage}
                onClick={event => switchPage(previousPage)}
              >
                &laquo;
              </Button>
              <Button
                size="large"
                disabled={!nextPage}
                onClick={event => switchPage(nextPage)}
              >
                &raquo;
              </Button>
            </ButtonGroup>
          )
        }
      </List>
    );
  }
}
