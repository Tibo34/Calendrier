<template>
  <header>    
    <nav>
      <ul>
      <li><router-link tag="button" to="/createCompte">Créer compte</router-link> </li>
      <li><router-link tag="button" to="/login">Connection</router-link> </li>
      <li> <router-link tag="button" to="/">Calendrier</router-link> </li>
      <li> <router-link tag="button" to="/AllEvents">Evenements</router-link> </li>
      </ul>
    </nav>
    <img src="@/assets/logo.png">  
    
     <div class="header"> Calendrier VueJS : {{year}}</div> 
         
  </header>
</template>

<script>
export default {
  name: 'Header',
  props:{
    year:Number
  }
}
</script>

<style>
 .header{
    font-size: 30px;
    font-family: Arial, Helvetica, sans-serif,Georgia, 'Times New Roman', Times, serif;
    margin: auto;
    color:darkblue;
    text-align: center;
    border:solid;
    border-color:darkblue;
    background-color: lightgreen;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #333;
}
li{
  display: inline;
  float: left;
   text-align: center;
  text-decoration: none;
  width: 25%;  
}


</style>
