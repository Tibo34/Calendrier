<template>
     <div class="login"> 
        <label>Nom : </label>
        <input type="text" name="nom" v-model="nom"/>
        <br><label>Prenom : </label>
        <input type="text" name="prenom" v-model="prenom"/>
        <br>
        <label>Email :</label>
        <input type="text" name="email" v-model="email"/><br>
        <label>Mot de passe : </label>
        <input type="text" name="password" v-model="password"/><br>       
         <input type="submit" value="Soumettre" @click="submit">
      </div>
</template>
<script>
import axios from 'axios';
import qs from 'qs';


export default {
    name:"CreateCompte",
    data(){
        return{
            nom:'',
            prenom:'',
            email:'',
            password:'',
        }
    },
    methods:{
        submit(){
			const config = {headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'Access-Control-Allow-Origin': "http://localhost" }}
			let url='http://localhost:3000/createCompte';	
			var params = new URLSearchParams();
			params.append('nom',this.nom);
			params.append('prenom',this.prenom);
			params.append('email',this.email);
			params.append('password',this.password);
			axios.post(url,params,config).then((rep)=>{
					alert("compte créer");					
					document.location.href="http://localhost:8080/#/Login";
			}).catch((error)=>console.log(error))
		
        }
    }
    
}
</script>
<style>
.login{
	font: 95% Arial, Helvetica, sans-serif;
	max-width: 400px;
	margin: 10px auto;
	padding: 16px;
	background: #F7F7F7;
}
.login h1{
	background: #43D1AF;
	padding: 20px 0;
	font-size: 140%;
	font-weight: 300;
	text-align: center;
	color: #fff;
	margin: -16px -16px 16px -16px;
}
.login input[type="text"],
.login input[type="date"],
.login input[type="datetime"],
.login input[type="email"],
.login input[type="number"],
.login input[type="search"],
.login input[type="time"],
.login input[type="url"],
.login textarea,
.login select 
{
	-webkit-transition: all 0.30s ease-in-out;
	-moz-transition: all 0.30s ease-in-out;
	-ms-transition: all 0.30s ease-in-out;
	-o-transition: all 0.30s ease-in-out;
	outline: none;
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 100%;
	background: #fff;
	margin-bottom: 4%;
	border: 1px solid #ccc;
	padding: 3%;
	color: #555;
	font: 95% Arial, Helvetica, sans-serif;
}
.login input[type="text"]:focus,
.login input[type="date"]:focus,
.login input[type="datetime"]:focus,
.login input[type="email"]:focus,
.login input[type="number"]:focus,
.login input[type="search"]:focus,
.login input[type="time"]:focus,
.login input[type="url"]:focus,
.login textarea:focus,
.login select:focus
{
	box-shadow: 0 0 5px #43D1AF;
	padding: 3%;
	border: 1px solid #43D1AF;
}

.login input[type="submit"],
.login input[type="button"],button{
	box-sizing: border-box;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	width: 100%;
	padding: 3%;
	background: #43D1AF;
	border-bottom: 2px solid #30C29E;
	border-top-style: none;
	border-right-style: none;
	border-left-style: none;	
	color: #fff;
}
.login input[type="submit"]:hover,
.login input[type="button"]:hover{
	background: #2EBC99;
}
</style>


