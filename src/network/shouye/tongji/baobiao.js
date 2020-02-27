import {Req} from "network/request"

export function baobiao(params) {
    return Req({
        url:"reports/type/1",
        method:"get"
    })
}