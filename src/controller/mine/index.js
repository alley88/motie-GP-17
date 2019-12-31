import mineView from "view/mine.art"

class Mine{
    constructor(){

    }
    init(){
      
      
    }
    render(){
        
        var html = mineView();
        var container = $("<div class='container'></div>")
        container.append(html);
        $("#app").prepend(container)
       

    }
}

export default new Mine()