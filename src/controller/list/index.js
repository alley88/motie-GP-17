import listView from "view/list.art"

class List{
    constructor(){

    }
    init(){
      
      
    }
    render(){
       
        var html = listView();
        var container = $("<div class='container'></div>")
        container.append(html);
        $("#app").prepend(container)

       

    }
}

export default new List()