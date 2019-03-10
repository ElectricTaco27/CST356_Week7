// src/Auth/AuthService.js

import auth0 from 'auth0-js'
import EventEmitter from 'eventemitter3'
import router from './../router'

class AuthService {
    accessToken
    idToken
    expiresAt
    authenticated = this.isAuthenticated()
    authNotifier = new EventEmitter()

    auth0 = new auth0.WebAuth({
        domain: 'electrictaco.auth0.com',
        clientID: 'MIRZKbNlzTN5tcHkZEBnBEw8OQ1vZcD9',
        redirectUri: 'http://localhost:8080/callback',
        audience: 'electrictaco/webapi',
        responseType: 'token id_token',
        scope: 'openid'
    })

    login () {
        this.auth0.authorize()
    }

    handleAuthentication () {
      this.auth0.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
          router.replace('home')
        } else if (err) {
          router.replace('/')
          console.log(err)
        }
      })
    }
  
    setSession (authResult) {
      this.accessToken = authResult.accessToken
      this.idToken = authResult.idToken
      this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime()
  
      this.authNotifier.emit('authChange', { authenticated: true })
  
      localStorage.setItem('loggedIn', true)
    }
  
    renewSession () {
      this.auth0.checkSession({}, (err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.setSession(authResult)
        } else if (err) {
          this.logout()
          console.log(err)
        }
      })
    }
  
    logout () {
      // Clear access token and ID token from local storage
      this.accessToken = null
      this.idToken = null
      this.expiresAt = null
  
      this.userProfile = null
      this.authNotifier.emit('authChange', false)
  
      localStorage.removeItem('loggedIn')
  
      // navigate to the home route
      router.replace('/')
    }
  
    getAuthenticatedFlag () {
      return localStorage.getItem('loggedIn')
    }
  
    isAuthenticated () {
      return new Date().getTime() < this.expiresAt && this.getAuthenticatedFlag() === 'true'
    }
}

export default new AuthService()