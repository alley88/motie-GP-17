import home from "view/home.art"
import headerView from "view/header.art";
import "styles/home/index.scss"
import {channelsApi} from "api/home.js"

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
        var header = headerView();
        $(".container").html(html);
        $(".container").before(header)

    }
}

export default new Home()