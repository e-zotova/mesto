import Card from './Card.js';
import FormValidator from './FormValidator.js';
export {openPopup};

const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const closeButtons = page.querySelectorAll('.popup__close-button');
const places = page.querySelector('.places');

//profile variables
const fullName = page.querySelector('.profile__name');
const job = page.querySelector('.profile__job');

//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const profileFormElement = page.querySelector('.popup__profile-form');
const nameInput = profileFormElement.querySelector('.input_type_full-name');
const jobInput = profileFormElement.querySelector('.input_type_job');
const nameError = profileFormElement.querySelector('.fullname-error');
const jobError = profileFormElement.querySelector('.job-error');

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


function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = page.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('mousedown', closePopupByClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('mousedown', closePopupByClick);
}

//close button listener
closeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'));
    });
});

//create cards from array
initialCards.forEach((element) => {
  const card = new Card(element, '#card-template');
  const cardElement = card.generateCard();

  places.append(cardElement);
});

//open profile
editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;

  profileFormValidator.resetValidation();

  //nameInput.classList.remove('input_type_error');
  //jobInput.classList.remove('input_type_error');

  //remove error text
  //nameError.classList.remove('popup__input-error_active');
  //jobError.classList.remove('popup__input-error_active');
});

//submit profile
function submitProfileForm (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
  evt.target.reset();
}

profileFormElement.addEventListener('submit', submitProfileForm);

//open new card
addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
});

//submit new card
function submitNewCardForm(evt) {
  evt.preventDefault();

  const cardObject = {
    name: placeName.value,
    link: placeUrl.value,
    alt: placeName.value
  };

  const card = new Card(cardObject, '#card-template');
  const cardElement = card.generateCard();

  places.prepend(cardElement);
  closePopup(newCardPopup);
  evt.target.reset();
}

newCardFormElement.addEventListener('submit', submitNewCardForm);

//validation for Profile form
const profileFormValidator = new FormValidator(validationObject, profileFormElement);
profileFormValidator.enableValidation();

//validation for new card form
const newCardFormValidator = new FormValidator(validationObject, newCardFormElement);
newCardFormValidator.enableValidation();

