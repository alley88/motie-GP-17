import listView from "view/list.art"
import listBooksView from "view/listBooks.art";
import { listBookApi } from "api/list.js"
import "styles/list/index.scss";
class List {
    constructor() {
        this.listData = {
            rankType: 9,
            sex: 1,
            pageNo: 1,
            siteId: 99,
            timeLimit: 4,
            group: 1,
            pageSize: 10,
        }
        this.listBook = [];

    }
    async render() {
        let data = await listBookApi(this.listData);
        this.listBook = data.data.bookList;
        var html = listView({ data: data.data.rank });
        var container = $("<div class='container'></div>")
        container.append(html);
        $("#app").prepend(container)
        this.sliderBar();
        this.listBooksRander(this.listBook)
        
    }
    sliderBar(){
        this.sliderBarElement = $(".list-slideBar>div");

        this.sliderBarElement.each(this.handleSliderBarEach.bind(this))
    }
    handleSliderBarEach(index){
        this.sliderBarElement.eq(index).on("tap",this.handleSliderBarElementCb.bind(this,index))
    }
   async handleSliderBarElementCb(index){
        this.sliderBarElement.eq(index).addClass("active").siblings().removeClass("active"); 
        var id =  this.sliderBarElement.eq(index).data("ranktype");
        this.listData.rankType = id;

        let data = await listBookApi(this.listData);
        this.listBook = data.data.bookList;
        this.listBooksRander(this.listBook)
    }
    listBooksRander(data){
        var html = listBooksView({data});
        $(".list-books").html(html);
        this.listBooksDetail();
    }
    listBooksDetail(){
        this.booksListItme = $(".list-booksListItme");
        this.booksListItme.each(this.handleBooksListItemEach.bind(this))
    }
    handleBooksListItemEach(index){
        this.booksListItme.eq(index).on("tap",this.handleBooksListItemCb.bind(this,index))
    }
    handleBooksListItemCb(index){
        var id = this.booksListItme.eq(index).data("id");
       router.push("/detail?id="+id);
    }
}

export default new List()