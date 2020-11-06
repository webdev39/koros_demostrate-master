import { setAuthHeader } from './request';

export function setProfile(profile) {
    let userObj = profile.result.user;
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(userObj));

    return userObj;
}

export function setToken(result) {
    localStorage.setItem('token', JSON.stringify(result));
    setAuthHeader(result.token.token);
}