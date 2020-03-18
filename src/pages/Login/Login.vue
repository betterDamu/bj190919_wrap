<template>
    <div class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;"
                       :class="{on:loginWay==='message'}"
                       @click="loginWay = 'message'">短信登录</a>
                    <a href="javascript:;"
                       :class="{on:loginWay==='password'}"
                       @click="loginWay = 'password'">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form>
                    <div :class="{on:loginWay==='message'}">
                        <section class="login_message">
                            <input v-model.trim="phoneNumber" type="tel"
                                   maxlength="11" placeholder="手机号"
                                    name="phone" v-validate="'required|mobile'">
                            <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
                            <button :disabled="!phoneNumberIsRight || (times>0)" class="get_verification"
                                :class="{highLight:phoneNumberIsRight}"
                                    @click.prevent="getCode">{{times>0?`验证码已发送(${times}s)`:`获取验证码`}}</button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="6" placeholder="验证码"
                                   v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}" >
                            <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:loginWay==='password'}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名"
                                       v-model="name" name="name" v-validate="'required'">
                                <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>
                            </section>
                            <section class="login_verification">
                                <input :type="right?`text`:`password`" v-model="pwd"
                                       maxlength="8" placeholder="密码" name="pwd" v-validate="'required'" >
                                <div class="switch_button" :class="right?`on`:`off`" @click="right=!right">
                                    <div class="switch_circle" :class="{right:right}"></div>
                                    <span class="switch_text">abc</span>
                                </div>
                                <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="4" placeholder="验证码" v-model="captcha"
                                        name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
                                <img class="get_verification" ref="captchaImg"
                                     :src="captchaUrl" alt="captcha" @click="getCaptcha">
                                <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>
                            </section>
                        </section>
                    </div>
                    <button class="login_submit" @click.prevent="login">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <span href="javascript:" class="go_back" @click="goto(`/Msite`)">
                <i class="iconfont icon-jiantou2"></i>
            </span>
        </div>
    </div>
</template>

