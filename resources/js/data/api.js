import axios from "axios";
import {getToken} from "../data/localStorage";
import store from '../store/index';

export function fetchLogin() {
    let state = store.state.login;
    return post('/api/v1/login', {
        username: state.username,
        password: state.password
    });
}

export function fetchSignUp() {
    let state = store.state.login;
    return post('/api/v1/sign-up', {
        username: state.username,
        password: state.password
    });
}

export function fetchReadActivitiesImdb() {
    let state= store.state.activity
    return post('/api/v1/read-activities-imdb',{
        imdbID: state.selectedItem.imdbid
    });
}

export function fetchReadActivities() {
    let state = store.state.activity;
    return post('/api/v1/read-activities');
}

export function fetchCreateActivity() {
    let state = store.state.activity;
    return post('/api/v1/create-activity', {
        rating: state.selectedItem.rating,
        comment: state.selectedItem.comment,
        imdbID: state.selectedItem.imdbID,
        filmtitle: state.selectedItem.filmtitle
    });
}


export function fetchUpdateActivity() {
    let state = store.state.activity;
    return post('/api/v1/update-activity', {
        id: state.selectedItem.id,
        rating: state.selectedItem.rating,
        comment: state.selectedItem.comment,
        imdbID: state.selectedItem.imdbID,
        filmtitle: state.selectedItem.filmtitle
    });
}


export function fetchDeleteActivity() {
    let state = store.state.activity;
    return post('/api/v1/delete-activity', {
        id: state.selectedItem.id
    });
}



export function post(url,creds) {
    return axios.post(url, creds, {
            headers: {
                Authorization: getToken()
            }
        }
    );

}

export function get(url) {
    return axios.get(url, {
            headers: {
                Authorization: getToken()
            }
        }
    );
}
