 <template>
    <div>     
      <label>Date : {{date.toLocaleDateString()}} </label><br>
      <iput type="time" name="time" v-model="time"/>
      <label>Titre : </label>
      <input type="text" name="title" v-model="title"/>     
      <button class="myButton" @click="addEvent">Ajouter</button>
    </div>
  </template>

   <script>
import axios from 'axios';

   export default {
       name:'ModalEvent',
       props:{
         date:Date,
         event:Object
       },
       data(){
           return{            
               title:''
           }
       },         
       methods: {             
        addEvent:function(){
            let token=localStorage.jwt;
            let url='http://localhost:3000/addEvent';
            let params = new URLSearchParams();
            const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
            params.append('jwt',token);
            params.append('date',this.date);
            params.append('titre',this.title);
            axios.post(url,params,config).then((rep)=>{
               console.log(rep.data)
            })
        },
         displayEvent(){
          console.log(this.event)
        }  
            
      }
   }
   </script>
   <style>
 .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-close {
    border: none;
    font-size: 20px;
    padding: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4AAE9B;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  .modal-fade-enter,
  .modal-fade-leave-active {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity .5s ease
  }