<script>
   /*
        前端工程师去公司装的环境:
            1. node
            2. npm
            3. git
            4. 编辑器
            5. postman
    */
   /*界面上的逻辑
        1. 登录方式切换
        2. 当手机号输入正确时;后面的文本得点亮
        3. 倒计时(在倒计时的时候 获取验证码的这个按钮应该要处于禁用状态)
        4. 密码的明文 密文的切换
        5. 表单验证
    */
   /*
    数据请求
       1. 一次性图片验证码
            不发ajax请求  而是一个纯的http请求
       2. 一次性短信验证码
            ---> https://www.yuntongxun.com/member/main
                将组件账号的配置 覆盖 后台应用中的配置util/sms_util.js
                添加测试号码
            倒计时要停
       3. 两种登录
           手机,短信
               登录成功之后要将用户信息保存(仓库)
               登录成功之后要跳转到个人中心(登录信息回显)
               登录成功之后要更新验证码
               登录失败之后提示失败
           用户名,密码
               登录成功之后要将用户信息保存(仓库)
               登录成功之后要跳转到个人中心(登录信息回显)
               登录失败之后提示失败
               登录失败之后要更新验证码
       4. 退出登录
            将用户信息(user)清空
       5. 考虑token
           登录成功时将token存入到local中(token的持久化)
           登录成功时将token交给vuex来管理
           退出时 将user 和 token清除 并将local清除

           处理一些请求时需要携带token的接口
           没有token 请求进入失败流程 跳转回登录页
           拥有token 可是token已经失效 跳转回登录页
           拥有token token没有失效 则携带上token(Authorization)
       6. 自动登录
    */
    import {GETUSER} from "@/store/mutation_types.js"
    import {mapActions} from "vuex";
    import {Toast} from  "vant";
    const OK = 0;
    const ERROR = 1;
    export default {
        name:"Login", //这个name是vue tools需要的
        data(){
          return {
              loginWay:"message",  //登录方式切换需要的数据
              phoneReg:/^1\d{10}/igm, //文本点亮需要的依赖数据
              phoneNumber:"", //文本点亮需要的依赖数据
              times:0,//倒计时需要的数据
              right:false,//明文切换需要的数据

              code:"",//短信6位验证码
              name:"",//用户名
              pwd:"",//密码
              captcha:"",//图片四位验证码

              //在互联网中的所有资源 它的唯一性标识就是url
              //前后访问的url一样 浏览器就会使用缓存
              captchaUrl:`http://localhost:4000/captcha?${new Date().getTime()}`
          }
        },
        computed:{
            //文本点亮需要的数据
            phoneNumberIsRight(){
                return this.phoneReg.test(this.phoneNumber)
            }
        },
        methods:{
            /*请求在哪边发送:
                如果请求回来的数据要在界面上显示
                    如果项目用了vuex
                        : 请求在action中发 数据要交给vuex管理
                    如果项目没有使用vuex
                        : 请求在组件的生命周期中发 数据交给data*/
            ...mapActions([GETUSER]),

            //两种登录
            async login(){
                //对表单进行强制检验  检验不通过 不让登陆
                if(this.loginWay === "message"){
                    //检验2个表单
                    let messageFlag = await this.$validator.validateAll(["phone","code"]);
                    if(messageFlag){
                        //短信登陆
                        this[GETUSER]({
                            loginWay:this.loginWay,
                            phone:this.phoneNumber,
                            code:this.code
                        })
                    }

                }else if(this.loginWay === "password"){
                    //检验3个表单
                    let passwordFlag = await this.$validator.validateAll(["name","pwd","captcha"]);
                    if(passwordFlag){
                        //用户名密码登录
                        this[GETUSER]({
                            loginWay:this.loginWay,
                            name:this.name,
                            pwd:this.pwd,
                            captcha:this.captcha,
                            getCaptcha:this.getCaptcha
                        })
                    }
                }
            },
            //获取图片验证码
            getCaptcha(){
                this.$refs.captchaImg.src = this.captchaUrl +"?"+new Date().getTime();
            },
            //发送短信
            async getCode(){
                //进行倒计时
                //对于倒计时功能 只需要开启一个循环定时器
                clearInterval(this.timerId)
                this.times = 30;
                this.timerId = setInterval(()=>{
                    if(this.times>0)
                        this.times--
                    else
                        clearInterval(this.timerId)
                },1000)

                //获取验证码
                const body = await this.$http.login.getCode({
                    phone:this.phoneNumber
                })
                if(body.code === OK)
                    Toast.success("验证码发送成功")
                else if(body.code === ERROR)
                    Toast.fail("验证码发送失败")

                // this.times = 0;
            },
            //编程式路由
            goto(path){
                this.$router.replace(path)
                //this.$router.push    记录下来每一次push的位置 栈
                //this.$router.replace 不会记录每一次位置 每一次跳转都是覆盖
                //this.$router.back    回到上一个记录的位置
                //this.$router.go(1)    push
                //this.$router.go(-1)   back
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff
        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto
            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center
                .login_header_title
                    padding-top 40px
                    text-align center
                    >a
                        color #333
                        font-size 14px
                        padding-bottom 4px
                        &:first-child
                            margin-right 40px
                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774
            .login_content
                >form
                    >div
                        display none
                        &.on
                            display block
                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial
                            &:focus
                                border 1px solid #02a774
                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent
                                &.highLight
                                    color green
                                    font-weight 700
                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff
                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s,border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                &.off
                                    background #fff
                                    .switch_text
                                        float right
                                        color #ddd
                                &.on
                                    background #02a774
                                >.switch_circle
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                                    transition transform .3s
                                    &.right
                                        transform translateX(27px)
                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px
                            >a
                                color #02a774
                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0
                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999
            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px
                >.iconfont
                    font-size 20px
                    color #999
</style>