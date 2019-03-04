<template>
<div> 
    <calendar :year="year"></calendar> 
</div>
</template>

<script>

import calendar from '@/components/Calendar'

export default {
  name: 'HomePage',
  components:{
      calendar
  },
  data(){
    return{
      year:new Date(Date.now()).getFullYear()
    }
  },
}
</script>

<style>
</style>