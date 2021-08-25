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

    iterateObj(apparatus); // Перебор массива//////////////////////////////////////////
    //iterateObj(techs); // Перебор массива///////////////////////////////////////////

    ///////////////let clue = Object.keys(apparatus.records); // почему ошибка?
    ////////////// console.log(clue);
}

function iterateObj(geck) {
    /////////////////////
    const gliderDiv = document.querySelector('.glider-track');
    const gear1 = document.querySelector('div.gears-wrap._desktop');
    //const gear2 = gear1.cloneNode(true);
    const gearS = document.querySelectorAll('.gears-wrap');
    //const counter = apparatus.records.length;
    ////////////////////////
    const count = geck.records.length;
    for (let i = 0; i < count; i++) {
        let el = gearS[i];
        el.classList.remove('disabled');
        gliderDiv.appendChild(gear1.cloneNode(true));
        el.classList.remove('disabled');
    }

    setIdDiv();
}

function setIdDiv() {
    const gearItem = document.querySelectorAll('.gears-item-front');
    const gearName = document.querySelectorAll(
        '.gears-item-front > .gears-name'
    );
    const gearPhoto = document.querySelectorAll('.gears-pic > img');
    const count = apparatus.records.length;

    for (let i = 0; i < count; i++) {
        const el = gearItem[i];
        let arEl = apparatus.records[i];

        el.setAttribute('data-id', arEl.id);

        if (gearItem[i].dataset.id === apparatus.records[i].id) {
            gearName[i].textContent = apparatus.records[i].fields.Name;
            console.log(gearItem[i].dataset.id);
            if (
                Array.isArray(apparatus.records[i].fields.Photo) &&
                typeof apparatus.records[i].fields.Photo[0].url === 'string'
            ) {
                gearPhoto[i].src = apparatus.records[i].fields.Photo[0].url;
            } else {
                console.log('Ощибка фоток');
            }
        }
    }
}

function iterateTech() {
    for (let i = 0; i < techs.records.length; i++) {
        const appId = techs.records[i].fields.apparatus[0];
    }
}
function countAny() {
    for (let index = 0; index < apparatus.records.length; index++) {
        const appId = apparatus.records[i].id;
        for (let i = 0; i < techs.records.length; i++) {
            if ((appId = techs.records[i].fields.apparatus[0])) {
                console.log('Столько раз', i);
            }
        }
    }

    for (let i = 0; i < techs.records.length; i++) {}
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

getApparatus().then(getTechs).then(mapApparatus); ////////////////////////////////////
//getApparatus();
//getTechs().then(mapApparatus);
onBtnInfo();
