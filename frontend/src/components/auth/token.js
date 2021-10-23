import axios from 'axios';
import jwt_decode from 'jwt-decode';

export default class Token {
  get() {
    const token = sessionStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);

      if (new Date() / 1000 >= decodedToken.exp) {
        const data = { refresh: sessionStorage.getItem('refresh') };
        return axios.post(process.env.REACT_APP_API_URL + 'refresh', data)
          .then(response => response.data)
          .then(({ access }) => {
            sessionStorage.setItem('token', access);
            return access;
          })
          .catch(error => {
            this.delete();
            return null;
          });
      } else {
        return token;
      }
    } else {
      return null;
    }
  }

  getUser() {
    const token = sessionStorage.getItem('token');
    return token ? jwt_decode(token) : null;
  }

  set({ access, refresh }) {
    sessionStorage.setItem('token', access);
    sessionStorage.setItem('refresh', refresh);
  }

  delete() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('refresh');
  }
}
