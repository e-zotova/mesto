import {places, editButton, addButton, profilePopup, popupOverlays, nameInput, fullName, jobInput, job,
        newCardPopup, imagePopup, placeName, placeUrl, profileFormElement, newCardFormElement,
        validationObject, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import UserInfo from '../components/UserInfo.js';

//add listeners to all popups
popupOverlays.forEach((overlay) => {
  const popup = new Popup(overlay);
  overlay.addEventListener('mousedown', popup.setEventListeners.bind(popup));
})

const user = new UserInfo(fullName.textContent, job.textContent);

const profile = new PopupWithForm({
  popup: profilePopup,
  handleFormSubmit: () => {
    fullName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    profile.close();
  }
});

profile.setEventListeners();

const card = new PopupWithForm({
  popup: newCardPopup,
  handleFormSubmit: () => {

  }
});

card.setEventListeners();

const image = new PopupWithImage(imagePopup);

// open image by click function
function handleCardClick() {
  image.open(this._name, this._link);
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

//open profile popup
function openProfile() {
  nameInput.value = user._name;
  jobInput.value = user._job;

  profileFormValidator.resetValidation();
  profile.open();
}

editButton.addEventListener('click', openProfile);

//submit profile
// function submitProfileForm (evt) {
//   evt.preventDefault();

//   fullName.textContent = nameInput.value;
//   job.textContent = jobInput.value;

//   profile.close();
// }

// profileFormElement.addEventListener('submit', submitProfileForm);

//open new card popup
addButton.addEventListener('click', () => {
  const cardPopup = new PopupWithForm({
    popup: newCardPopup,
    handleFormSubmit: (formData) => {

    }
  });
  cardPopup.open();
});

//submit new card
function submitNewCardForm(evt) {
  evt.preventDefault();

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

  const cardPopup = new PopupWithForm({
    popup: newCardPopup,
    handleFormSubmit: (formData) => {

    }
  });
  cardPopup.close();
}

newCardFormElement.addEventListener('submit', submitNewCardForm);

//validation for Profile form
const profileFormValidator = new FormValidator(validationObject, profileFormElement);
profileFormValidator.enableValidation();

//validation for new card form
const newCardFormValidator = new FormValidator(validationObject, newCardFormElement);
newCardFormValidator.enableValidation();
