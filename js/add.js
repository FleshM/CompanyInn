const form = document.querySelector(".add");
const businessName = document.querySelector(".add__input");
const industry = document.querySelector(".add__select");
const presence = document.querySelector(".add__checkbox-box");
const msg = document.querySelector(".add__msg");

const addPage = async () => {
    checkAuthorization();
    addCompany();
}

function checkAuthorization() {
    if (localStorage.getItem('loginStatus') !== 'true') {
        window.location.href = '/index.html';
    }
}

function addCompany() {
    form.addEventListener("submit", e => {
        e.preventDefault();
        if (businessName.value.replace(/ /g, '').length === 0) {
            msg.textContent = "Название не может состоять из пробелов ❗";
        }
        else {
            let company = JSON.stringify({
                'business_name': businessName.value.trim(),
                'industry': industry.value,
                'presence': presence.checked
            })
            form.reset();
            console.log(company)
            window.location.href = '/companies.html';
        }
    });
}

addPage();