import {places, editButton, addButton, profilePopup, fullName, nameInput, job, avatar,
        jobInput, newCardPopup, imagePopup, profileFormElement, newCardFormElement,
        validationObject, deletePopup, editAvatarButton, editAvatarPopup,
        avatarFormElement, avatarInput} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';
import {Api, apiConfig} from '../components/Api.js';

import '../pages/index.css';

const api = new Api(apiConfig);
const user = new UserInfo(fullName, job, avatar);
let cardList = {};

// create profile instance
const profile = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: (data, saveButton) => {
    updateButtonText(saveButton, "Сохранение...");
    api.setUser(data)
      .then((result) => {
        user.setUserInfo(result);
        profile.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateButtonText(saveButton, "Сохранить");
      })
   }
});
profile.setEventListeners();

function openProfile() {
  const {name, job} = user.getUserInfo()
  nameInput.value = name;
  jobInput.value = job;

  profileFormValidator.resetValidation();
  profile.open();
}

// create edit avatar instance
const editAvatar = new PopupWithForm({
  popup: editAvatarPopup,
  handleFormSubmit: (data, saveButton) => {
    updateButtonText(saveButton, "Сохранение...");
    api.editAvatar(data)
      .then((result) => {
        user.setUserInfo(result);
        editAvatar.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateButtonText(saveButton, "Сохранить");
      })
  }
});
editAvatar.setEventListeners();

function openEditAvatar() {
  avatarInput.value = avatar.src;
  avatarFormValidator.resetValidation();
  editAvatar.open();
}

const image = new PopupWithImage(imagePopup);
image.setEventListeners();

function handleCardClick(name, link) {
  image.open(name, link);
}

function handleConfirmDelete(id, cardElement) {
  popupWithConfirmation.open(id, cardElement);
}

function likeCard(id, likeCount, likeButton) {
  api.likeCard(id, likeCount)
    .then((result) => {
      likeButton.classList.toggle('places__like-button_active');
      likeCount.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function unlikeCard(id, likeCount, likeButton) {
  api.unlikeCard(id, likeCount)
    .then((result) => {
      likeButton.classList.remove('places__like-button_active');
      likeCount.textContent = result.likes.length;
    })
    .catch((err) => {
      console.log(err);
    });
}

function updateButtonText(button, text) {
  button.textContent = text;
}

function generateCard(element) {
  const card = new Card(element, '#card-template', handleCardClick, handleConfirmDelete,
                        likeCard, unlikeCard, user.getUserId());
  return card.generateCard();
}

Promise.all([
  api.getUser(),
  api.getInitialCards()
])
  .then((result) => {
    const userData = result[0];
    const cardsData = result[1];
    user.setUserInfo(userData);

    cardList = new Section({
      items: cardsData,
      renderer: (element) => {
        cardList.addItem(generateCard(element), false);
      }
    }, places);
    cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  })

// create new card
const cardPopup = new PopupWithForm({
  popup: newCardPopup,
  handleFormSubmit: (data, saveButton) => {
    updateButtonText(saveButton, "Сохранение...");
    api.createCard(data)
      .then((cardData) => {
        cardList.addItem(generateCard(cardData), true)
        cardPopup.close();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        updateButtonText(saveButton, "Сохранить");
      })
  }
});
cardPopup.setEventListeners();

function openNewCard () {
  newCardFormValidator.resetValidation();
  cardPopup.open();
}

//delete card
const popupWithConfirmation = new PopupWithConfirmation({
  popup: deletePopup,
  handleSubmit: (id, cardElement) => {
    api.deleteCard(id)
      .then(() => {
        cardElement.remove();
        popupWithConfirmation.close();
      })
      .catch((err) => {
        console.log(err);
        popupWithConfirmation.close();
      });
  }
});
popupWithConfirmation.setEventListeners();

// add listeners for buttons
editButton.addEventListener('click', openProfile);

editAvatarButton.addEventListener('click', openEditAvatar);

addButton.addEventListener('click', openNewCard);

//validation for profile form
const profileFormValidator = new FormValidator(validationObject, profileFormElement);
profileFormValidator.enableValidation();

//validation for avatar form
const avatarFormValidator = new FormValidator(validationObject, avatarFormElement);
avatarFormValidator.enableValidation();

//validation for new card form
const newCardFormValidator = new FormValidator(validationObject, newCardFormElement);
newCardFormValidator.enableValidation();
