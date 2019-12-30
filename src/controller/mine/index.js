import mineView from "view/mine.art"

class Mine{
    constructor(){

    }
    init(){
      
      
    }
    render(){
        
        var html = mineView();
        $(".container").html(html);
       

    }
}

export default new Mine()