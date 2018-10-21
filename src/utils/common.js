export  default{
    toTreeList: (data) => {
        // todo: 深度拷贝?
        var root = [];
        var nodes = {};
        data.forEach(function(x){
            nodes[x.id] = x;
            nodes[x.id].children = [];
        });
        
        data.forEach(function(x){
            if(x.parentId == "" ) {
                root = nodes[x.id];
                return;
            }
            nodes[x.parentId].children.push(nodes[x.id]);
        });
        return [root];
    }

}
