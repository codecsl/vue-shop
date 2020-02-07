module.exports = {
    devServer: {
        open: true
    },
    configureWebpack: {
        resolve: {
            alias: {
                "assets": "@/assets",
                "common": "@/common",
                "components": "@/components",
                "network": "@/network",
                "router": "@/router",
                "views": "@/views"
            }
        }
    }

    // css: {
    //     modules: true,
    //     // 是否将组件中的 CSS 提取至一个独立的 CSS 文件中,当作为一个库构建时，你也可以将其设置为 false 免得用户自己导入 CSS
    //     // 默认生产环境下是 true，开发环境下是 false
    //     extract: false,
    //     // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
    //     sourceMap: false,
    //     loaderOptions: {
    //         less: {
    //             javascriptEnabled: true //less 配置
    //         }
    //     }
    // }
}




