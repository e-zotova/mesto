const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popup = page.querySelector('.popup');
const closeButtons = page.querySelectorAll('.popup__close-button');
const places = page.querySelector('.places');
const inputs = page.querySelectorAll('.input');

//profile variables
const fullName = page.querySelector('.profile__name');
const job = page.querySelector('.profile__job');

//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const profileFormElement = page.querySelector('.popup__profile-form');
const nameInput = profileFormElement.querySelector('.input_type_full-name');
const jobInput = profileFormElement.querySelector('.input_type_job');
const submitButtons = page.querySelectorAll('.popup__save-button');

//new card popup variables
const newCardPopup = page.querySelector('.popup_new-card');
const newCardFormElement = page.querySelector('.popup__new-card-form');
const cardNameInput = newCardFormElement.querySelector('.input_type_place-name');
const cardImageInput = newCardFormElement.querySelector('.input_type_place-image');

//image popup variables
const imagePopup = page.querySelector('.popup_image-view');
const bigImage = page.querySelector('.popup__big-image');
const caption = page.querySelector('.popup__caption');

const inputErrors = page.querySelectorAll('.popup__input-error');


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
    closePopup(evt.target.closest('.popup'));
  };
}

function closePopupByClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  };
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('keydown', closePopupByEscape);
  popup.addEventListener('mousedown', closePopupByClick);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('keydown', closePopupByEscape);
  popup.removeEventListener('mousedown', closePopupByClick);
}

//close button listener
closeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.target.closest('.popup'));

    //remove red error line
    inputs.forEach(element => {
      element.classList.remove('input_type_error');
    })

    //remove error text
    inputErrors.forEach(element => {
      element.classList.remove('popup__input-error_active');
    });

    //check button state
      submitButtons.forEach(button => {
        toggleButtonState(inputs, button, enableValidation);
      })
    });
});

//create card
const createCard = (name, link, alt = name) => {
  const cardTemplate = page.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.places__image');
  const cardName = cardElement.querySelector('.places__name');
  const likeButton = cardElement.querySelector('.places__like-button');
  const deleteButton = cardElement.querySelector('.places__delete-button');

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__like-button_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.places__card').remove();
  });

  cardImage.addEventListener('click', function () {
    openPopup(imagePopup);
    bigImage.src = link;
    bigImage.alt = name;
    caption.textContent = name;
  });

  return cardElement;
};

//add cards on page load
initialCards.forEach(function(element) {
  places.append(
    createCard(element.name, element.link, element.alt));
});

//open profile
editButton.addEventListener('click', () => {
  openPopup(profilePopup);
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;

  //check button state when open form
  submitButtons.forEach((button) => {
    toggleButtonState([nameInput, jobInput], button, enableValidation);
  })
});

//submit profile
function submitProfileForm (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', submitProfileForm);

//open new card
addButton.addEventListener('click', () => {
  openPopup(newCardPopup);

  //check button state when open form
  submitButtons.forEach((button) => {
    toggleButtonState([cardNameInput, cardImageInput], button, enableValidation);
  })
});

//submit new card
function submitNewCardForm(evt) {
  evt.preventDefault();

  places.prepend(createCard(cardNameInput.value, cardImageInput.value, cardNameInput.value));
  closePopup(newCardPopup);
  evt.target.reset();
}

newCardFormElement.addEventListener('submit', submitNewCardForm);

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'input_type_error',
  errorMessageClass: 'popup__input-error_active'
});
