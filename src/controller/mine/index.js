import mineView from "view/mine.art"
import tabbar from "../tabbar"
class Mine{
    constructor(){

    }
    init(){
      
      
    }
    render(){
        var html = mineView();
        $("#app").html(html);
        tabbar.init();

    }
}

export default new Mine()