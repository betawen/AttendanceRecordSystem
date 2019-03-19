import Vue from 'vue'
import Router from 'vue-router'
import componentLogin from '../components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: {
        keepAlive: true
      },
      component: componentLogin
    }
  ]
})
