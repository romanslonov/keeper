class Auth {
    /**
     * Authenticate a user. Save a token string in Local Storage
     *
     * @param {string} token
     */
    static authenticateUser(token) {
      window.localStorage.setItem('keeperToken', token);
    }
  
    /**
     * Check if a user is authenticated - check if a token is saved in Local Storage
     *
     * @returns {boolean}
     */
    static isUserAuthenticated() {
      return window.localStorage.getItem('keeperToken') !== null;
    }
  
    /**
     * Deauthenticate a user. Remove a token from Local Storage.
     *
     */
    static deauthenticateUser() {
      window.localStorage.removeItem('keeperToken');
    }
  
    /**
     * Get a token value.
     *
     * @returns {string}
     */
  
    static getToken() {
      return window.localStorage.getItem('keeperToken');
    }
  }
  
  export default Auth;
  