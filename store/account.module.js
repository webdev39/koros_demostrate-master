import moment from 'moment';
import {userService} from '../services';
import {router, setProfile, validateFields} from '../helpers';
import {logoutBase} from '../services/main.service';

let user = JSON.parse(localStorage.getItem('user'));

let isAdminDomain = window.location.host
    .split('.')
    .some((part) => /^admin$/.test(part));

let state = {
    user,
    status: {
        loggedIn: user ? true : false
    },
    isAdminDomain,
    dictionary: {}
};

const actions = {
    login({getters, dispatch, commit}, {email, password}) {
        commit('loginRequest', {email});

        return userService.login(email, password, getters.deviseOS).then(
            (user) => {
                commit('loginSuccess', user);
                let afterLoginLink;
                switch (user.role_id) {
                    case 1:
                        afterLoginLink = 'dashboard';
                        break;
                    case 2:
                        afterLoginLink = 'allClasses';
                        break;
                    case 3:
                        afterLoginLink = 'allClasses';
                        break;
                }
                router.push({
                    name: afterLoginLink
                });
            },
            (error) => {
                commit('loginFailure', error);
                if (user.status === 'invited' || user.deactivate) {
                    logoutBase().then(function () {
                        router.push({
                            name: 'forbidden'
                        });
                    });
                } else {
                    dispatch('alert/error', error, {root: true});
                }
            }
        );
    },
    loginApple({commit}, token) {
        return userService.loginApple(token)
            .then(() => {
                commit('loginSuccess', user);
                router.push({
                    name: 'home'
                });
            })
            .catch((error) => {
                commit('loginFailure', error);
            });
    },
    signUp({dispatch, commit, getters}, {email, newPassword, confirmPassword}) {
        let errMsg = '';
        if (newPassword !== confirmPassword) {
            errMsg = 'Confirm password error';
            dispatch('alert/error', errMsg, {root: true});
            throw errMsg;
        } else {
            commit('loginRequest', {email});
            return userService.signUp(email, newPassword, getters.deviseOS).then(
                data => {
                    dispatch('alert/success', 'User has signup', {root: true});
                    setProfile(data);
                    commit('loginSuccess', data.result.user);
                    if (getters.isAdmin) {
                        router.push({name: 'dashboard'});
                    } else if (getters.isInstructor) {
                        router.push({name: 'instructorProfile'});
                    } else {
                        router.push({name: 'userProfile'});
                    }
                },
                error => {
                    commit('loginFailure', error);
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
        }
    },
    async logout({commit}) {
        await userService.logout();
        commit('logout');
    },
    register({dispatch, commit}, user) {
        commit('registerRequest');

        userService.register(user).then(
            (user) => {
                commit('registerSuccess', user);
                router.push({name: 'login'});
                dispatch('alert/success', 'Registration successful', {root: true});
            },
            (error) => {
                commit('registerFailure', error);
                dispatch('alert/error', error, {root: true});
            }
        );
    },
    forgotPassword({dispatch, commit}, {email}) {
        commit('updateRequest');
        userService.forgotPassword(email).then(
            (success) => {
                commit('updateSuccess');
                router.push({name: 'login'});
                dispatch('alert/success', 'Please check your email', {root: true});
                localStorage.setItem('email', email);
            },
            (error) => {
                commit('updateFailure');
                dispatch('alert/error', error, {root: true});
                router.push({name: 'forgotPassword'});
            }
        );
    },
    resetPassword({dispatch, commit}, {email, password, token}) {
        commit('updateRequest');
        userService.resetPassword(email, password, token).then(
            (success) => {
                commit('updateSuccess');
                localStorage.removeItem('email');
                router.push({name: 'login'});
                dispatch('alert/success', 'New password was set', {root: true});
            },
            (error) => {
                commit('updateFailure');
                dispatch('alert/error', error, {root: true});
                router.push({path: '/auth/reset-password?token=' + token});
            }
        );
    },
    getProfile({dispatch, commit}) {
        return userService.getProfile().then(
            async (user) => {
                return user.result.user;
            },
            (error) => {
                dispatch('alert/error', error, {root: true});
                throw error;
            }
        );
    },
    async getDictionary({commit}) {
        return state.dictionary = await userService.getDictionary();
    },
    updateProfile({dispatch, commit}, params) {
        commit('updateRequest');
        return userService
            .update(params)
            .then(
                async (success) => {
                    commit('updateSuccess');
                    dispatch('alert/success', 'Profile was updated', {root: true});
                },
                (error) => {
                    commit('updateFailure');
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    deletePhoto({dispatch, commit}) {
        return userService.update({photo: ''}).then(
            async (success) => {
                state.user = setProfile(await userService.getProfile());
                dispatch('alert/success', 'Photo was deleted', {root: true});
            },
            (error) => {
                dispatch('alert/error', error, {root: true});
            }
        );
    },
    changePassword({dispatch, commit}, {currentPassword, newPassword, confirmPassword}) {
        let errMsg = '';
        if (!currentPassword) {
            validateFields({'old_password': 'Field is empty'});
            throw errMsg;
        } else if (!newPassword) {
            validateFields({'new_password': 'Field is empty'});
            throw errMsg;
        } else if (!confirmPassword) {
            validateFields({'confirm_password': 'Field is empty'});
            throw errMsg;
        } else if (newPassword !== confirmPassword) {
            errMsg = 'Confirm password error';
            dispatch('alert/error', errMsg, {root: true});
            throw errMsg;
        } else {
            commit('updateRequest');
            return userService.changePassword(currentPassword, newPassword).then(
                success => {
                    commit('updateSuccess');
                    dispatch('alert/success', 'Password was updated', {root: true});
                },
                error => {
                    commit('updateFailure');
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
        }
    }
};

const mutations = {
    loginRequest(state, user) {
        state.status = {loggingIn: true};
        state.user = user;
    },
    loginSuccess(state, user) {
        state.status = {loggedIn: true};
        state.user = user;
    },
    loginFailure(state) {
        state.status = {};
        state.user = null;
    },
    logout(state) {
        // state.status = {};
        // state.user = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        location.reload(true);
    },
    registerRequest(state) {
        state.status = {registering: true};
    },
    registerSuccess(state, user) {
        state.status = {loggedIn: true};
        state.user = user;
    },
    registerFailure(state) {
        state.status = {};
    },
    updateRequest(state) {
        state.status = {loading: true}
    },
    async updateSuccess(state) {
        let user = setProfile(await userService.getProfile());
        state.user = user;
        state.status = {}
    },
    updateFailure(state) {
        state.status = {}
    }
};

const getters = {
    deviseOS(state) {
        return state.isAdminDomain ? 'web_admin' : 'web';
    },
    loggedIn(state) {
        return !!state.user;
    },
    isAdmin(state) {
        return (state.user && state.user.role_id === 1);
    },
    isUser(state) {
        return (state.user && state.user.role_id === 2);
    },
    isInstructor(state) {
        return (state.user && state.user.role_id === 3);
    },
    fullName(state) {
        return state.user.first_name + ' ' + state.user.last_name;
    },
    fullNameSub(state) {
        return state.user.subprofile.first_name + ' ' + state.user.subprofile.last_name;
    },
    gender(state) {
        return state.user.gender ? state.user.gender.name : null;
    },
    genderSub(state) {
        return state.user.subprofile.gender ? state.user.subprofile.gender.name : null;
    },
    location(state) {
        if (!state.user.city) {
            return ''
        } else {
            const stateName = state.dictionary.result.states.find(s => s.id === state.user.city.state_id).name;
            return `${state.user.city.name}, ${stateName}`;
        }
    },
    locationSub(state) {
        if (!state.user.subprofile.city) {
            return ''
        } else {
            const stateName = state.dictionary.result.states.find(s => s.id === state.user.subprofile.city.state_id).name;
            return `${state.user.subprofile.city.name}, ${stateName}`;
        }
    },
    birthday(state) {
        return state.user.dob ? moment(state.user.dob).format('L') : null;
    },
    birthdaySub(state) {
        return state.user.subprofile.dob ? moment(state.user.subprofile.dob).format('L') : null;
    },
    isSingleInstructor(state) {
        return !state.user.subprofile
    }
};

export const account = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
};
