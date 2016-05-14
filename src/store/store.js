import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    items: [],
    host: 'http://tiankui.avosapps.com'
}

const mutations = {
    REMOVE (state, item) {
        state.items.$remove(item)
    },

    ADD (state, item) {
        state.items.push(item)
    },

    LOAD (state, items) {
        state.items.push(...items)
    }
}

export default new Vuex.Store({
    state,
    mutations
})