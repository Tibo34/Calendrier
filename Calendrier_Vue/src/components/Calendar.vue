<template>
<div>
    
    <div class="calendarVue">
       
        <div class="calendarVue_month" v-for="month in months" :key="month">
            <div class="calendarVue_monthName">
                {{month.getNameMonth()}}
            </div>
            <div class="calendarVue_daysNames" >
                <div v-for="day in daysWeek" :key="day">
                     {{day}}
                </div>
            </div>
            <div class="calendarVue_daysNumber">
                <div class="calendarVue_day" v-for="dayNum in month.getDaysNumber()" :key="dayNum" :class="classDay(dayNum,month)" >
                    <Modal :btnText="dayNum.getDate().toString()"                           
                        :closeBtn="true"
                        closeBtnContent="<span>X</span>"
                        >                            
                                <ModalEvent :date="dayNum" :event="getDayEvent(dayNum)"/>
                        </Modal> 
                </div>
            </div>
        </div>       
     </div>
</div>
</template>
<script>

import Month from '@/components/Month.js';
import axios from 'axios';
import Modal from "@melmacaluso/vue-modal"
import ModalEvent from '@/components/ModalEvent'

export default {
    name:"Calendar",   
    props:{
        year:Number,        
    },
    components:{
        Modal,
        ModalEvent
    },
    mounted(){        
        this.months=Month.getMonths(this.year)
        this.daysWeek=Month.getDaysNames();
    },
    data(){
        return{
            months:[],
            daysWeek:[],
            events:[]           
        }
    },
    created () {
        let token=localStorage.jwt;
        let url='http://localhost:3000/getEventsList';
        let params = new URLSearchParams();
        const config = {headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
        params.append('jwt',token);
        axios.post(url,params,config).then((rep)=>{
            rep.data.listEvents.forEach(e=>{
                let event={
                    id:e.id,
                    date:new Date(e.date),
                    title:e.title
                }
                this.events.push(event);
            });
        }).catch((err)=>{console.log(err)})    
       
    },
    methods:{
        classDay(day,month){
            let classe=[];
            if(!month.contains(day)){
                 classe.push('calendarVue_dayOut')   
            }            
            return classe;
        },
        getDayEvent(day){
            let event=[]
            this.events.forEach(element => {
                let date=new Date(element.date);
                if(day.getDate()==date.getDate()){
                    event.push(element);
                }                                
            });            
            return event;
        },
        countEventDay(day){
            let count=0;
            this.events.forEach(element=>{
                if(element.date.getDate()==day.getDate()){
                    count++;
                }
            })
            return count;
        }      
        
    }

}
</script>
<style src="./style.scss" lang ="scss">
 button {
    font-size: 1.25rem;
    border-radius: 3%;
    background-color: #f63954;
    border-color: #f63954;
    color: #fff;
    font-weight: 500;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
    transition: all 0.3s;
    cursor: pointer;
    margin-bottom: 2rem;
    &:hover {
      box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11),
        0 5px 15px 0 rgba(0, 0, 0, 0.08);
      background-color: #f55c72;
    }
  }
  .modal, .content {
      background: #fff;
      width: 80%;
      max-width: 480px;
      height: 200px;
      max-height: 250px;
      box-shadow: 0 15px 30px 0 rgba(0, 0, 0, 0.11), 0 5px 15px 0 rgba(0, 0, 0, 0.08);
      border-radius: 3px;
      border: 1px solid darkslategray;
      padding: 1rem;
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      code {
        background: #e4e4e4;
        border-radius: 3px;
        padding: 0.25rem 0.5rem;
        margin: 0.5rem 0;
        color: crimson;
      }
  }
  .content {
    > div {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      margin: auto;
      height: 100%;
      width: 100%;
      padding: 0 !important;
    }
    div {
      padding: 2rem;
      height: 100%;
    }
    img {
      width: auto;
      height: 150px;
    }
  }
  h2 {
    margin-top: 3rem;
  }
  .navigation {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    margin: 0 2rem;
    max-width: 480px;
     .active {
      background-color: #636363;
      border-color: #c7c7c7;
    }
}
</style>

