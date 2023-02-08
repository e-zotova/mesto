import {places, editButton, addButton, profilePopup, fullName, nameInput, job, jobInput,
        newCardPopup, imagePopup, placeName, placeUrl, profileFormElement, newCardFormElement,
        validationObject, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

import '../pages/index.css';

const user = new UserInfo(fullName, job);

// create profile instance
const profile = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: (data) => {
    user.setUserInfo(data);
  }
});
profile.setEventListeners();

//open profile popup
function openProfile() {
  const {name, job} = user.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;

  profileFormValidator.resetValidation();
  profile.open();
}

const image = new PopupWithImage(imagePopup);
image.setEventListeners();

// open image by click
function handleCardClick(name, link) {
  image.open(name, link);
}

// create card function
function createCard(element, selector, handleCardClick) {
  const card = new Card(element, selector, handleCardClick);
  return card.generateCard();
}

//create cards from array
const cardList = new Section({
  items: initialCards,
  renderer: (element) => {
      cardList.addItem(
        createCard(element,'#card-template', handleCardClick)
      );
  }
}, places);

cardList.renderItems();

// create new card
const cardPopup = new PopupWithForm({
  popup: newCardPopup,
  handleFormSubmit: () => {
    const cardObjectArray = [{
      name: placeName.value,
      link: placeUrl.value,
      alt: placeName.value
    }];

    const newCard = new Section({
      items: cardObjectArray,
      renderer: (element) => {
        newCard.addItem(
          createCard(element, '#card-template', handleCardClick)
        );
      }
    }, places);

    newCard.renderItems();
    cardPopup.close();
  }
});
cardPopup.setEventListeners();

// add listeners for edit and add buttons
editButton.addEventListener('click', openProfile);

addButton.addEventListener('click', () => {
  newCardFormValidator.resetValidation();
  cardPopup.open();
});

//validation for Profile form
const profileFormValidator = new FormValidator(validationObject, profileFormElement);
profileFormValidator.enableValidation();

//validation for new card form
const newCardFormValidator = new FormValidator(validationObject, newCardFormElement);
newCardFormValidator.enableValidation();
