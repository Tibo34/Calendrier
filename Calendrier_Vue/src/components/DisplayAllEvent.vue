<template>
<div>
    <table>
        <tr>
            <th>id</th>
            <th>Date</th>
            <th>Titre</th>            
        </tr>
    <tr v-for="event in events" :key="event">
        <td>{{event.id}}</td>
        <td>{{event.date.toLocaleDateString()}}</td>
        <td>{{event.title}}</td>
        <button @click="deleteEvent(event.id)">Supprimer</button>
    </tr>
    </table>
</div>
    
</template>
<script>

import axios from 'axios';


export default {
    name:"AllEvent",
    data(){
        return{
        events:[]
        }
    },
    methods:{
        deleteEvent(id){
            let token=localStorage.jwt;
        let url='http://localhost:3000/deleteEvent';
        let params = new URLSearchParams();
        const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        params.append('jwt',token);
        params.append('id',id);
        axios.post(url,params,config).then((rep)=>{           
            console.log(rep)
        }).catch((err)=>{console.log(err)})    

        }
    },
    created(){
        let token=localStorage.jwt;
        let url='http://localhost:3000/getEventsList';
        let params = new URLSearchParams();
        const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        params.append('jwt',token);
        axios.post(url,params,config).then((rep)=>{
            rep.data.listEvents.forEach(element => {
                let event={
                    id:element.id,
                    date:new Date(element.date),
                    title:element.title
                }
                this.events.push(event);
            });
            console.log(this.events)
        }).catch((err)=>{console.log(err)})    
    }
}
</script>
<style>
table {
  font-family: "Times New Roman", Times, serif;
  border: 1px solid #FFFFFF;
  width: 100%;
  height: 200px;
  text-align: center;
  border-collapse: collapse;
}
table td, table th {
  border: 1px solid #FFFFFF;
  padding: 3px 2px;
}
table tbody td {
  font-size: 13px;
}
table tr:nth-child(even) {
  background: rgb(113, 194, 104);
}
table thead {
  background: #63A45D;
  border-bottom: 5px solid #FFFFFF;
}
table thead th {
  font-size: 17px;
  font-weight: bold;
  color: #FFFFFF;
  text-align: center;
  border-left: 2px solid #FFFFFF;
}
table thead th:first-child {
  border-left: none;
}

table tfoot {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
  background: #81F583;
  border-top: 3px solid #444444;
}
table tfoot td {
  font-size: 14px;
}
</style>
