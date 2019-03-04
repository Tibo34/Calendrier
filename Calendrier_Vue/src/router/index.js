import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import Connection from '@/components/Connection'
import CreateCompte from '@/components/CreateCompte'
import VueCookie from 'vue-cookies';
import AllEvent from '@/components/DisplayAllEvent';


Vue.use(Router);
Vue.use(VueCookie);


export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage            
    },
    {
      path:'/login',
      name:'Login',
      component:Connection
    },
    {
      path:'/createCompte',
      name:'Compte',
      component:CreateCompte     
    },
    {
      path:'/AllEvents',
      name:'AllEvent',
      component:AllEvent
    }
  ]
})
