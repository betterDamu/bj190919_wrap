<template>
    <!--class : "stars stars-24"-->
    <!--class : "stars stars-36"-->
    <!--class : "stars stars-48"-->
    <div class="stars" :class="`stars-${size}`">
        <div class="star" v-for="item in classNames" :class="item" :style="{marginRight:MR+`px!important`}"></div>
    </div>
</template>

<script>
    const ON = "on";
    const HALF = "half";
    const OFF = "off";
    const LENGTH = 5;
    export default {
        name: "ele-stars",
        props:{
            size:Number,
            score:Number,
            MR:Number
        },
        computed:{
            classNames(){
                //根据分数 去 生成一个 class的数组
                let arr = [];
                // 没有满0.5   ---> 给暗星
                // 满0.5      ---> 给半星
                // 满1.0      ---> 给全星

                const score = Math.floor(this.score * 2)/2;

                //当前这个分数 需不需要半星
                const needHalf = (score % 1) === 0 ? false : true;
                //当前这个分数需要多少满星
                const fullStar =  Math.floor(score);

                for(let i=0;i<fullStar;i++){
                    if(arr.length===LENGTH)
                        break
                    arr.push(ON)
                }

                needHalf?arr.push(HALF):"";

                //当前这个分数需要多少个暗星
                while(arr.length < LENGTH){
                    arr.push(OFF)
                }


                return arr;
            }
        }
    }
</script>

<style scoped lang="stylus">
    /*.stars .star*/
    /*.stars.stars-24 .star*/
    /*按照分数去设计一个数组:["on","half","off","off","off"]*/
    @import "../../common/stylus/mixins.styl"
    .stars
        display inline-flex
        .star   //相当于任意尺寸星星的公共样式
            background-size 100% 100%
            background-repeat no-repeat
        &.stars-24
            .star //尺寸为24星星的公共样式
                width 10px
                height 10px
                margin-right 10px
                &:last-child
                    margin-right 0
                &.on
                    bg-image(star24_on)
                &.half
                    bg-image(star24_half)
                &.off
                    bg-image(star24_off)
        &.stars-36
            .star //尺寸为36星星的公共样式
                width 15px
                height 15px
                margin-right 15px
                &:last-child
                    margin-right 0
                &.on
                    bg-image(star36_on)
                &.half
                    bg-image(star36_half)
                &.off
                    bg-image(star36_off)
        &.stars-48
            .star //尺寸为48星星的公共样式
                width 20px
                height 20px
                margin-right 20px
                &:last-child
                    margin-right 0
                &.on
                    bg-image(star48_on)
                &.half
                    bg-image(star48_half)
                &.off
                    bg-image(star48_off)


</style>