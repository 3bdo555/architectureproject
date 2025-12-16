var Email = document.getElementById("Email");
var Password = document.getElementById("Password");
var Login = document.getElementById("Login");
var EmailError = document.getElementById("EmailError");
var PasswordError = document.getElementById("PasswordError");
var FoundError = document.getElementById("FoundError");
var Users = [];
if (localStorage.getItem("Users") != null) {
    Users = JSON.parse(localStorage.getItem("Users"));
}
Login.addEventListener("click", function () {
    login()
})
var index ;
function login() {
    if(Email.value!=""&&Password.value!=""){
    if(Users.length==0){
        FoundError.classList.remove("d-none");
        setTimeout(function(){
            FoundError.classList.add("d-none");
        },3000);
    }
    for (var i = 0; i < Users.length; i++) {
        if (Email.value == Users[i].email && Password.value == Users[i].password) {
            index = i;
            localStorage.setItem("index",JSON.stringify(index));
            window.location = "UserPage.html";
        }
}}
}
