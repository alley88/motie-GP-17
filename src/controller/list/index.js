import listView from "view/list.art"

class List{
    constructor(){

    }
    init(){
      
      
    }
    render(){
       
        var html = listView();
        $(".container").html(html);
       

    }
}

export default new List()