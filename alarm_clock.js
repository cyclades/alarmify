//Time
$(document).ready(function(){
  var selectedTime = $(".time").serializeArray();
  $(".time").change(function(){
    selectedTime = $(".time").serializeArray();
  });
});
