const list = document.querySelector(".companies");
const nameBtn = document.getElementById('business_name');
const industryBtn = document.getElementById('industry');
const typeBtn = document.getElementById('type');
const moreBtn = document.querySelector(".more__button");
let sortParam = 'business_name';

const companiesPage = async () => {
    checkAuthorization();
    getCompanies();
    updateCompanies();
    sortParams();
    getMore();
}

function checkAuthorization() {
    if (localStorage.getItem('loginStatus') !== 'true') {
        window.location.href = '/index.html';
    }
}

function getCompanies() {
    let companies = JSON.parse(localStorage.getItem('companies'));
    if (companies === null) {
        companies = []
        fetch(`https://random-data-api.com/api/company/random_company?size=5`)
            .then(response => response.json())
            .then(data => {
                for (let i in data) {
                    companies.push(data[i]);
                }
                localStorage.setItem('companies', JSON.stringify(companies));
                addCompanies(companies, sortParam);
                moreBtn.style.display = 'block';
            });
    }
    else {
        addCompanies(companies, sortParam)
        moreBtn.style.display = 'block';
    }
}

function addCompanies(companies, param) {
    companies = sortCompanies(companies, param);
    for (let i in companies) {
        const company = document.createElement("li");
        company.classList.add("companies__company");
        company.innerHTML = `
            <div class="companies__wrapper">
                <a href="/companies/company.html" class="companies__name" id="${companies[i].id}">${companies[i].business_name}</a>
                <img class="companies__logo" src="${companies[i].logo}" alt="Логотип ${companies[i].business_name}">
            </div>
            <p class="companies__industry">${companies[i].industry}</p>
            <p class="companies__type">${companies[i].type}</p>`;
        list.appendChild(company);
        let button = document.getElementById(`${companies[i].id}`)
        button.addEventListener("click", e => {
            localStorage.setItem('companyId', button.id)
        });
    }
}

function sortCompanies(companies, param) {
    companies.sort((a, b) => a[param] > b[param] ? 1 : -1)
    return companies;
}

function updateCompanies() {
    let button = document.getElementById('update');
    button.addEventListener("click", e => {
        moreBtn.style.display = 'none';
        list.innerHTML = '';
        localStorage.removeItem('companies')
        localStorage.removeItem('companyId')
        getCompanies();
    });
}

function sortParams() {
    let buttons = [nameBtn, industryBtn, typeBtn]
    buttons.forEach(btn => {
        btn.addEventListener("click", e => {
            let companies = JSON.parse(localStorage.getItem('companies'))
            nameBtn.className = 'interface__param'
            industryBtn.className = 'interface__param'
            typeBtn.className = 'interface__param'
            btn.className = 'interface__param-active'
            list.innerHTML = '';
            sortParam = btn.id;
            addCompanies(companies, sortParam)
        });
    });
}

function getMore() {
    moreBtn.addEventListener("click", e => { 
        let companies = JSON.parse(localStorage.getItem('companies'));
        fetch(`https://random-data-api.com/api/company/random_company?size=5`)
            .then(response => response.json())
            .then(data => {
                for (let i in data) {
                    companies.push(data[i]);
                }
                localStorage.setItem('companies', JSON.stringify(companies));
                list.innerHTML = '';
                addCompanies(companies, sortParam);
            });
    });
}

companiesPage()