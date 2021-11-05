





//Globale variabele
let button, form, email, text, eventButton;






//Button event


const listenToClickEventButton = function () {
    eventButton.addEventListener('click', prevent);
}


function prevent() {
    eventButton.preventDefault();
}


const listenToClickButton = function () {
    button.addEventListener('click', changeText);
}

function changeText() {

    emailForm.value.innerHTML = "";

}

//DOM
const getDOMElements = function () {
    button = document.querySelector('.c-button');
    eventButton = document.getElementById("eventButton");
    email = document.querySelector('.c-input').value;
    emailForm = document.querySelector('.c-input');

    form = document.querySelector(".form");



    if (email.match(pattern)) {
        form.classList.add("valid");
        form.classList.remove("invalid");
        text.innerHTML = "Your email adress is valid";
        text.style.color = "#107E0C";

    }
    else {
        form.classList.remove("valid");
        form.classList.add("invalid");
        text.innerHTML = "Please enter a valid email adress";
        text.style.color = "#ff5b00";
        input.style.borderColor = "#ff5b00";
        button.style.backgroundColor = "gray"


        if (email == "") {
            form.classList.remove("valid");
            form.classList.add("invalid");
            text.innerHTML = "";
            text.style.color = "#ff5b00";
        }
    }


}







document.addEventListener("DOMContentLoaded", function () {
    //check of de pagina juist laadt
    console.log("DOM loaded")


    getDOMElements();

    listenToClickButton();
    validation()


})