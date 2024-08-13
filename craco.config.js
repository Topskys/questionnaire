// [Craco.js扩展webpack配置](https://craco.js.org/docs/)
// 01 安装 npm i @craco/craco -D
// 02 新建craco.config.js文件，配置代理
// 03 在package.json中修改 "scripts": {"start":"craco start"}
// 04 npm run start
module.exports = {
    devServer: {
        // 配置代理跨域或直接在package.json中配置proxy: 'http://localhost:3001'
        proxy: {
            '/api': {
                target: 'http://localhost:3001',
                changeOrigin: true,
                pathRewrite: { '^/api': '/api' }
            }
        }
    }
}