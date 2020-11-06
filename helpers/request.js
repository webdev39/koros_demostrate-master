import axios from 'axios';

const apiClient = axios.create({
    baseURL: process.env.API_URL,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    }
});

let user = JSON.parse(localStorage.getItem('token'));

if (user && user.token.token) {
    setAuthHeader(user.token.token);
}

export const api = apiClient;

export function setAuthHeader(token) {
    apiClient.defaults.headers.common['X-Auth-Token'] = token;
}

import {removeValidationsMessages} from './';

export function sendRequest(url, options) {
    removeValidationsMessages();
    //BLOCK BUTTONS
    let buttons = document.querySelectorAll('button');
    buttons.forEach(function (button) {
        button.disabled = true;
    });
    return fetch(url, options).then(function (data) {
        return data;
    });
}

export const sendPostRequest = (url, params) => {
    removeValidationsMessages();

    return apiClient.post(url, params);
};

export const sendGetRequest = (url, params) => {
    return params
        ? apiClient.get(url, {params})
        : apiClient.get(url);
};
