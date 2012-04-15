$(document).ready(function(){
  //load the relevant libraries
  
  var sp          = getSpotifyApi(1);
  var models      = sp.require("sp://import/scripts/api/models");
  var views       = sp.require("sp://import/scripts/api/views");
  var ui          = sp.require("sp://import/scripts/ui");
  var player      = models.player;
  var library     = models.library;
  var application = models.application;
  var playerImage = new views.Player();
  var storedTrack;

  var handleLinks = function() {
    var links = models.application.links;
    if(links.length) {
      switch(links[0].split(":")[1]) {
        default:
          storedTrack = models.Track.fromURI(links[0]);
          $("#now-playing").html("<p>"+storedTrack.data.name+"</p>");
          break;
      };
    };
  };
  application.observe(models.EVENT.LINKSCHANGED, handleLinks);

  //update time object
  var selectedTime = $(".time").serializeArray();
  $(".time").change(function(){
    selectedTime = $(".time").serializeArray();
  });

  handleLinks();

  //read s
  var selectedTime = $(".time").serializeArray();
  var today = new Date();
  var userDate = new Date();

  if(selectedTime[2].value == "AM"){
    userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate() , selectedTime[0].value, selectedTime[1].value, 0, 0);
    if(userDate<today){
      userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate()+1 , selectedTime[0].value,selectedTime[1].value, 0, 0);
    };
  }
  else{
    userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate() , selectedTime[0].value+12, selectedTime[1].value, 0, 0);
    if(userDate<today){
      userDate = new Date(today.getFullYear(),today.getMonth(), today.getDate()+1 , selectedTime[0].value+12,selectedTime[1].value, 0, 0);
    };
  };

 
  $(".time").change(function(){

  if(init == null){
    init = setInterval(checkTime, 500);
  }
   
  selectedTime = $(".time").serializeArray();
  userDate.setHours(selectedTime[0].value);
  userDate.setMinutes(selectedTime[1].value);

  if(selectedTime[2].value == "AM"){
    if(userDate<today){
       userDate.setDate(today.getDate() + 1);
     };
   }
   else if(selectedTime[2].value=="PM"){
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

 var init = setInterval(checkTime, 500);

 function checkTime(){
     today = new Date();
     //console.log(userDate);
     //console.log(today);
     if(userDate<=today){
           console.log("ALGLIFJDISALJG");
           player.play(storedTrack);
           clearInterval(init);
           init = null;
     };
 };

});
