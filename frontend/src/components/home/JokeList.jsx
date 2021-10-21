import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItemButton, ListItemText } from '@mui/material';

export default class JokeList extends React.Component {
  render() {
    const { jokes } = this.props;
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
      </List>
    );
  }
}
