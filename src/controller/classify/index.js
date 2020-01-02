import classifyView from "view/classify.art"
import booksListView from "view/booksList.art"
import { categoryApi, booksListApi } from "api/classify.js"
import BScroll from "../../common/bscroll/index.js"
import "styles/classify/index.scss";
class Classify {
    constructor() {
        this.group = 1;
        this.booksListData = [];
        this.status = "down"
        this.sortData = {
            // 价格
            free: 0,
            //状态
            finish: 1,
            //频道
            group: 1,
            //书籍分类
            sortId: "",
            // 当前页数
            page: 1,
            //每页显示的条目数
            pageSize: 10,
        }
    }
    async render() {
        let data = await categoryApi(this.group);

        var html = classifyView({ menus: data.data.firstSorts[0].secondSorts });
        var container = $("<div class='container'></div>");
        var booksList = $("<div class='booksList'></div>");
        container.append(html);
        container.append(booksList)
        $("#app").prepend(container);
        //渲染书籍列表
        this.booksListRender();


        this.menuToggle();
        this.menusEach();
        this.scroll();

    }
    async booksListRender() {
        let data = await booksListApi(this.sortData);
        /*
            根据状态值做下拉刷新和上拉加载  因为上拉加载更多其实是将之前的数据与新增的数据进行相拼接
            而下拉刷新是将数据进行了重新的赋值
        
        */

        if (this.status == "down") {
            this.booksListData = data.data.bookList;
        } else if (this.status == "up") {
            this.booksListData = [...this.booksListData, ...data.data.bookList];
        }
        var html = booksListView({ data: this.booksListData });
        $(".booksList").html(html);
        this.booksDetail();
    }

    //上拉加载更多和下拉刷新事件
    scroll() {
        this.scroll = new BScroll(".container");

        this.scroll.pullingUp(this.handleBooksListMore.bind(this), 300);

        this.scroll.pullingDown(this.handleBooksListDown.bind(this))
    }

    //下拉刷新
    handleBooksListDown() {
        this.status = "down";
        var arr = [1000010, 1000011, 1000012, 1000013, 1000014, 1000015];
        this.sortData.sortId = arr[parseInt(Math.random() * 7)];
        this.booksListRender();

    }
    //上拉加载更多
    handleBooksListMore() {
        // console.log( $(".container")[0].scrollHeight ,$(".container").scrollTop())
        if ($(".container")[0].scrollHeight - $(".container").scrollTop() < 700) {
            this.status = "up"
            this.sortData.page++;
            this.booksListRender();
        }
    }
    //点击导航展开
    menuToggle() {
        $(".sort-list_down").on("tap", this.handlemenuToggle.bind(this))
    }
    handlemenuToggle() {
        $(".classify-sort>div").eq(1).toggleClass("sort-down");
    }
    menusEach() {
        this.sortList = $(".sort-list");
        this.sortList.each(this.handleMenuEach.bind(this))
    }
    handleMenuEach(index) {
        this.sortList.eq(index).find("div").each(this.handleSortListChildren.bind(this, index))
    }
    handleSortListChildren(parentIndex, index) {
        this.sortList.eq(parentIndex).find("div").eq(index).on("tap", this.handleMenuClickCb.bind(this, parentIndex, index))
    }
    handleMenuClickCb(parentIndex, index) {
        let attr = this.getAttr(this.sortList.eq(parentIndex).find("div").eq(index)[0].attributes);
        this.sortList.eq(parentIndex).find("div").eq(index).addClass("sort-active").siblings().removeClass("sort-active")
        switch (attr.key) {
            case "data-group":
                this.sortData.group = attr.value;
                break;
            case "data-sortid":
                this.sortData.sortId = attr.value;
                break;
            case "data-finish":
                this.sortData.finish = attr.value;
                break;
            case "data-free":
                this.sortData.free = attr.value;
                break;
        }


        this.booksListRender();

    }
    getAttr(attrs) {
        var arr = Array.from(attrs);
        for (var i = 0; i < arr.length; i++) {
            if (/data-.*/.test(arr[i].name)) {
                return {
                    key: arr[i].name,
                    value: arr[i].nodeValue
                }
            }
        }
    }
    booksDetail() {
        $(".booksList-item").each(this.handleBooksListItemCb.bind(this))
    }
    handleBooksListItemCb(index) {
        $(".booksList-item").eq(index).on("tap", this.handleBooksListItemID.bind(this, index))
    }
    handleBooksListItemID(index) {
        var id = $(".booksList-item").eq(index).attr("data-id");

        router.push("/detail?id=" + id);
    }
}

export default new Classify()