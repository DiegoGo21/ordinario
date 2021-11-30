$(document).ready(function(){
    $("#aprobado").click(function(){
      $("#aprobado").hide();
      $("#reprobado").show();
    });
    $("#reprobado").click(function(){
      $("#reprobado").hide();
      $("#aprobado").show();
    });
});


