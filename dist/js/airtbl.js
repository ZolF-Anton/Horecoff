let apparatus = null;
let techs = null;

async function getApparatus() {
    const response = await fetch(
        'https://api.airtable.com/v0/apprCw7umxngG9qrn/apparatus?api_key=keynsSvk5hddjKVav'
    );

    const json = await response.json();

    apparatus = json;
}

async function getTechs() {
    const response = await fetch(
        'https://api.airtable.com/v0/apprCw7umxngG9qrn/techs?api_key=keynsSvk5hddjKVav'
    );

    const json = await response.json();

    techs = json;
}

function mapApparatus() {
    // 	тут перебираем аппараты и добавляем характеристики

    cloneGearDivs(apparatus); // Перебор массива//////////////////////////////////////////
    //cloneGearDivs(techs); // Перебор массива///////////////////////////////////////////
}

function cloneGearDivs(geck) {
    const gliderDiv = document.querySelector('.glider-track');
    const gear1 = document.querySelector('div.gears-wrap._desktop');
    const gearS = document.querySelectorAll('.gears-wrap');
    const count = geck.records.length;
    for (let i = 0; i < count; i++) {
        let el = gearS[i];
        el.classList.remove('disabled');
        gliderDiv.appendChild(gear1.cloneNode(true));
        el.classList.remove('disabled');
    }

    createGearItems();
}

function createGearItems() {
    const gearItemFront = document.querySelectorAll('.gears-item-front');
    const gearName = document.querySelectorAll('.gears-item-front > .gears-name');
    const gearPhoto = document.querySelectorAll('.gears-pic > img');
    const count = apparatus.records.length;
    ///Создаём счётчик по кол-ву записей
    for (let i = 0; i < count; i++) {
        const appRec = apparatus.records[i];
        /////////////Присваиваем div'ам  data-id = id кофемашины//////
        gearItemFront[i].setAttribute('data-id', appRec.id);
        ///////////Сравниваем по ID от той ли кофемашины параметры
        if (gearItemFront[i].dataset.id === appRec.id) {
            gearName[i].textContent = appRec.fields.Name;
            console.log(gearItemFront[i].dataset.id);
            //////Проверяем объект на существование/////
            if (
                Array.isArray(appRec.fields.Photo) &&
                typeof appRec.fields.Photo[0].url === 'string'
            ) {
                /////Вставляем изображение кофемашины
                gearPhoto[i].src = appRec.fields.Photo[0].url;
            } else {
                console.log('Error no Photo');
            }
        }
    }
}

function onBtnInfo() {
    const btnInfo = document.querySelectorAll('.btn_info');

    [...btnInfo].forEach((btnInfo) =>
        btnInfo.addEventListener('click', () => {
            gearItem = btnInfo.closest('div[data-id]');
            console.log(btnInfo.closest('div[data-id]'));
        })
    );
}

/////////////Ф-я запуска модального окно с любой кнопки
function modalWindowOpen() {
    console.log(document.querySelectorAll('.btn_info').length);
    let popupLinks = document.querySelectorAll('.btn_info');
    for (let btnModal of popupLinks) {
        btnModal.addEventListener('click', () => {
            const currentPopup = document.getElementById('popup');

            popupOpen(currentPopup);
            fillModalWindow('rec9baWckBQLZTXf9'); /////////////Заменить на .closest('div[data-id]
        });
    }
}

function fillModalWindow(idGear) {
    console.log('PopUp  working', idGear);
    const popUp = document.querySelector('.popup');

    for (let i = 0; i < techs.records.length; i++) {
        const appId = techs.records[i].fields.apparatus[0];
        const techsRec = techs.records[i];

        if (idGear === appId) {
            console.log(techs.records[i].fields.Name);
            if (techs.records[0].fields.Name === 'Максимальное давление') {
                let popupTechWrap = document.querySelector('.popup__tech_wrap');
                let popupTechItem = popupTechWrap.insertAdjacentHTML(
                    '',
                    '<div class="popup__tech_item"><div class="popup__tech_name _maxpresure">Максимальное давление</div><div class="popup__tech_num _maxpresure_sub">15 Бар</div></div>'
                );
            }
        }
    }
}

getApparatus().then(getTechs).then(mapApparatus); ////////////////////////////////////
setTimeout(() => {
    modalWindowOpen();
    console.log('Заменить Таймер на промис/async');
}, 2000);
