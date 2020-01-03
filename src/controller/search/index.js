import searchView from "view/search.art";
import "styles/search/index.scss"
import {searchApi} from "api/search.js"
import searchListView from "view/search-list.art";
class Search {
    constructor() {
        this.searchData = {
            word:"",
            pageNo:1,
            pageSize:10
        }
    }
    render() {
        var arr = JSON.parse(window.localStorage.getItem("searchList")) || []
        var html = searchView({ data:arr });
        var container = $("<div class='container'></div>")
        container.append(html);
        $("#app").prepend(container)


        this.search();
        this.clearTap();
        this.RecordTap();
        this.searchBack();
    }
    search() {
        $(".search-input").on("keydown", this.handleSearchCb.bind(this))
    }
    handleSearchCb(e) {
        if (e.keyCode == 13) {
            let val = $(".search-input").val();
            if (val) {
                if (!window.localStorage.getItem("searchList")) {
                    var arr = [];
                    arr.push(val);
                } else {
                    var arr = JSON.parse(window.localStorage.getItem("searchList"));
                    var flag = arr.includes(val);
                    if(!flag){
                        if(arr.length>=9){
                            arr.shift();
                        }
                        arr.push(val);
                    }
                }
                window.localStorage.setItem("searchList", JSON.stringify(arr));

                this.searchData.word = val;
                this.searchBookList(this.searchData);
                
            }
        }
    }
   async searchBookList(data){
        let booksdata = await searchApi({...data});
      
        let html = searchListView({data:booksdata.data.bookList});
        $(".Record").remove();
        $(".search-list").html(html);
        this.searchBookListDes();
    }
    searchBookListDes(){
       
        this.searchListItem =$(".search-list-item");
        
        this.searchListItem.each(this.handleSearchListItmeEach.bind(this))
    }
    handleSearchListItmeEach(index){
       
        this.searchListItem.eq(index).on("tap",this.handleSearchListItemCb.bind(this,index))
    }
    handleSearchListItemCb(index){
        var id = this.searchListItem.eq(index).attr("data-id");
        router.push("/detail?id="+id)
    }
    clearTap(){
        $(".clear").on("tap",this.handleClearcb.bind(this))
    }
    handleClearcb(){
        window.localStorage.removeItem("searchList");
        $(".Record-b").html("");
    }
    RecordTap(){
        $(".Record-b>div").each(this.handleRecordEach.bind(this))
    }
    handleRecordEach(index){
        $(".Record-b>div").eq(index).on("tap",this.handleRecordCb.bind(this,index))
    }
    handleRecordCb(index){
        var val =  $(".Record-b>div").eq(index).text();
        this.searchData.word = val;
        this.searchBookList(this.searchData)
    }
    searchBack(){
        $(".back").on("tap",this.handleSearchBackCb.bind(this))
    }
    handleSearchBackCb(){
        router.back();
    }
}

export default new Search