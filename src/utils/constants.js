const page = document.querySelector('.page');
const popupOverlays = page.querySelectorAll('.popup');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const closeButtons = page.querySelectorAll('.popup__close-button');
const places = page.querySelector('.places');

//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const profileFormElement = page.querySelector('.popup__profile-form');
const nameInput = profileFormElement.querySelector('.input_type_full-name');
const jobInput = profileFormElement.querySelector('.input_type_job');

const imagePopup = document.querySelector('.popup_image-view');
const bigImage = document.querySelector('.popup__big-image');
const caption = document.querySelector('.popup__caption');

//new card popup variables
const newCardPopup = page.querySelector('.popup_new-card');
const newCardFormElement = page.querySelector('.popup__new-card-form');

const placeName = page.querySelector('#placename');
const placeUrl = page.querySelector('#url');

const validationObject = {
  formSelector: '.popup__form',
  inputSelector: '.input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'input_type_error',
  errorMessageClass: 'popup__input-error_active'
};

//initial cards array
const initialCards = [
  {
    name: 'Гора Эльбрус',
    link: './images/grid-elbrus.jpg',
    alt: 'Вид на гору Эльбрус.'
  },
  {
    name: 'Домбай',
    link: './images/grid-dombai.jpg',
    alt: 'Заснеженные вершины Домбая.'
  },
  {
    name: 'Куршская коса',
    link: './images/grid-kosa.jpg',
    alt: 'Берег Куршской косы.'
  },
  {
    name: 'Алтай',
    link: './images/grid-altai.jpg',
    alt: 'Ноутбук на фоне лесов Алтая.'
  },
  {
    name: 'Байкал',
    link: './images/grid-baikal.jpg',
    alt: 'Лед на озере Байкал.'
  },
  {
    name: 'Карачаево-Черкессия',
    link: './images/grid-karachaevsk.jpg',
    alt: 'Сентинский храм в Карачаево-Черкессии.'
  }
];

export {places, editButton, addButton, closeButtons, popupOverlays, profilePopup, nameInput, jobInput,
  imagePopup, bigImage, caption, newCardPopup, placeName, placeUrl, profileFormElement, newCardFormElement,
        validationObject, initialCards};
