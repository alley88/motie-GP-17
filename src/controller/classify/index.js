import classifyView from "view/classify.art"
import tabbar from "../tabbar"
class Classify{
    constructor(){

    }
    init(){
      
      
    }
    render(){
        var html = classifyView();
        $("#app").html(html);
        tabbar.init();

    }
}

export default new Classify()