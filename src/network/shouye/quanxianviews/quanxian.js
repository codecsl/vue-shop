import {Req} from "network/request"
export function liebiao(type){
    return Req({
        url:`rights/${type}`,
        method:"get"
    })
}
export function roleso(){
    return Req({
        url:"roles",
        method:"get"
    })
}
export function addusers({roleName,roleDesc}){
    return Req({
        url:"roles",
        method:"post",
        data:{
            roleName,
            roleDesc
        }
    })
}
export function bianjio(id){
    return Req({
        url:`roles/${id}`,
        method:"get"
    })
}
export function xiugaio({roleId,roleName,roleDesc}){
return Req({
    url:`roles/${roleId}`,
    method:"put",
    data:{
        roleName,
        roleDesc
    }
    
})
}
export function del(id){
    return  Req({
        url:`roles/${id}`,
        method:"delete"
    })
}
export function deluser(roleId,rightId){
    return Req({
        url:`roles/${roleId}/rights/${rightId}`,
        method:"delete"
    })
}
export function fenpeiquanxain(type){
    return Req({
        url:`rights/${type}`,
        method:"get"
    })
}
export function shouquan(roleId,rids){
    return Req({
        url:`roles/${roleId}/rights`,
        method:"post",

        data:{
            rids
        }
    })
}