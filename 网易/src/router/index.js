import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
    routes: [
        {
            path: "/wyy",
            component: () =>
                import ('@/views/wyy.vue'),
            children: [{
                    path: "/home",
                    component: () =>
                        import ("@/views/Home/home.vue")
                },
                {
                    path: "/hotsonglist",
                    component: () =>
                        import ("@/views/Hotsonglist/hotsonglist.vue")
                },
                {
                    path: "/search",
                    component: () =>
                        import ("@/views/Search/search.vue")
                },
                {
                    path: "*",
                    redirect: "/home"
                }
            ]
        },
        {
            path: "/player",
            component: () =>
                import ("@/views/Player/player.vue")
        },
        {
            path: "*",
            redirect: "/wyy"
        }
    ]
})
export default router