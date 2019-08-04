import Vue from "vue"
import VueRouter from "vue-router"
import FilmPage from './ui/pages/film';
import ActivityPage from './ui/pages/activity';
import SearchPage from './ui/pages/search';
import HomePage from './ui/pages/home';
import LoginPage from './ui/pages/login';
import store from './store/index';

Vue.use(VueRouter);

function guard(to, from, next){
    if(store.state.login.isLoggedIn === true) {
        // or however you store your logged in state
        next(); // allow to enter route
    } else{
        next('/login'); // go to '/login';
    }
}

export default new VueRouter({
    mode: 'history',

    routes: [
        {
            path: '/activity',
            name: 'Activity',
            component: ActivityPage,
            beforeEnter: guard
        },
        {
            path: '',
            name: 'Home',
            component: HomePage
        },
        {
            path: '/search',
            name: 'Search',
            component: SearchPage
        },
        {
            path: '/film',
            name: 'Film',
            component: FilmPage
        },
        {
            path: '/login',
            name: 'Login',
            component: LoginPage
        }
    ]
})
