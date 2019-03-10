// src/App.vue

<template>
  <div>

    <div><img src="./assets/logo.jpg"></div>

    <nav class="navbar navbar-default">
      <div class="container-fluid">
        <div class="navbar-header">
          <a class="navbar-brand" href="#">WebApp</a>

          <router-link to="/home"
            class="btn btn-primary btn-margin"
            v-if="authenticated" >
              Home
          </router-link>

          <router-link to="/person"
            class="btn btn-primary btn-margin"
            v-if="authenticated">
              Persons
          </router-link>

          <router-link to="/student"
            class="btn btn-primary btn-margin"
            v-if="authenticated">
              Students
          </router-link>

          <button
            id="qsLoginBtn"
            class="btn btn-primary btn-margin"
            v-if="!authenticated"
            @click="login">
              Log In
          </button>

          <button
            id="qsLogoutBtn"
            class="btn btn-primary btn-margin"
            v-if="authenticated"
            @click="logout">
              Log Out
          </button>

        </div>
      </div>
    </nav>

    <div class="container">
      <router-view
        :auth="auth"
        :authenticated="authenticated">
      </router-view>
    </div>
  </div>
</template>

<script>
    import auth from './auth/AuthService'
    export default {
    name: 'app',
    data () {
        return {
            auth,
            authenticated: auth.authenticated
        }
    },
    created () {
        auth.authNotifier.on('authChange', authState => {
            this.authenticated = authState.authenticated
        })
        if (auth.getAuthenticatedFlag() === 'true') {
            auth.renewSession()
        }
    },
    methods: {
        login () {
            auth.login()
        },
        logout () {
            auth.logout()
        }
    }
    }
</script>

<style>
@import '../node_modules/bootstrap/dist/css/bootstrap.css';
.btn-margin {
  margin-top: 7px
}
</style>