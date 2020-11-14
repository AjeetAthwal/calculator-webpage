function changeColor(e){
    if (this.style.color === "blue") this.removeAttribute("style");
    else this.style.color = "blue";
}

document.querySelector("h1").addEventListener("mouseover",changeColor);
document.querySelector("h1").addEventListener("mouseout",changeColor);