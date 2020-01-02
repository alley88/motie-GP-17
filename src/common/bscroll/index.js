import { throttle } from "utils/tool.js";


export default class BScroll {
    constructor(container, options) {
        this.container = $(container);
        this.content = this.container.children().eq(2);
        this.flag = true;
    }
    //上拉加载更多
    pullingDown(callback) {
        this.callback = callback;
        this.handleTouchStart();
    }
    pullingUp(callback, timeout) {
        this.container.on("scroll", this.handlePullingUpCb.bind(this, callback, timeout))
    }
    handlePullingUpCb(callback, timeout) {
        throttle(callback, timeout)
    }



    //下拉刷新
    handleTouchStart() {
        this.container.on("touchstart", this.handleTouchStartCb.bind(this ))
    }
    handleTouchStartCb(e) {
        e.stopPropagation();
        
        //记录手指按下的位置
        var touch = e.touches[0];
        this.disY = touch.pageY;
        //给元素添加动画
        this.container.css({
            transition: "transform .3s"
        })
        //调用手指移动事件和手指移开事件
        this.handleTouchMove();
        
    }
    //手指移动
    handleTouchMove() {
        this.handleTouchMoveCb = this.handleTouchMoveCb.bind(this)
        this.container.on("touchmove", this.handleTouchMoveCb)
    }
    handleTouchMoveCb(e) {
        e.stopPropagation();
        //获取移动的位置 和 差值 = 移动的位置 - 初始的位置
        var touch = e.touches[0];
        var moveY = touch.pageY;
        this.ih = moveY - this.disY;



        //改变container盒子的位置
        if (this.ih >= 0 && this.ih <= 200) {
            this.container.css({
                transform: "translateY(" + this.ih + "px)"
            })
            if(this.flag){
                this.handleTouchEnd();
                this.flag = false;
            }
        }

    }
    //手指移开事件
    handleTouchEnd() {
        this.handleTouchEndCb = this.handleTouchEndCb.bind(this);
        this.container.on("touchend", this.handleTouchEndCb)
    }
    handleTouchEndCb() {
            //用户需要做的事情
            this.callback()
            //将container回归到初始的位置
            this.container.css({
                transition: "transform .3s ease-in-out .8s",
                transform: "translateY(0)"
            })

            this.container.off("touchend", this.handleTouchEndCb);
            this.container.off("touchmove", this.handleTouchMoveCb)
            this.flag = true;
        }
}