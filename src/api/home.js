import axios from "utils/request.js";

// https://app2.motie.com/h5/channels/106

/* 
* 首页接口
*106:男生
*107:女孩
*/
export const channelsApi = ()=>axios({
    method:"get",
    url:"/h5/channels/106",
    headers:{
        os: "wap"
    }
})




