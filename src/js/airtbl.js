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

function fillModalWindow(idGear) {
  ///////Удаляем все .popup__tech_item, чтобы на их месте создать новые
  document.querySelectorAll('.popup__tech_item').forEach((e) => e.remove());

  let iEl = 0;

  ////////счётчик на кол-во записей в techs
  for (let i = 0; i < techs.records.length; i++) {
    const appId = techs.records[i].fields.apparatus[0];
    const techsRecF = techs.records[i].fields;
    ///////////////////////Если id кофемашин совпадают
    if (idGear === appId) {
      let nameT = techsRecF.Name;
      let valueT = techsRecF.value;

      ///////Ф-я создаёт обёртку (popup__tech_wrap), затем родительский эл.
      //////(popup__tech_item) и два близница (popup__tech_name popup__tech_num)
      createElemModalWindow(
        'popup__tech_wrap',
        'popup__tech_item',
        iEl,
        nameT,
        valueT
      );
      fillNameImgNote(idGear);

      iEl++;
    }
  }
}

function fillNameImgNote(idGear) {
  const appRec = apparatus.records;
  for (let i = 0; i < appRec.length; i++) {
    let nameApp = appRec[i].fields.Name;
    let notesApp = appRec[i].fields.Notes;

    if (idGear === appRec[i].id) {
      let gearPhoto = document.querySelector('.popup__img > img');
      document.querySelector('.popup__title').textContent = nameApp;
      document.querySelector('.popup__text').textContent = notesApp;

      if (
        Array.isArray(appRec[i].fields.Photo) &&
        typeof appRec[i].fields.Photo[0].url === 'string'
      ) {
        /////Вставляем изображение кофемашины
        gearPhoto.src = appRec[i].fields.Photo[0].url;
      } else {
        gearPhoto.src = 'img/coffgear.png';
        console.log('Error no Photo');
      }
    }
  }
}

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

getApparatus().then(() => {
  initApparatusSlider();
  getTechs();
});

setTimeout(() => {
  openModalWindow();
  // console.log('Заменить Таймер на промис/async');
}, 1400);

///////////////////glider.addItem

// Own slider by OstKost
function nextSlide(up = true) {
  const slider = document.querySelector('.apparatus__slider');
  const slides = slider.childNodes;
  const sliderWidth = slider.offsetWidth;
  const sliderFullWidth = slider.scrollWidth;
  const sliderScrolled = slider.scrollLeft;
  const itemWidth = sliderFullWidth / slides.length;
  const maxItems = Math.round(sliderWidth / itemWidth);
  const maxScroll = (slides.length - maxItems) * itemWidth;
  let left = 0;
  if (up) {
    left = sliderScrolled >= maxScroll ? 0 : sliderScrolled + itemWidth;
  } else {
    left = sliderScrolled <= 0 ? maxScroll : sliderScrolled - itemWidth;
  }
  slider.scrollTo({
    left,
    behavior: 'smooth'
  });
}

function initApparatusSlider() {
  let interval = null;
  const machines = (apparatus && apparatus.records) || [];

  const slider = document.querySelector('.apparatus__slider');
  if (!slider) return;
  slider.addEventListener('mouseover', stopSlider);
  slider.addEventListener('mouseout', startSlider);

  const controls = document.querySelectorAll('.apparatus__control-btn');
  controls[0].addEventListener('click', () => nextSlide(false));
  controls[1].addEventListener('click', () => nextSlide(true));
  controls.forEach(btn => {
    btn.addEventListener('mouseover', stopSlider);
    btn.addEventListener('mouseout', startSlider);
  })

  function openModal(id) {
    return () => {
      const currentPopup = document.getElementById('popup');
      if (!currentPopup) return;
      popupOpen(currentPopup);
      fillModalWindow(id);
    }
  }

  function render() {
    machines.forEach(machine => {
      const id = machine.id;
      const { Photo, Name, } = machine.fields || {};
      const hasImage = Array.isArray(Photo) && Photo.length > 0;
      const imageUrl = hasImage ? Photo[0].url : '../img/coffgear.png'; // сделать запасную фотку если фото нет
      const sliderItem = document.createElement('li')
      sliderItem.classList.toggle('apparatus__slider-item', true);
      const apparatEl = document.createElement('div');
      apparatEl.classList.toggle('apparat', true);
      apparatEl.addEventListener('click', openModal(id));
      const apparatImageEl = document.createElement('div');
      apparatImageEl.classList.toggle('apparat__image', true);
      apparatImageEl.style.backgroundImage = `url(${imageUrl})`;
      const apparatNameEl = document.createElement('div');
      apparatNameEl.classList.toggle('apparat__name', true);
      apparatNameEl.innerText = Name;
      const apparatBtnEl = document.createElement('div');
      apparatBtnEl.classList.toggle('apparat__btn', true);
      apparatBtnEl.innerText = 'Подробнее';
      apparatEl.appendChild(apparatImageEl);
      apparatEl.appendChild(apparatNameEl);
      apparatEl.appendChild(apparatBtnEl);
      sliderItem.appendChild(apparatEl);
      slider.appendChild(sliderItem);
    });
  }

  function startSlider() {
    interval = setInterval(() => {
      nextSlide();
    }, 5000)
  }

  function stopSlider() {
    clearInterval(interval);
  }

  render();
  startSlider();
}