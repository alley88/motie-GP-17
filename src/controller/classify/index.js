import classifyView from "view/classify.art"

class Classify{
    constructor(){

    }
    init(){
      
      
    }
    render(){
       
        var html = classifyView();
        var container = $("<div class='container'></div>")
        container.append(html);
        $("#app").prepend(container)
       

    }
}

export default new Classify()