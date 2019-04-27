import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import User from '../components/User'
import Data from '../components/Data'
import Search from '../components/Search'
import Message from "../components/Message"
import HelloWorld from '../components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/data',
      component: Data
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component: User
    },
    {
      path: '/message',
      component: Message
    },
    {
      path: '/chart',
      component: HelloWorld
    }
  ]
})
