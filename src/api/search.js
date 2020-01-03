import axios from "utils/request.js";


export const searchApi = ({word,pageNo,pageSize})=>axios({
    url:"/api/search",
    data:{
        word,
        pageNo,
        pageSize
    },
    method:"get",
    headers:{
        os:"wap"
    }
})