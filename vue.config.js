const path = require('path')
module.exports = {
    publicPath: './', // 基本路径
    outputDir: process.env.outputDir, // 输出文件目录
    assetsDir: 'assets', //静态资源目录
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    runtimeCompiler: true,
    productionSourceMap: true, // 生产环境是否生成 sourceMap 文件
    chainWebpack: (config) => {
        config.module
            .rule('css')
            .test(/\.css$/)
            .oneOf('vue')
            .resourceQuery(/\?vue/)
            .use('px2rem')
            .loader('px2rem-loader')
            .options({
                remUnit: 108
            })
    },
    configureWebpack: (config) => {
        //webpack打包资源警示
        config.performance = {
            hints: 'warning',
            //入口起点的最大体积 整数类型（以字节为单位）
            maxEntrypointSize: 50000000,
            //生成文件的最大体积 整数类型（以字节为单位 300k）
            maxAssetSize: 30000000,
            //只给出 js 文件的性能提示
            assetFilter: function (assetFilename) {
                return assetFilename.endsWith('.js');
            }
        }

        if (process.env.NODE_ENV === 'production') {
            if(process.env.VUE_APP_FLAG === 'pro'){
                // 为生产环境修改webpack配置...
                config.mode = 'production'
            }else{
                 // 为测试环境修改webpack配置...
            }   
        } else {
            // 为开发环境修改webpack配置...
            config.mode = 'development'
        }
        Object.assign(config, {
            // 开发生产共同配置
            resolve: {
                alias: {
                    '@': path.resolve(__dirname, './src'),
                    '@c': path.resolve(__dirname, './src/components'),
                    '@p': path.resolve(__dirname, './src/pages')
                } // 别名配置
            }
        })
    },
    


    // css相关配置
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            css: {}, // 这里的选项会传递给 css-loader
            postcss: {} // 这里的选项会传递给 postcss-loader
        }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
        modules: false // 启用 CSS modules for all css / pre-processor files.
    },
    parallel: require('os').cpus().length > 1, // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
    pwa: {}, // PWA 插件相关配置 see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    
    // webpack-dev-server 相关配置
    devServer: {
        open: process.platform === 'darwin',
        host: '192.168.1.169', // 允许外部ip访问
        port: 8022, // 端口
        https: false, // 启用https
        overlay: {
            warnings: true,
            errors: true
        }, // 错误、警告在页面弹出
        proxy: {
            '/games.json': {
                target: 'https://9102pg.com/games.json',
                changeOrigin: true, // 允许websockets跨域
                // ws: true,
                pathRewrite: {
                    '^/games.json': ''
                }
            }
        } // 代理转发配置，用于调试环境
    },
    // 第三方插件配置
    pluginOptions: {}
}