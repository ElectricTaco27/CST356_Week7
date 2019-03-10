import Vue from 'vue'
import Router from 'vue-router'
import Callback from '@/components/Callback'
import Home from '@/components/Home'
import Students from '@/components/Students'
import Person from '@/components/Person'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/callback',
      component: Callback
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/students',
      component: Students
    },
    {
      path: '/persons',
      component: Person
    },
    {
      path: '/login',
      component: Login
    },
  ]
})
