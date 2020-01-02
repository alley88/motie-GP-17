import axios from "utils/request.js"

export const categoryApi = (group) => axios({
    url: "/api/category",
    method: "post",
    data: {
        group,
        gender: ""
    },
    headers: {
        os: "wap"
    }
})


export const booksListApi = ({free,finish,group,sortId,page,pageSize}) => axios({
    url: "/api/category/detail",
    method: "post",
    data: {
        free,
        finish,
        group,
        sortId,
        page,
        pageSize,
    },
    headers:{
        os:"wap"
    }
})