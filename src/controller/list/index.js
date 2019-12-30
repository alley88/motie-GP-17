import listView from "view/list.art"
import tabbar from "../tabbar"
class List{
    constructor(){

    }
    init(){
      
      
    }
    render(){
        var html = listView();
        $("#app").html(html);
        tabbar.init();

    }
}

export default new List()