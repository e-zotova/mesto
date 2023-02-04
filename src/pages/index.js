import {closeButtons, places, editButton, addButton, profilePopup, popupOverlays, nameInput, fullName, jobInput, job,
        newCardPopup, placeName, placeUrl, profileFormElement, newCardFormElement,
        validationObject, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import Popup from '../components/Popup.js';

popupOverlays.forEach((overlay) => {
  const popup = new Popup(overlay);
  overlay.addEventListener('mousedown', popup.setEventListeners.bind(popup));
})

//create cards from array
const cardList = new Section({
  items: initialCards,
  renderer: (element) => {
      const card = new Card(element, '#card-template');
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
  }
}, places);

cardList.renderItems();

//open profile popup
function openProfile() {
  const profile = new Popup(profilePopup);
  profile.open();
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;

  profileFormValidator.resetValidation();
}

editButton.addEventListener('click', openProfile);

//submit profile
function submitProfileForm (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  const profile = new Popup(profilePopup);
  profile.close();
  evt.target.reset();
}

profileFormElement.addEventListener('submit', submitProfileForm);

//open new card popup
addButton.addEventListener('click', () => {
  const cardPopup = new Popup(newCardPopup);
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
      const card = new Card(element, '#card-template');
      const cardElement = card.generateCard();

      newCard.addItem(cardElement);
    }
  }, places);
  newCard.renderItems();

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
