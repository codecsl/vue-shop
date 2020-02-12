import {Req} from "./request"
export function getlogindata(username,password){
return Req({
    url:"login",
    method:"post",
    data:{
        username:username,
        password:password
    }
})
}