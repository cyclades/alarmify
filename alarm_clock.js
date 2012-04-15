//Time
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

  var handleLinks = function() {
    var links = models.application.links;
    if(links.length) {
      switch(links[0].split(":")[1]) {
        default:
          player.play(models.Track.fromURI(links[0]));
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
});
