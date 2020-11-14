const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate (operator, a, b){
    switch(operate){
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return "ERROR";
    }
}

function addNumberToDisplay(e){
    const pressedNumber = this.innerText;
    const displayHtml = document.querySelector(".calc-display");
    if (displayHtml.innerText == 0) displayHtml.innerText = pressedNumber;
    else displayHtml.innerText += pressedNumber.toString();
}

document.querySelectorAll(".number-btn").forEach(btn => btn.addEventListener("click", addNumberToDisplay));