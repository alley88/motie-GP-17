import home from "view/home.art"
import "styles/home/index.scss"
import {channelsApi} from "api/home.js"
class Home{
    constructor(){
        
    }
    init(){

    }
    async render(){
        var data = await channelsApi();
      
        var html = home();
        $(".container").html(html);

    }
}

export default new Home()