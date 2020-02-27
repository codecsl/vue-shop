import axios from "axios"
import NProgress from "nprogress"
export function Req(config){
  
    const instance=axios.create({
        baseURL:"http://127.0.0.1:8888/api/private/v1/",
        timeout:10000
    })

    instance.interceptors.request.use(conf=>{
        conf.headers.Authorization=window.sessionStorage.getItem("token")
        NProgress.start();
        return conf
    })
   
    instance.interceptors.response.use(reso=>{
        NProgress.done();
        return reso
    })
    
    return instance(config)


}
