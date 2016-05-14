import Vue from 'vue'
import VueRouter from 'vue-router'
import VueTouch from 'vue-touch'
import VueResource from 'vue-resource'

import App from './App.vue'
import configRouter from './router'

Vue.use(VueRouter)
Vue.use(VueTouch)
Vue.use(VueResource)

const router = new VueRouter({
    // history: true,
    // saveScrollPosition: true,
    abstract: true
})

configRouter(router)

router.start(Vue.extend(require('./App.vue')), '#app')
router.redirect({
    '/': '/history'
})