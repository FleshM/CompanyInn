const form = document.querySelector(".registration");
const login = document.getElementById("login");
const password = document.getElementById("password");
const msg = document.querySelector(".registration__msg");


const registration = async () => {
    checkAuthorization();
    registerUser();
}

function registerUser() {
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (/\s/g.test(login.value) || /\s/g.test(password.value)) {
            msg.textContent = "Логин или пароль не могут содержать пробелы ❗";
        }
        else {
            localStorage.setItem("user", JSON.stringify({'login': login.value, 'password': password.value}));
            localStorage.setItem("loginStatus", true);
            window.location.href = '/companies.html';
            msg.textContent = "";
            form.reset();
        }
    });
}

function checkAuthorization() {
    if (localStorage.getItem('loginStatus') === 'true') {
        window.location.href = '/companies.html';
    }
}

registration()