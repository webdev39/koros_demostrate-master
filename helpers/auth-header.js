export function authHeader() {
    let user = JSON.parse(localStorage.getItem('token'));
    if (user && user.token.token) {
        return {'X-Auth-Token': user.token.token};
    } else {
        return {};
    }
}