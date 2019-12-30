const baseConfig = require("./base.config");
const webpackMerge = require("webpack-merge");
const path = require("path");

//合并
const config = webpackMerge(baseConfig, {
    //当前的环境
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                //cssloader的执行顺序 从右到左 从下到上
                use: ["style-loader", "css-loader", "sass-loader"],
                exclude: path.join(__dirname, "../node_modules")
            }
        ]
    },
    //服务器的配置项
    devServer: {
        //自动打开浏览器
        open: true,
        //设置端口号
        port: 9000,
        historyApiFallback: {
            rewrites: [{
                from: /.*/g,
                to: '/index.html' //与output的publicPath有关(HTMLplugin生成的html默认为index.html)
            }]
        }
    }
})


module.exports = config;

