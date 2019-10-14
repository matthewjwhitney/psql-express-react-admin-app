import history from './history';
import auth0 from 'auth0-js';


export default class Auth  {
    auth0 = new auth0.WebAuth({
      domain: 'webapp1.auth0.com',
      clientID: 'Detontf3bIix8PSugVyISYrfQvPa4HYr',
      redirectUri:   'http://localhost:3000/callback',
      responseType: 'token id_token',
      scope: 'openid profile email',
  });

  login = () => {
    this.auth0.authorize();
   }

  handleAuthentication = () => {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        setTimeout( function() { history.replace('/authcheck') }, 2000);
      } else if (err) {
        history.replace('/');
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
   }

  setSession = (authResult) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route

  }


  logout = () => {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    console.log("Logged Out")
    // navigate to the home route
    history.replace('/authcheck')
  }


  isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

}
