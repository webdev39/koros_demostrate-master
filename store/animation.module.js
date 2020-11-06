const state = {};

const actions = {
    playAnimation({commit}, {className, clickClassName}) {
        document.querySelector('.' + className).className = className;
        window.requestAnimationFrame(function (time) {
            window.requestAnimationFrame(function (time) {
                document.querySelector('.' + className).className = className + ' ' + clickClassName;
            });
        });
    },

    play({dispatch, commit}, {className, clickClassName}) {
        document
            .querySelector('.' + className)
            .addEventListener('click', dispatch('playAnimation', {className, clickClassName}), false);
    },
};

const mutations = {};

export const animation = {
    namespaced: true,
    state,
    actions,
    mutations
};