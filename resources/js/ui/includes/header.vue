<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand" to="/">Filme</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link v-if="!this.$store.getters['login/isLoggedIn']" class="nav-link" to="/login">Login / Register</router-link>
        <router-link v-else class="nav-link" to="/activity">My comments</router-link>
      </li>
    </ul>
    <form v-if="this.$route.name != 'Home'" class="searchBar form-inline my-2 my-lg-0">
      <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Enter a film name ..." aria-label="Search">
      <router-link  :to="'/search?s=' + search">
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </router-link>
    </form>
  </div>
</nav></div>
</template>

<script>
  import { required, minLength } from 'vuelidate/lib/validators'
  import {mapActions, mapMutations, mapState} from "vuex";
  import router from '../../router';

  export default {
    name: 'Header',
    data(){
      return{
        search:null
      }
    },
    methods: {
      onInput(e) {
        this.$router.replace({
          query: {
            ...this.$route.query,
            q: e.target.value,
          }
        })
      },
      ...mapMutations({
        setUsername: 'login/setUsername',
        setPassword: 'login/setPassword',
        togglePassword: 'login/togglePassword',
        loginMode: 'login/loginMode',
        signUpMode: 'login/signUpMode',
        toggleMode: 'login/toggleMode'
        }),
        ...mapActions({
          loginOrSignUp: 'login/loginOrSignUp'
        }),
    },
          computed: {
              ...mapState({
                  isLoggedIn: state => state.login.isLoggedIn,
                  pending: state => state.login.pending,
                  showPassword: state => state.login.showPassword,
                  password: state => state.login.password,
                  username: state => state.login.username,
                  mode: state => state.login.mode

              })
          }
}
</script>