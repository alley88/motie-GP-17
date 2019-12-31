import axios from "utils/request.js";

// https://app2.motie.com/h5/channels/106

/* 
* 首页接口
*106:男生
*107:女孩
*/
export const channelsApi = ()=>axios({
    method:"get",
    url:"/api/h5/channels/106",
    headers:{
        os: "wap"
    }
})


/*
书籍详情
157018：书籍ID
https://app2.motie.com
*/


export const detailApi = (id)=>axios({
    method:"get",
    url:"/api/books/"+id+"/detail",
    headers:{
        os: "wap"
    }
})



