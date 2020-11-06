import {usersService} from '../services';

const state = {
    all: {},
    instructors: {}
};

const actions = {
    getAll({commit}, {page = 1, params={}}) {
        commit('getAllRequest');
        return usersService.getAll(page, params)
            .then(
                users => commit('getAllSuccess', users),
                error => commit('getAllFailure', error)
            );
    },
    getInstructors({commit}, params={}) {
        commit('getInstructorsRequest');
        return usersService.getInstructors(params)
            .then(
                instructors => commit('getInstructorsSuccess', instructors),
                error => commit('getInstructorsFailure', error)
            );
    },
    add({dispatch, commit}, {
        firstName, lastName, role, email, photo,
        firstNameSubprofile, lastNameSubprofile, photoSubprofile, bio = null
    }) {
        return usersService.add(
            firstName, lastName, role, email, photo,
            firstNameSubprofile, lastNameSubprofile, photoSubprofile, bio
        )
            .then(
                (data) => {
                    dispatch('alert/success', 'User was invited', {root: true});

                    return data;
                }
            ).catch(function (error) {
                dispatch('alert/error', error, {root: true});
                throw error;
            });
    },
    updateProfile(
        {dispatch, commit},
        {
            userId, firstName, lastName, location, birthday, photo, gender, proficiencyLevel=null, email=null, bio=null,
            firstNameSubprofile=null, lastNameSubprofile=null, locationSubprofile=null,
            birthdaySubprofile=null, photoSubprofile=null, genderSubprofile=null
        }
    ) {
        return usersService
            .update(
                {
                    firstName, lastName, city: location, email, bio,
                    dob: birthday, photo, gender, proficiencyLevel,
                    firstNameSubprofile, lastNameSubprofile, citySubprofile: locationSubprofile,
                    dobSubprofile: birthdaySubprofile, photoSubprofile, genderSubprofile
                },
                userId
            )
            .then(
                async (success) => {
                    dispatch('alert/success', 'User was updated', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    deactivateOrActivate({dispatch, commit}, id) {
        return usersService.deactivateOrActivate(id)
            .then(
                async (success) => {
                    dispatch('alert/success', 'User was deactivated or activated', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    get({dispatch, commit}, id) {
        return usersService.get(id)
            .then(
                async (user) => {
                    commit('user', user.result.user);

                    return user.result.user;
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    },
    delete({dispatch, commit}, id) {
        return usersService.delete(id)
            .then(
                async (success) => {
                    dispatch('alert/success', 'User was deleted', {root: true});
                },
                (error) => {
                    dispatch('alert/error', error, {root: true});
                    throw error;
                }
            );
    }
};

const mutations = {
    getInstructorsRequest(state) {
        state.instructors = {loading: true};
    },
    getInstructorsSuccess(state, users) {
        state.instructors = users.result.users;
    },
    getInstructorsFailure(state, error) {
        state.instructors = {error};
    },
    getAllRequest(state) {
        state.all = {loading: true};
    },
    getAllSuccess(state, users) {
        state.all = {
            items: users.result.users,
            lastPage: users.result.meta.last_page,
            perPage: users.result.meta.per_page,
            currentPage: users.result.meta.current_page
        };
    },
    getAllFailure(state, error) {
        state.all = {error};
    },
    user(state, user) {
        state.user = {user: user};
    },
};

export const users = {
    namespaced: true,
    state,
    actions,
    mutations
};