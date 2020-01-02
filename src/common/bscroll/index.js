import { throttle } from "utils/tool.js";


export default class BScroll {
    constructor(container, options) {
        this.container = $(container);
        this.content = this.container.children().eq(2);
    }
    //上拉加载更多
    pullingDown(callback) {
        this.handleTouchStart(callback);
    }
    pullingUp(callback, timeout) {
        this.container.on("scroll", this.handlePullingUpCb.bind(this, callback, timeout))
    }
    handlePullingUpCb(callback, timeout) {
        throttle(callback, timeout)
    }



    //下拉刷新
    handleTouchStart(callback) {
        this.container.on("touchstart", this.handleTouchStartCb.bind(this, callback))
    }
    handleTouchStartCb(callback, e) {
        //记录手指按下的位置
        var touch = e.touches[0];
        this.disY = touch.pageY;
        //给元素添加动画
        this.container.css({
            transition: "transform .3s"
        })
        //调用手指移动事件和手指移开事件
        this.handleTouchMove();
        this.handleTouchEnd(callback);
    }
    //手指移动
    handleTouchMove() {
        this.handleTouchMoveCb = this.handleTouchMoveCb.bind(this, )
        this.container.on("touchmove", this.handleTouchMoveCb)
    }
    handleTouchMoveCb(e) {
        //获取移动的位置 和 差值 = 移动的位置 - 初始的位置
        var touch = e.touches[0];
        var moveY = touch.pageY;
        this.ih = moveY - this.disY;


        //为了防止下拉刷新和上拉记载的事件冲突  scrollTop如果为正直则上拉加载  如果为负值则下拉刷新
        if (this.container.scrollTop() <= 0) {
            //改变container盒子的位置
            if (this.ih >= 0 && this.ih <= 200) {
                this.container.css({
                    transform: "translateY(" + this.ih + "px)"
                })
            }
        }
    }
    //手指移开事件
    handleTouchEnd(callback) {
        this.handleTouchEndCb = this.handleTouchEndCb.bind(this, callback);
        this.container.one("touchend", this.handleTouchEndCb)
    }
    handleTouchEndCb(callback) {
        //为了防止下拉刷新和上拉记载的事件冲突  scrollTop如果为正直则上拉加载  如果为负值则下拉刷新
        if (this.container.scrollTop() <= 0) {
            //用户需要做的事情
            callback()

            //将container回归到初始的位置
            this.container.css({
                transition: "transform .3s ease-in-out .8s",
                transform: "translateY(0)"
            })

            this.container.off("touchend", this.handleTouchEndCb);
            this.container.off("touchmove", this.handleTouchMoveCb)
        }
    }




}