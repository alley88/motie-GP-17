import detailView from "view/detail.art";
import "styles/detail/index.scss";
import { detailApi } from "api/home.js"
class Detail {
    constructor() {

    }
    async render() {
        let {id} = router.$route.query;
        let data = await detailApi(id);

        var html = detailView({data:data.data});
        var container = $("<div class='container'></div>")
        container.html(html);
        $("#app").prepend(container);
        this.back()
    }
    back(){
        $(".back").on("tap",this.handleBackCb.bind(this))
    }
    handleBackCb(){
        window.router.back();
    }
}


export default new Detail;