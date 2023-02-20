import {places, editButton, addButton, profilePopup, fullName, nameInput, job, avatar,
        jobInput, newCardPopup, imagePopup, profileFormElement, newCardFormElement,
        validationObject, deletePopup} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupConfirm from '../components/PopupConfirm.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {Api, apiConfig} from '../components/Api.js';

import '../pages/index.css';

const api = new Api(apiConfig);
let user = {};
let cardList = {};

api.getUser()
  .then((result) => {
    user = new UserInfo(fullName, job);
    fullName.textContent = result.name;
    job.textContent = result.about;
    avatar.src = result.avatar;
  })


// create profile instance
const profile = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: (data) => {
    api.setUser(data)
      .then((result) => {
        user.setUserInfo(result.name, result.about);
      })
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
function generateCard(element, selector, handleCardClick, handleConfirmDelete) {
  const card = new Card(element, selector, handleCardClick, handleConfirmDelete);
  return card.generateCard();
}

//create cards from array
api.getInitialCards()
  .then((result) => {
    cardList = new Section({
      items: result,
      renderer: (element) => {
        cardList.addItem(
          generateCard(element,'#card-template', handleCardClick, handleConfirmDelete),
          false
        );
      }
    }, places);
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });


// create new card
const cardPopup = new PopupWithForm({
  popup: newCardPopup,
  handleFormSubmit: (data) => {
    api.createCard(data)
      .then((cardData) => {
        cardList.addItem(
          generateCard(cardData, '#card-template', handleCardClick, handleConfirmDelete),
          true
        )
      })
      .catch((err) => {
        console.log(err);
      });
    cardPopup.close();
  }
});
cardPopup.setEventListeners();

//delete card
const popupConfirm = new PopupConfirm({
  popup: deletePopup,
  handleSubmit: (id) => {
    api.deleteCard(id)
    .then(() => {
      popupConfirm.close();
    })
    .catch((err) => {
      console.log(err);
      popupConfirm.close();
    });
  }
});
popupConfirm.setEventListeners();

function handleConfirmDelete(id) {
  popupConfirm.open(id);
}

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
