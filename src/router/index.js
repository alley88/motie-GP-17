/*
    路由表的配置：
        将用户请求的路径与页面进行相关联

*/

import AlleyRouter from "lib/alley-router"
import home from "controller/home/index.js"
import list from "controller/list/index.js"
import classify from "controller/classify/index.js";
import mine from "controller/mine/index.js"
import detail from "controller/detail/index.js"
const router = new AlleyRouter({
    //路由的形式
    mode:"hash",
    //路由表的配置
    routes:[
        {
            //当用户访问/的时候 页面展示home
            path:"/",
            template:home
        },
        {
            //当用户访问/list的时候 页面展示list
            path:"/list",
            template:list
        },
        {
           
            path:"/classify",
            template:classify
        },
        {
            //当用户访问/list的时候 页面展示list
            path:"/mine",
            template:mine
        },
        {
            path:"/detail",
            template:detail
        }
    ]
})

window.router = router;

export default router;