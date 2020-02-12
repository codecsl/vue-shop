import {Req} from "../request"
export function getshoudata(){
    return Req({
        url:"menus",
        method:"get"
})
}