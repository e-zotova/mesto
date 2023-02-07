import {places, editButton, addButton, profilePopup, nameInput, jobInput,
        newCardPopup, imagePopup, placeName, placeUrl, profileFormElement, newCardFormElement,
        validationObject, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

// create user
const user = new UserInfo('.profile__name', '.profile__job');

// create profile instance
const profile = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: (data) => {
    user.setUserInfo(data);
    //profile.close();
  }
});

//open profile popup
function openProfile() {
  const {name, job} = user.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;

  profileFormValidator.resetValidation();
  profile.setEventListeners();
  profile.open();
}

//add listener for edit button
editButton.addEventListener('click', openProfile);

// create popup image instance
const image = new PopupWithImage(imagePopup);

// open image by click and set listeners
function handleCardClick() {
  image.open(this._name, this._link);
  image.setEventListeners();
}

//create cards from array
const cardList = new Section({
  items: initialCards,
  renderer: (element) => {
      const card = new Card(element,'#card-template', handleCardClick);
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
  }
}, places);

cardList.renderItems();

// create card instance
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
        const card = new Card(element, '#card-template', handleCardClick);
        const cardElement = card.generateCard();

        newCard.addItem(cardElement);
      }
    }, places);

    newCard.renderItems();
    cardPopup.close();
  }
});

//open new card popup and set listeners
addButton.addEventListener('click', () => {
  cardPopup.setEventListeners();
  newCardFormValidator.resetValidation();
  cardPopup.open();
});

//validation for Profile form
const profileFormValidator = new FormValidator(validationObject, profileFormElement);
profileFormValidator.enableValidation();

//validation for new card form
const newCardFormValidator = new FormValidator(validationObject, newCardFormElement);
newCardFormValidator.enableValidation();
