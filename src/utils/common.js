export  default{
    toTreeList: (data) => {
        // todo: 深度拷贝?
        var root = [];
        var nodes = {};
        data.forEach(function(x){
            nodes[x.Id] = x;
            nodes[x.Id].children = [];
        });
        
        data.forEach(function(x){
            if(x.ParentID == "" ) {
                root = nodes[x.Id];
                return;
            }
            nodes[x.ParentID].children.push(nodes[x.Id]);
        });
        return [root];
    }

}
