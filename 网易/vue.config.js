const path = require("path")

function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    lintOnSave: false,
    devServer: {
        // 配置代理跨域
        proxy: {
            // 指的是哪些请求会触发代理跨域，/指的是任意的请求都会触发
            '/api': {
                // target指的是代理地址，我们需要代理请求的地址
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': 'http://localhost:3000'
                }
            }
        }
    },
    chainWebpack: (config) => {
        // 第一参数@$代表别名，第二个参数代表替代的开始路径
        config.resolve.alias.set("@$", resolve('src'))
    }
}