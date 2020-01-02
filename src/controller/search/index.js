import searchView from "view/search.art";
import "styles/search/index.scss"
class Search {
    constructor() {

    }
    render() {
        var arr = JSON.parse(window.localStorage.getItem("searchList")) || []
        var html = searchView({ data:arr });
        var container = $("<div class='container'></div>")
        container.append(html);
        $("#app").prepend(container)


        this.search();
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

                    if(arr.length>=9){
                        arr.shift();
                    }
                    arr.push(val);
                }
                window.localStorage.setItem("searchList", JSON.stringify(arr));
            }
        }

    }
}

export default new Search