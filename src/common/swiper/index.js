export default class Swiper {
    constructor(container) {
        this.container = $(container);
        this.ul = $(container + ' ul');
        this.ali = $(container + ' ul li');
        this.iw = this.ali.eq(0).width();
        this.iNow = 0;
        this.len = 0;
        this.timer = null;

        this.init();
    }
    init() {
        var li = this.ali.eq(0).clone(true);
        this.ul.append(li);
        this.len = this.container.find("ul li").length;
        this.ul.css({
            width: this.len * this.iw
        })

        this.autoplay();
        this.handleTouchStart();
        this.handleTouchMove();
        this.handleTouchEnd();
    }
    handleTouchStart() {
        this.ul.on("touchstart", this.handleTouchstartCb.bind(this))
    }
    handleTouchstartCb(e) {
        clearInterval(this.timer);
        this.disX = e.targetTouches[0].clientX;

    }
    handleTouchMove() {
        this.ul.on("touchmove", this.handleTouchMoveCb.bind(this))
    }
    handleTouchMoveCb(e) {
        this.moveX = e.targetTouches[0].clientX;
        //左滑负值  右滑正直
        this.distanceX = this.moveX - this.disX;
        //先关闭动画
        this.ul.css({
            transition: "none"
        })

        if (this.iNow == 0 && this.distanceX > 0) {
            this.ul.css({
                left: -(this.len - 1) * this.iw + this.distanceX
            })
        } else if (this.iNow == this.len - 1 && this.distanceX < 0) {
            this.ul.css({
                left: this.distanceX
            })
        } else {
            this.ul.css({
                left: -(this.iNow * this.iw) + this.distanceX
            })
        }


    }
    handleTouchEnd() {
        this.ul.on("touchend",this.handleTouchEndCb.bind(this))
    }
    handleTouchEndCb(e){
        this.ul.css({
            transition:"none"
        })

        if(Math.abs(this.distanceX)> this.iw*1/3){
          
            //滑动
            if(this.distanceX>0 && this.iNow == 0){
              
                this.iNow = this.len - 2;
            }else if(this.distanceX<0 && this.iNow == this.len-1){
               
                this.iNow = 1;
            }else{
                if(this.distanceX >0){
                    if(this.iNow == 0){
                        this.iNow = this.len - 2;
                        this.ul.css({
                            transition: "none",
                            left:-(this.len-1)*this.iw
                        })
                    }else{
                        this.iNow--
                    }
                    
                }else if(this.distanceX <0){
                    if (this.iNow == this.len - 1) {
                        this.iNow = 1;
                        this.ul.css({
                            transition: "none",
                            left: 0,
                        })
                    } else {
                        this.iNow++;
                    }
                }
            }
            
        }else{
          
            //回弹
            if(this.distanceX>0 && this.iNow == 0){
                this.ul.css({
                    left:0
                })
            }else if(this.distanceX<0 && this.iNow == this.len-1){
                this.ul.css({
                    left:-(this.len-1)*this.iw
                })
            }else{
                this.ul.css({
                    left:-(this.iNow)*this.iw
                })
            }
        }

        setTimeout(()=>{
            this.toImg();
            this.autoplay();
        })
    }
    autoplay() {
        this.timer = setInterval(() => {
            if (this.iNow == this.len - 1) {
                this.iNow = 1;
                this.ul.css({
                    transition: "none",
                    left: 0,
                })
            } else {
                this.iNow++;
            }

            setTimeout(() => {
                this.toImg();
            })
        }, 3000)
    }
    toImg() {
        // this.ul[0].style.transition = "left .3s ease-in-out";
        // this.ul[0].style.left = -this.iNow * this.iw + 'px';

        this.ul.css({
            transition: "left .3s ease-in-out",
            left: -this.iNow * this.iw
        })
    }

}


