import classifyView from "view/classify.art"

class Classify{
    constructor(){

    }
    init(){
      
      
    }
    render(){
       
        var html = classifyView();
        $(".container").html(html);
       

    }
}

export default new Classify()