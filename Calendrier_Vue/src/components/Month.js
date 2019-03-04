

export default class Month{

    constructor(year,month){
        this.year=year;
        this.month=month;
        this.start=new Date(this.year,this.month,1);
        this.local=navigator.local;
    }

    getNameMonth(){
        let monthName=this.start.toLocaleString(this.local,{month:'long'});
        return monthName;
    }


    contains(date){
        return this.month===date.getMonth();
    }

    getDaysNumber(){
        let days=[];        
        let dayWeek=this.start.getDay()-1;        
        let end=new Date(this.start)
        end.setMonth(end.getMonth()+1);
        end.setDate(0);
        if(dayWeek<0){
            dayWeek=6;
        }
        let date=new Date(this.start);
        if(dayWeek>0){
            for(let i=dayWeek;i>0;i--){
                date=new Date(this.start);
                date.setDate(i*-1+1);
                days.push(date);
            }
        }         
        for(let i=0;i<end.getDate();i++){
            date=new Date(this.start);
            days.push(date);
            date.setDate(i+1);  
        }
        
        date=new Date(date);
        date.setMonth(this.month);
        dayWeek=date.getDay()-1;
        if(dayWeek<0){
            dayWeek=6;
        }
        if(dayWeek<6){
            for(let i=0;i<(6-dayWeek);i++){
                date=new Date(end)
                date.setDate(end.getDate()+i+1);
                days.push(date);
            }
        }
        return days;
    }

    static getMonths(year){
        let months=[];
        for(let i=0;i<12;i++){
            months.push(new Month(year,i));
        }
        return months;
    }

    static getDaysNames(){
        let days=[];
        let date;
        for(let i=0;i<7;i++){
            date=new Date(2019,1,25+i).toLocaleString(navigator.local,{weekday:"short"});
            days.push(date);
        }
        return days;
    }
}