import {closeButtons, places, editButton, addButton, profilePopup, popupOverlays, nameInput, fullName, jobInput, job,
        newCardPopup, placeName, placeUrl, profileFormElement, newCardFormElement,
        validationObject, initialCards} from '../utils/constants.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';

function closePopupByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
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
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEscape);
}

popupOverlays.forEach((overlay) => {
  overlay.addEventListener('mousedown', closePopupByClick);
})

//close button listener
closeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'));
  });
});

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
  openPopup(profilePopup);
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
  closePopup(profilePopup);
  evt.target.reset();
}

profileFormElement.addEventListener('submit', submitProfileForm);

//open new card popup
addButton.addEventListener('click', () => {
  openPopup(newCardPopup);
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

export {openPopup};
