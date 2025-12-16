var Users = [];
if (localStorage.getItem("Users") != null) {
    Users = JSON.parse(localStorage.getItem("Users"));
}
var index;
if (localStorage.getItem("index") != null) {
    index = +localStorage.getItem("index");
}
document.getElementById("input").innerHTML = `<h1 class="text-warring text-center w-100 fs-2 fw-bold">Welcome ${Users[index].name}</h1>`

