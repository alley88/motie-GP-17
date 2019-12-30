#webpack基本使用
>1、安装 `webpack webpack-cli`   `cnpm install webpack webpack-cli -D`
>2、创建src文件夹(开发环境的目录)  src文件夹中必须要有一个入口文件
>3、创建webpack.config.js文件  因为webpack在执行的时候默认会找到跟目录下面的webpack.config.js文件
>4、webpack.config.js文件的配置项
>5、打包命令(初级使用) npx webpack     npx:默认从当前文件的node_modules中找到相对应得模块
>6、scripts中的命令运行   npm run 命令
>7、scripts中的配置项  ---config:指定文件的配置项  --progress:文件打包的进度条
>8、plugins:使用插件 webpack中凡是用插件的地方都必须要在plugins中进行使用
   - html-webpack-plugin  
   - clean-webpack-plugin  
   - extract-text-webpack-plugin 抽离css 优化
   - copy-webpack-plugin  拷贝静态资源

    `cnpm install html-webpack-plugin  clean-webpack-plugin extract-text-webpack-plugin@next -D`

>9、loader:模块的转换，凡是需要将浏览器不识别的文件转换为浏览器识别的文件的配置项都需要在module中进行配置;
    
**JSloader**
- babel-loader
- @babel/core
- @babel/preset-env

`cnpm install babel-loader @babel/core @babel/preset-env -D`


```json
    {
    "presets": [
        [
            //低版本的转换
            "@babel/preset-env",
            {
                //设置浏览器版本
                "targets":{
                    //兼容到所有浏览的最后2个版本
                    "browsers":["last 2 version"]
                }
            }
        ]
    ]
}
```

**cssloader**
- style-loader
- css-loader
- sass-loader
- postcss-loader

在解析sass的时候除了需要sass-loader之外还需要一个特别重要的模块就是node-sass

`cnpm install style-loader css-loader sass-loader node-sass postcss-loader autoprefixer -D`

**图片loader**
- url-loader
- file-loader

`cnpm install url-loader file-loader -D`
   
>10、webpack-merge:合并webpack配置项  `cnpm install webpack-merge -D`

>11、webpack-dev-server 创建开发环境的服务  `cnpm install webpack-dev-server -D`

>12、处理非模块化的插件  安装：`cnpm install script-loader exports-loader -D`
```javascript
    {
        //引入非模块化的插件
        test: require.resolve('zepto'),
        //转化成模块的方式
        loader: 'exports-loader?window.Zepto!script-loader'
    },

```



#琐碎的概念
> -D:  --save-dev  也就是说当前依赖要安装到开发环境中去   devDependencies
> -S:  --save      也就是说当前依赖要安装到生产环境中去   Dependencies

**url-loader file-loader的区别**
url-loader:一般用来解析一些体积比较小的图片可以通过options中的limit来设置图片的大小
如果图片大于limit的大小了则会用file-loader进行解析  file-loader一般用来解析比较大的图片



**art-template语法总结**
> 1、<% include('文件名称')%>  引入子模板

> 2、<% %> 逻辑语句
```ejs
    <%for(var i=0;i<10;i++){%>

    <%}%>

    <%if(条件){%>

    <%}%>
```
> 3、数据渲染  <%-  %>：解析Html标签  <%= %> 不会解析html标签
