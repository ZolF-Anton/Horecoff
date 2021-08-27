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

    cloneGearTemplates(apparatus);
    //cloneGearDivs(techs); // Перебор массива///////////////////////////////////////////
    createGearItems();
    glider.refresh(true);
}

function cloneGearTemplates(apparatusArr) {
    const gliderDiv = document.querySelector('.glider-track');
    const count = apparatusArr.records.length;
    const template = document.querySelector('#gearsTemp');
    for (let i = 0; i < count; i++) {
        gliderDiv.append(template.content.cloneNode(true));
    }
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

/////////////Ф-я запуска модального окно с любой кнопки
function openModalWindow() {
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
    let iEl = 0;
    let iFor = 0;
    let gearNameArr = [];
    ////////счётчик на кол-во записей в techs
    for (let i = 0; i < techs.records.length; i++) {
        const appId = techs.records[i].fields.apparatus[0];
        const techsRec = techs.records[i];
        ///////////////////////Если id кофемашин совпадают
        if (idGear === appId) {
            // console.log(techs.records[i].fields.Name + techs.records[i].fields.value);

            gearNameArr.push(techs.records[i].fields.Name);

            techs.records[i].fields.Name;
            techs.records[i].fields.value;
            // document.createElement('div').classList.add('popup__tech_item');
            // document.createElement('div').classList.add('popup__tech_name');
            // document.createElement('div').classList.add('popup__tech_num');

            pTechWrap = 'popup__tech_wrap';
            pTechItem = 'popup__tech_item';
            pTechName = 'popup__tech_name';
            pTechNum = 'popup__tech_num';
            arrTechItem = document.querySelectorAll('.popup__tech_item');

            createElemModalWindow(pTechItem, pTechWrap);
            createElemModalWindow(pTechName, arrTechItem[iEl]);
            createElemModalWindow(pTechNum, arrTechItem[iEl]);

            // techs.records[i].fields.Name === 'Максимальное давление';
            // let popupTechWrap = document.querySelector('.popup__tech_wrap');
            // popupTechWrap.insertAdjacentHTML(
            //     'beforeend',
            //     `<div class="popup__tech_item"><div class="popup__tech_name _maxpresure">Максимальное давление!</div><div class="popup__tech_num _maxpresure_sub">15 Бар</div></div>`
            // );
            iEl++;
        }
    }
}

function createElemModalWindow(_classNameChild, _classNameParent) {
    popupTechX = document.querySelector(`.${_classNameParent}`);
    g = document.createElement('div');
    g.className = _classNameChild;
    popupTechX.append(g);
}
function arrOfpTechItem() {
    arrTechItem = document.querySelectorAll('.popup__tech_item');
}

getApparatus().then(getTechs).then(mapApparatus); ////////////////////////////////////
setTimeout(() => {
    openModalWindow();
    console.log('Заменить Таймер на промис/async');
}, 1300);

///////////////////glider.addItem

function fillModalWindowBack(idGear) {
    console.log('PopUp  working', idGear);
    const popUp = document.querySelector('.popup');

    for (let i = 0; i < techs.records.length; i++) {
        const appId = techs.records[i].fields.apparatus[0];
        const techsRec = techs.records[i];

        if (idGear === appId) {
            console.log(techs.records[i].fields.Name);
            if (techs.records[i].fields.Name === 'Максимальное давление') {
                let popupTechWrap = document.querySelector('.popup__tech_wrap');
                popupTechWrap.insertAdjacentHTML(
                    'beforeend',
                    `<div class="popup__tech_item"><div class="popup__tech_name _maxpresure">Максимальное давление!</div><div class="popup__tech_num _maxpresure_sub">15 Бар</div></div>`
                );
            }
        }
    }
}
