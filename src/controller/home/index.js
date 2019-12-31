import home from "view/home.art"
import headerView from "view/header.art";
import "styles/home/index.scss"
import {channelsApi} from "api/home.js"
import Swiper from "@/common/swiper/index.js";

/*
* render:渲染  路由调用
*
*/
class Home{
    constructor(){
        
    }
    init(){

    }
    async render(){
       
        var data = await channelsApi();
        var banners = JSON.parse(data.items[0].dataSourceList[0].dataList);
        var navs = JSON.parse(data.items[2].dataSourceList[0].dataList);
        var Recommend = JSON.parse(data.items[3].dataSourceList[0].dataList);
        var classifys =  JSON.parse(data.items[4].dataSourceList[0].dataList);        
            
        var html = home({banners,navs,Recommend,classifys});
        var container = $("<div class='container'></div>")
        var header = headerView();
        container.append(header);
        container.append(html);
        $("#app").prepend(container);
       
       

        //轮播
        new Swiper(".banner",{
            
        })
    }
}

export default new Home()