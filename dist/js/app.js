let popupLinks = document.querySelectorAll('.btn_info'); //Необходимо переопределить после загрузки всех элементов
const body = document.querySelector('body');
const popupCloseIcon = document.querySelectorAll('.close-popup');

const timeout = 800;

//////////////////////Закрыть Модальное Окно (popUp)   ////////////////////////////

if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
        const el = popupCloseIcon[index];
        el.addEventListener('click', function (e) {
            popupClose(el.closest('.popup'));
            e.preventDefault();
        });
    }
}
//////////////////////////Открыть Модальное Окно (popUp) //////////////////////

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
////////////////Закрыть окно
function popupClose(popupActive) {
    popupActive.classList.remove('open');
}

////////////////////Закрыть через  ESC //////////////////////
document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
        const popupActive = document.querySelector('.popup.open');
        popupClose(popupActive);
    }
});

//////////////////////////hamburger//////////////////////////
///////////////////////////////////////////////////////////
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
////////////////////////toTHE TOP/////////////

/* begin begin Back to Top button  */
(function () {
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
})();

//////////////////////////////glide_JS////////////
/////////////////////////////////////////////////

// Glider Configuration
function gliderStart() {
    glider = new Glider(document.querySelector('.glider'), {
        slidesToShow: 2,
        slidesToScroll: 1,
        draggable: true,
        dots: '.dots',
        responsive: [
            {
                // If Screen Size More than 768px
                breakpoint: 577,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    duration: 0.5,
                    scrollLock: true,
                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next',
                    },
                },
            },
            {
                // If Screen Size More than 768px
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    duration: 0.5,
                    scrollLock: true,
                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next',
                    },
                },
            },
            {
                // If Screen Size More than 1024px
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    duration: 0.5,
                    scrollLock: true,

                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next',
                    },
                },
            },
            {
                // If Screen Size More than 1324px
                breakpoint: 1324,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    duration: 0.5,
                    scrollLock: true,
                    arrows: {
                        prev: '.glider-prev',
                        next: '.glider-next',
                    },
                },
            },
        ],
    });
}
gliderStart();
///////////////////Form Validate/////////////////////////
////////////////////////////////////////////////////////
function validateForm() {
    const form = document.getElementById('form');
    const username = document.getElementById('username');
    const email = document.getElementById('email');

    // Show input error message
    function showError(input, message) {
        const formControl = input.parentElement;
        formControl.className = 'form-control error';
        const small = formControl.querySelector('small');
        small.innerText = message;
    }

    // Show success outline
    function showSuccess(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control success';
    }

    // Check email is valid
    function checkEmail(input) {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSuccess(input);
        } else {
            showError(input, 'Email is not valid');
        }
    }

    // Check required fields
    function checkRequired(inputArr) {
        inputArr.forEach(function (input) {
            if (input.value.trim() === '') {
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSuccess(input);
            }
        });
    }

    // Check input length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} must be at least ${min} characters`);
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} must be less than ${max} characters`);
        } else {
            showSuccess(input);
        }
    }

    // Get fieldname
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // Event listeners
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        checkRequired([username, email]);
        checkLength(username, 3, 15);

        checkEmail(email);
    });
}
///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
//////////////////////////
//////////////////////Fresh fulll year////////////////////////////////

const curYear = document.querySelector('.copyright-year');

curYear.innerText = new Date().getFullYear();

/////////////////////////starting function//////////////
validateForm();
