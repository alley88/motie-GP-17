import tabbarView from "view/tabbar.art";
import "styles/tabbar/index.scss";
class TabBar {
    constructor() {
        this.data = [
            {
                icon: "&#xe634;",
                text: "首页"
            },
            {
                icon: "&#xe66c;",
                text: "分类"
            },
            {
                icon: "&#xe60e;",
                text: "排行"
            },
            {
                icon: "&#xe63a;",
                text: "我的"
            }
        ],
        this.activeIndex = 0;
        this.router = window.router;
    }
    init() {
        this.render();
    }
    render() {

        var html = tabbarView({ data: this.data });
        $("#app").append(html)
        this.eachTabBar();
    }
    eachTabBar() {
        this.ali = $("#footer>ul li");
        var hash = window.location.hash.slice(1);
        switch(hash){
            case "/":
            this.activeIndex = 0;
            break;
            case "/classify":
            this.activeIndex = 1;
            break;
            case "/list":
            this.activeIndex = 2;
            break;
            case "/mine":
            this.activeIndex = 3;
            break;
        }

        this.ali.eq(this.activeIndex).addClass("active").siblings().removeClass("active");



        this.ali.each(this.eachTabBarCb.bind(this))
    }
    eachTabBarCb(index) {

        this.ali.eq(index).on("tap", this.handleTabBarTap.bind(this, index))
    }
    handleTabBarTap(index) {
        switch (index) {
            case 0:
                router.push("/");
                break;
            case 1:
                router.push("/classify");
                break;
            case 2:
                router.push("/list");
                break;
            case 3:
                router.push("/mine");
                break;
        }
        this.ali.eq(index).addClass("active").siblings().removeClass("active");
    }
}

export default new TabBar;