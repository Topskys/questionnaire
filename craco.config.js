// [Craco.js扩展webpack配置](https://craco.js.org/docs/)
// 01 安装 npm i @craco/craco -D
// 02 新建craco.config.js文件，配置代理
// 03 在package.json中修改 "scripts": {"start":"craco start"}
// 04 npm run start
module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // 优化：抽离公共代码antd和react-dom，合理使用HTTP缓存
            if (webpackConfig.mode === 'production') {
                // 抽离公共代码，只在生产环境生效
                if (webpackConfig.optimization == null) {
                    webpackConfig.optimization = {}
                }
                webpackConfig.optimization.splitChunks = {
                    chunks: 'all', // 
                    // minSize: 20000, // 生成文件的最小大小（以字节为单位）
                    cacheGroups: {
                        /**
                         * 从vendors-chunk单独抽离antd和react-dom
                         * 判断代码应该优先从哪个包读取
                         * 
                         * 如：import {Button} from 'antd';
                         * 由于antd-chunk优先级高于reactDom-chunk、vendors-chunk，所以antd的Button组件会从antd-chunk中读取
                         *  
                         * */ 
                        antd: {
                            name: 'antd-chunk', // 抽离生成的文件名
                            test: /antd/,
                            priority: 100 // 优先级，数字越大优先级越高
                        },
                        reactDom: {
                            name: 'reactDom-chunk',
                            test: /react-dom/,
                            priority: 99
                        },
                        vendors: {
                            // 其他node_modules剩余依赖在此
                            name: 'vendors-chunk',
                            test: /node_modules/,
                            priority: 98
                        }
                    }
                }
            }
            return webpackConfig
        }
    },
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