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
    const gearName = document.querySelectorAll(
        '.gears-item-front > .gears-name'
    );
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
    ///////Удаляем все .popup__tech_item, чтобы на их месте создать новые
    document.querySelectorAll('.popup__tech_item').forEach((e) => e.remove());
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

            let nameT = techs.records[i].fields.Name;
            let valueT = techs.records[i].fields.value;

            let arrTechItem = document.querySelectorAll('.popup__tech_item');
            ///////Ф-я создаёт обёртку (popup__tech_wrap), затем родительский эл.
            //////(popup__tech_item) и два близница (popup__tech_name popup__tech_num)
            createElemModalWindow(
                'popup__tech_wrap',
                'popup__tech_item',
                iEl,
                nameT,
                valueT
            );
            //fillTechItem(nameT, valueT);

            iEl++;
        }
    }
}
/////////////////
function createElemModalWindow(
    _classNameWrap,
    _classNameParent,
    iEl,
    nameT,
    valueT
) {
    /////создаёт обёртку (popup__tech_wrap) и эл.popup__tech_item
    popupTechX = document.querySelector(`.${_classNameWrap}`);
    let div = document.createElement('div');
    div.className = _classNameParent;
    popupTechX.append(div);
    addTwoChild(iEl, 'popup__tech_name', nameT);
    addTwoChild(iEl, 'popup__tech_num', valueT);
}
//////Создаёт два близница (popup__tech_name popup__tech_num)
function addTwoChild(iEl, _classNameLastChild, nameORvalue) {
    let arrTechItem = document.querySelectorAll('.popup__tech_item');
    let div = document.createElement('div');
    div.className = _classNameLastChild;
    div.textContent = nameORvalue;
    arrTechItem[iEl].append(div);
}
function fillTechItem(nameT, valueT) {
    let arrTechItem = document.querySelectorAll('.popup__tech_item');
    for (let techItem of arrTechItem) {
        techItem;
    }
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
