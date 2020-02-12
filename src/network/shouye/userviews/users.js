import { Req } from "network/request"
export function getusersdata(query, page, tiao) {
    return Req({
        url: "users",
        method: "get",
        params: {
            query: query,
            pagenum: page,
            pagesize: tiao
        }
    })
}
export function userdatachanged(uld, type) {
    return Req({
        url: `users/${uld}/state/${type}`,
        method: "put"
    })
}
export function addusers({username,password,email,mobile}) {
    return Req({
        url: "users",
        method: "post",
        data: {
            username,
            password,
            email,
            mobile

        }
    })
}
export function Modify(id){
    return Req({
     url:`users/${id}`,
     method:"get"
    })
}
export function correcto(id,email,mobile){
    return Req({
        url:`users/${id}}`,
        method:"put",
        data:{
            email,
            mobile
        }
    })
}
export function deleteo(id){
return Req({
    url:`users/${id}`,
    method:"delete"
})
}
export function distribution(id,role){
    return Req({
        url:`users/${id}/role`,
        method:"put",
        data:{
role
        }
    })
}