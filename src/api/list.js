import axios from "utils/request.js";

export const listBookApi = ({rankType,sex,pageNo,siteId,timeLimit,group,pageSize})=>axios({
    url:"/api/ranking",
    method:"get",
    data:{
        rankType,
        sex,
        pageNo,
        siteId,
        timeLimit,
        group,
        pageSize
    }
})