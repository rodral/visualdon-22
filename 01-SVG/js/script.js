function domForEach(selector, callback) {
    document.querySelectorAll(selector).forEach(callback);
}

function domOn(selector, event, callback) {
    domForEach(selector, ele => ele.addEventListener(event, callback));
  }

domOn(".rectangle","click",evt=>{
    console.log(evt.target);        //evt.target : objet sur lequel l'evenement a lieu
    
    let rectangle = evt.target;
    
    let color = rectangle.getAttribute("fill");
    rectangle.setAttribute("fill", color == "green" ? "red" : "green");
})

domOn(".donut","mouseover",evt=>{
    console.log(evt.target);        //evt.target : objet sur lequel l'evenement a lieu
    
    let donut = evt.target
    let bigger = donut.getAttribute("r");
    donut.setAttribute("r", "70");
})

domOn(".donut", "mouseout", evt => {
    console.log(evt.target);        //evt.target : objet sur lequel l'evenement a lieu
    
    let donut = evt.target
    let smaller = donut.getAttribute("r");
    donut.setAttribute("r", "50");
})  