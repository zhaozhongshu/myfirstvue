export  default{
    sexFilter: (param) =>{
       if(param==1){
           return "女";
       }else{
           return "男";
       }
    },
    showSexUpdatefilter:(param) =>{
        console.log(param)
        if(param.sex=="女"){
            return true;
        }else{
            return false;
        }
    }
}
