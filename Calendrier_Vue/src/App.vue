<template>
  <div id="app">   
    <myheader :year="year"></myheader>
      
    <router-view></router-view>   
    <myfooter></myfooter>
  </div>
</template>

<script>
import myheader from '@/components/Header'
import myfooter from '@/components/myFooter.vue'

export default {
  name: 'App',
  components:{
    myheader,
    myfooter
  },
  data(){
    return{
      year:new Date(Date.now()).getFullYear()
    }
  },
 
}



</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.myButton:active {
	position:relative;
	top:1px;
}
</style>
