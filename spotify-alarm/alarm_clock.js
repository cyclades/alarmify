$(document).ready(function(){
 var selectedTime = $(".time").serializeArray();
 var today = new Date();
 var userDate = new Date();
 console.log(userDate.getDate());

 if(selectedTime[0].value == "AM"){
     userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate() , selectedTime[1].value, selectedTime[2].value, 0, 0);
     if(userDate<today){
       userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate()+1 , selectedTime[1].value,selectedTime[2].value, 0, 0);
     };
 }
 else{
     userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate() , selectedTime[1].value+12, selectedTime[2].value, 0, 0);
     if(userDate<today){
       userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate()+1 , selectedTime[1].value+12,selectedTime[2].value, 0, 0);
     };
 };

 
 $(".time").change(function(){
   
   selectedTime = $(".time").serializeArray();
   userDate.setHours(selectedTime[1].value);
   userDate.setMinutes(selectedTime[2].value);

   if(selectedTime[0].value == "AM"){
     ;
     if(userDate<today){
       userDate.setDate(today.getDate() + 1);
     };
   }
   else if(selectedTime[0].value=="PM"){
     userDate.setHours(userDate.getHours() + 12);
     if(userDate<today){
       userDate.setDate(today.getDate() + 1);
     };
   };

   if(userDate.getDate() > today.getDate() && (userDate.getHours() > today.getHours() || userDate.getHours() == today.getHours() && userDate.getMinutes() > today.getMinutes())){
     userDate.setDate(userDate.getDate() - 1);
   }

   if(userDate.getDate() < today.getDate() && (userDate.getHours() < today.getHours() || userDate.getHours() == today.getHours() && userDate.getMinutes() < today.getMinutes())){
     userDate.setDate(userDate.getDate() + 1);
   }

 });

 var init = setInterval(checkTime,3000);

 function checkTime(){

     today = new Date();
     console.log(userDate);
     console.log(today);
     if(userDate<=today){
           console.log("ALGLIFJDISALJG");
     };
 };

});