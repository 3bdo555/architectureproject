var Name = document.getElementById("Name");
var Email = document.getElementById("Email");
var Password = document.getElementById("Password");
var error = document.getElementById("error");
var done = document.getElementById("done");
var SignUP = document.getElementById("SignUP");
var errorInput = document.getElementById("errorInput");
var validate = document.getElementById("validate");
SignUP.addEventListener('click', function () {
    signUP();
})

var Users = [];
if (localStorage.getItem("Users") != null) {
    Users = JSON.parse(localStorage.getItem("Users"));
}
function signUP() {
    var User = {
        name: Name.value,
        email: Email.value,
        password: Password.value
    }
    if (User.name == "" && User.email == "" && User.password == "") {
        errorInput.classList.replace("d-none", "d-block");
        setTimeout(function () {
            errorInput.classList.replace("d-block", "d-none");
        }, 3000);
        return false;
    } else if (Users.length == 0) {
        // return true;
        if (validateEmail(User)) {
            addToArray(User);
        } else {
            validate.classList.replace("d-none", "d-block");
            setTimeout(function () {
                validate.classList.replace("d-block", "d-none");
            }, 3000);
        }
    } else {
        for (let i = 0; i < Users.length; i++) {

            if (Users[i].email == User.email) {
                error.classList.remove("d-none");
                setTimeout(function () {
                    error.classList.add("d-none");
                }, 3000);
                return false;
            }
        }
        addToArray(User);
    }
    function addToArray(User) {
        Users.push(User);
        localStorage.setItem("Users", JSON.stringify(Users));
        done.classList.remove("d-none");
        setTimeout(function () {
            done.classList.add("d-none");
        }, 3000);
        resetValue()
    }
}
function validateEmail(User) {
    var regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (regex.test(User.email)) {
        return true;
    }
    return false;
}
function resetValue() {
    Email.value = "";
    Password.value = "";
    Name.value = "";
}