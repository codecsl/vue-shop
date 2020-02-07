import {request} from "./request"
export function getlogindata(username,password){
return request({
    url:"/login",
    method:"post",
    data:{
        username:username,
        password:password
    }
})
}