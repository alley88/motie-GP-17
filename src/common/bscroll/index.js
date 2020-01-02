import { throttle } from "utils/tool.js";


export default class BScroll {
    constructor(container, options) {
        this.container = $(container);
        this.content = this.container.children().eq(2);

    }
    pullingDown(callback) {
        this.handleTouchStart(callback);
    }
    pullingUp(callback, timeout) {
        this.container.on("scroll", this.handlePullingUpCb.bind(this, callback, timeout))
    }
    handlePullingUpCb(callback, timeout) {
        throttle(callback, timeout)
    }

    handleTouchStart(callback) {
        this.container.on("touchstart", this.handleTouchStartCb.bind(this, callback))
    }
    handleTouchStartCb(callback, e) {
        var touch = e.touches[0];
        this.disY = touch.pageY;
        this.container.css({
            transition: "transform .3s"
        })

        this.handleTouchMove();
        this.handleTouchEnd(callback);
    }
    handleTouchMove() {
        this.handleTouchMoveCb = this.handleTouchMoveCb.bind(this, )
        this.container.on("touchmove", this.handleTouchMoveCb)
    }
    handleTouchMoveCb(e) {
        var touch = e.touches[0];
        var moveY = touch.pageY;
        this.ih = moveY - this.disY;


        if (this.ih >= 0 && this.ih <= 200) {
            this.container.css({
                transform: "translateY(" + this.ih + "px)"
            })
        }
    }
    handleTouchEnd(callback) {
        this.handleTouchEndCb = this.handleTouchEndCb.bind(this, callback);
        this.container.one("touchend", this.handleTouchEndCb)
    }
    handleTouchEndCb(callback) {

        callback()
        this.container.css({
            transition: "transform .3s ease-in-out .8s",
            transform: "translateY(0)"
        })

        this.container.off("touchend", this.handleTouchEndCb);
        this.container.off("touchmove", this.handleTouchMoveCb)
    }



}