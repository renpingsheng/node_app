import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const types = {
    SET_AUTHENTIATED: "SET_AUTHENTIATED",
    SET_USER: "SET_USER"
};

const state = {
    isAuthenticated: false,
    user: {}
};

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user
};

const mutations = {
    [types.SET_AUTHENTIATED](state, isAuthenticated) {
        if (isAuthenticated) state.isAuthenticated = isAuthenticated;
        else state.isAuthenticated = false;
    },
    [types.SET_USER](state, user) {
        if (user) state.user = user;
        else state.user = {};
    }
};

//异步操作的actions
const actions = {
    setAuthenticated: ({commit}, isAuthenticated) => {
        commit(types.SET_AUTHENTIATED, isAuthenticated);
    },
    setUser: ({commit}, user) => {
        commit(types.SET_USER, user);
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_AUTHENTIATED, false);
        commit(types.SET_USER, null)
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})
