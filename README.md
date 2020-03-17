### vue课程的四个阶段
    base: 第一阶段;对vue的基础语法有深刻的理解
        指令
        配置
        生态圈

    layout: 第二阶段; 这个阶段是对vue的基本使用;难点在于页面的布局
        对整个vue脚手架要有基本的理解
        要掌握组件化的编程(js模块化 + css模块化 +html模块化)
        要学会在工程化的项目中 如何编写样式
        对css预处理器要有一个全面的认识
        掌握基本的布局技巧

    vant: 第三阶段; 这个阶段是对vue.UI库的基本使用;难点在于联系人练习中axios的封装
        对vant的使用要有基本的认识
        对数组 promise async await要有深入的理解
        一定要深刻理解我们对axios的二次封装!!!

    wrap: 第四阶段;这个阶段是对vue技术栈的整体的进阶使用
        axios (处理了跨域 进一步封装了我们的请求模块)
        vuex
        vue-router


### wrap-day01
    搭建了整个wrap的开发环境
    完成对请求的二次封装(基于axios;在联系人练习的基础上) 难!!!
    完成了路由页的基本拆分
    完成了项目的跨域方案(3-15补) 难!!!


### wrap-day02
    完成首页的功能
        结合vuex
        轮播 (渲染问题 难)
        商家列表的滑屏(渲染问题 难)

### wrap-day03
    完成登录页的功能
        界面交互
            1. 登录方式切换
            2. 当手机号输入正确时;后面的文本得点亮
            3. 倒计时
            4. 密码的明文 密文的切换
            5. 表单验证
        数据交互


### vue界面的渲染问题
    数据得到了修改
    dom产生更新
    界面还需要渲染
        如果项目集成了vuex
            转发一个action 得到返回值是一个promise
            这个promise的状态 从pending-->resloved
            代表的是界面渲染完成了
                await action()
                //以下的代码在执行时;界面已经渲染完了 进行dom操作肯定是没问题的

        如果项目没有集成vuex
            确保在界面对应的数据得到修改后;注册$nextTick
            再下精确一点:
                  this.$nextTick(()=>{
                    setTimeout(()=>{
                        //进行一些dom操作
                    })
                  })


### 跨域
    url:
        协议://主机:端口/path?query#hash
    域:
        协议://主机:端口
    跨域:
        域的表达形式有一点点不一样就可以称为跨域
    后台服务器:
        node的能力
            使用node可以监听到请求
            也可以使用node写后台接口 去操作数据库
        现在对node使用最主流的是
            使用node做为中间件!!!
            使用node编程前端工具!!!(写工具 一定是要对文件进行读取操作的  流!!!!)
            写的是一些toB的项目(面向企业的项目 后台管理项目 使用的用户比较少);我们也可以使用node来写接口
    静态资源服务器:
        html
        css
        js
        图片
        字体
    前后端分离
        静态资源服务器&后台服务器
    服务端渲染
        后台服务器(理解服务端渲染)
    什么开发模式下;跨域会出现:
        前后端分离 一般都会有跨域
        服务端渲染
            服务端模板中对第三方接口发起了请求  也会有跨域
            服务端模板中对本公司的接口发起了请求 一般不会有跨域

### 怎么在vue的脚手架中解决跨域
    不能配基地址!!!!!
        跨单域
            proxy:"跨的域"
        跨多域
            proxy:{
                "域分类1":{
                    target:"跨的域",
                    changeOrigin:true,
                    pathRewrite:{
                        "^域分类1":""
                    }
                }
                "域分类2":{}
                ....
            }
        与axios结合
            api:保持接口地址正确
            在发请求前 将域分类1拼接到api上
            在发请求时 proxy会进行pathRewrite将拼上去的域分类1干掉







