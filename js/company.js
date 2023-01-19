var myMap;
const businessName = document.querySelector('.about__name');
const catchPhrase = document.querySelector('.about__catchphrase');
const industry = document.querySelector('.about__industry');
const type = document.querySelector('.about__type');
const number = document.getElementById('number');
const logo = document.querySelector('.about__logo');
const address = document.querySelector('.about__address');

const companyPage = async () => {
    checkAuthorization()
    getCompany();
    clearStorage();
}

function checkAuthorization() {
    if (localStorage.getItem('loginStatus') !== 'true') {
        window.location.href = '/index.html';
    }
}

function getCompany() {
    let id = localStorage.getItem('companyId');
    let companies = JSON.parse(localStorage.getItem('companies'));
    if (id !== null) {
        for (let i in companies) {
            if (companies[i]['id'] == id) {
                showCompany(companies[i]);
            }
        }
    }
    else {
        window.location.href = '/companies.html';
    }
}

function showCompany(company) {
    document.title = company['business_name'];
    businessName.textContent = company['business_name'];
    catchPhrase.textContent = `"${company['catch_phrase']}"`;
    industry.textContent = company['industry'];
    type.textContent = company['type'];
    number.textContent = company['phone_number'];
    address.textContent = company['full_address'];
    logo.src = company['logo']
    showMap(company['latitude'], company['longitude']);
}

function showMap(lat, lon) {
    ymaps.ready(function () {
        myMap = new ymaps.Map('map', {
            center: [lat, lon],
            zoom: 10
        }, {
            searchControlProvider: 'yandex#search'
        });
        myMap.geoObjects
            .add(new ymaps.Placemark([lat, lon], {
            }, {
                preset: 'islands#dotIcon',
                iconColor: 'red'
            }))
        }
    );
}

function clearStorage() {
    let links = document.getElementsByTagName("a");
    for (let i in links) {
        links[i].addEventListener('click', e => {
            localStorage.removeItem('companyId')
        });
    }
}

companyPage();