import { Req } from "network/request"
//分类列表首次请求
export function goodsfeilei({ type, pagenum, pagesize }) {
    return Req({
        url: "categories",
        method: "get",
        params: {
            type,
            pagenum,
            pagesize
        }
    })
}
export function tianjiafeilei({ cat_pid, cat_name, cat_level }) {
    return Req({
        url: "categories",
        method: "post",
        data: {
            cat_pid,
            cat_name,
            cat_level
        }
    })
}
export function xiugaifeilei(id) {
    return Req({
        url: `categories/${id}`,
        method: "get"
    })
}
export function quedingxiugail(id, cat_name) {
    return Req({
        url: `categories/${id}`,
        method: "put",
        data: {
            cat_name
        }
    })
}
export function shanchu(id) {
    return Req({
        url: `categories/${id}`,
        method: "delete"
    })
}

//分类参数请求

export function canshu(id, dj) {
    return Req({
        url: `categories/${id}/attributes`,
        method: "get",
        params: {
            sel: `${dj}`
        }
    })
}
//添加参数
export function tc(id, attr_name, attr_sel, attr_vals) {
    return Req({
        url: `categories/${id}/attributes`,
        method: 'post',
        data: {
            attr_name,
            attr_sel,
            attr_vals
        }
    })
}
//编辑参数 根据id查询参数
export function bjid(cat_id, attr_id, attr_sel, attr_vals) {
    return Req({
        url: `categories/${cat_id}/attributes/${attr_id}`,
        method: 'get',
        params: {
            attr_sel,
            attr_vals
        }
    })
}
export function bjqd({ cat_id, attr_id, attr_name,
    attr_sel, attr_vals }) {
    return Req({
        url: `categories/${cat_id}/attributes/${attr_id}`,
        method: 'put',
        data: {
            attr_name,
            attr_sel,
            attr_vals

        }
    })
}
export function canshushanchu(id, attrid) {
    return Req({
        url: `categories/${id}/attributes/${attrid}`,
        method: 'delete'
    })
}
export function cxcs(cat_id, attr_id, attr_name, attr_sel, attr_vals) {
    return Req({
        url: `categories/${cat_id}/attributes/${attr_id}`,
        method: 'put',
        data: {
            attr_name,
            attr_sel,
            attr_vals
        }

    })
}
//商品列表初次请求
export function goodslie({ query,
    pagenum,
    pagesize }) {
    return Req({
        url: "goods",
        method: "get",
        params: {
            query,
            pagenum,
            pagesize

        }
    })
}

//根据id查询商品
export function bjsp(id) {
    return Req({
        url: `goods/${id}`,
        method: "get"
    })

}
//编辑提交
export function bjtj({cat_id, goods_name,goods_price,goods_number,goods_weight}) {
    return Req({
        url: `goods/${cat_id}`,
        method: 'put',
        data: {
            goods_name,
             goods_price,
            goods_number,
            goods_weight,
            goods_introduce:"",
            pics:"",
            attrs:""
        }
    })
}
export function shanchulo(id) {
    return Req({
        url:`goods/${id}`,
        method:"delete"
    })
}

//添加商品
export function tij({
    goods_name,
    goods_price,
    goods_number,
    goods_weight,
    goods_cat,
     pics,
     goods_introduce,
     attr
  }) {
    return Req({
        url:"goods",
        method:"post",
        data:{
            goods_name,
            goods_price,
            goods_number,
            goods_weight,
            goods_cat,
             pics,
             goods_introduce,
             attr
        }
    })
}


