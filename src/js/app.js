const body = document.querySelector('body');

// Нужен ли этот код
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
  for (let index = 0; index < popupCloseIcon.length; index++) {
    const el = popupCloseIcon[index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}

function popupOpen(currentPopup) {
  if (currentPopup) {
    const popupActive = document.querySelector('.popup.open');
    if (popupActive) {
      popupClose(popupActive /*, false*/);
    }
    currentPopup.classList.add('open');
    currentPopup.addEventListener('click', function (e) {
      if (!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}

function popupClose(popupActive) {
  popupActive.classList.remove('open');
}

async function sendMail(e) {
  e.preventDefault();
  try {
    const form = document.querySelector('#form');
    const formData = new FormData();
    if (!form) throw new Error('No form element!');
    const nameEl = form.elements.name;
    const emailEl = form.elements.email;
    const commentEl = form.elements.comment;
    formData.append('name', nameEl.value);
    formData.append('email', emailEl.value);
    formData.append('comment', commentEl.value);
    const url = `sendMail_simple.php`;
    const response = await fetch(url, { method: 'POST', body: formData });
    const json = await response.json(); // { success: Boolean, message: String }
    if (json.success) {
      nameEl.value = '';
      emailEl.value = '';
      commentEl.value = '';
    }
  } catch (e) {
    console.error(e);
  }
}

function initForm() {
  const form = document.querySelector('#form');
  if (!form) throw new Error('No form!');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Отключаем валидацию пока что
    // formValidators.checkRequired(['username', 'email']);
    // formValidators.checkLength('username', 3, 40);
    // formValidators.checkEmail('email');
    sendMail();
  });

}

function initBurger() {
  const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElem = document.querySelector('.menu__close'),
    menuLinks = document.querySelectorAll('.menu__link');

  hamburger.addEventListener('click', () => {
    menu.classList.add('active');
  });

  closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
  });

  if (menuLinks.length > 0) {
    menuLinks.forEach((menuLink) => {
      menuLink.addEventListener('click', onMenuLinkClick);
    });

    function onMenuLinkClick() {
      if (menu.classList.contains('active')) {
        menu.classList.remove('active');
      }
    }
  }
}

function initBackTop() {
  let goTopBtn = document.querySelector('.back_to_top');
  window.addEventListener('scroll', trackScroll);

  function trackScroll() {
    const scrolled = window.pageYOffset;
    const coords = document.documentElement.clientHeight;

    if (scrolled > coords) {
      goTopBtn.classList.add('back_to_top-show');
    }
    if (scrolled < 50) {
      goTopBtn.classList.remove('back_to_top-show');
    }
  }
};

function setCurrentYear() {
  const curYear = document.querySelector('.copyright-year');
  curYear.innerText = new Date().getFullYear();
}

const formValidators = {
  showError: (input, message) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  },
  showSuccess: (input) => {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  },
  checkEmail: (id) => {
    const email = document.getElementById(id);
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email.value.trim())) {
      this.showSuccess(email);
    } else {
      this.showError(email, 'Email is not valid');
    }
  },
  checkRequired: (ids = []) => {
    ids.forEach((id) => {
      const input = document.getElementById(id);
      if (!input) return;
      if (input.value.trim() === '') {
        this.showError(input, `${this.getFieldName(input)} is required`);
      } else {
        this.showSuccess(input);
      }
    });
  },
  checkLength: (id, min, max) => {
    const input = document.getElementById(id);
    if (!input) return;
    if (input.value.length < min) {
      this.showError(input, `${this.getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
      this.showError(input, `${this.getFieldName(input)} must be less than ${max} characters`);
    } else {
      this.showSuccess(input);
    }
  },
  getFieldName: (input) => {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }
}

window.onload = () => {
  setCurrentYear();
  initBurger();
  initBackTop();
  initForm();
};

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});