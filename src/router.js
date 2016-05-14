export default function (router) {
    router.map({
        '/statistic': {
            name: 'statistic',
            component: require('./components/statistic.vue')
        },
        '/history': {
            name: 'history',
            component: require('./components/history.vue')
        },
        '/setting': {
            name: 'setting',
            component: require('./components/setting.vue')
        }
    })
}