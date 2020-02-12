import axios from "axios"

export function Req(config){
  
    const instance=axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1/",
        timeout:10000
    })

    instance.interceptors.request.use(conf=>{
        conf.headers.Authorization=window.sessionStorage.getItem("token")
        return conf
    })
   
    
    return instance(config)


}
