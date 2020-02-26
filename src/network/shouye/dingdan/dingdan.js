import {Req} from "network/request"

export function dingdan({query, pagenum, pagesize}) {
    return Req({
        url:"orders",
        method:"get",
        params:{
            query,
            pagenum,
            pagesize
        }
    })
}
//查看物流信息
export function wuliu() {
    return Req({
        url:`/kuaidi/1106975712662`,
        method:"get"
    })
}