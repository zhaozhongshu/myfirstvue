(function (){
    $.ajax({
        type: "get",
        url: "/api/getOrgn",
       async: false,
        success: function(res){
               window.orgnData = res.data;
              // return  Utils.toTreeList(res.data);
           }
     });
}())