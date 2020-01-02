import classifyView from "view/classify.art"
import booksListView from "view/booksList.art"
import { categoryApi,booksListApi} from "api/classify.js"
import "styles/classify/index.scss";
class Classify {
    constructor() {
        this.group = 1;
        this.sortData = {
            // 价格
            free: 0,
            //状态
            finish: 1,
            //频道
            group: 1,
            //书籍分类
            sortId:"",
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
    }
    async booksListRender(){
        let data = await booksListApi(this.sortData);
        var html = booksListView({data:data.data.bookList});
        $(".booksList").html(html);
    }
    //点击导航展开
    menuToggle() {
        $(".sort-list_down").on("click", this.handlemenuToggle.bind(this))
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
        this.sortList.eq(parentIndex).find("div").eq(index).on("click", this.handleMenuClickCb.bind(this, parentIndex, index))
    }
    handleMenuClickCb(parentIndex, index) {
        let attr = this.getAttr(this.sortList.eq(parentIndex).find("div").eq(index)[0].attributes);

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
}

export default new Classify()