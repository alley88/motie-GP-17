import home from "view/home.art"
import tabbar from "../tabbar"
class Home{
    constructor(){

    }
    init(){
      
      
    }
    render(){
        var html = home();
        $("#app").html(html);
        tabbar.init();

    }
}

export default new Home()