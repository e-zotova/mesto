const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const formElement = document.querySelector('.popup__form');

//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const nameInput = formElement.querySelector('.input_type_full-name');
const jobInput = formElement.querySelector('.input_type_job');
const profileCloseButton = page.querySelector('.popup__profile-close-button');

//profile variables
const fullName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

//new place popup variables
const newCardPopup = page.querySelector('.popup_new-card');
const placeNameInput = formElement.querySelector('.input_type_place-name');
const placeImageInput = formElement.querySelector('.input_type_place-image');
const newCardCloseButton = page.querySelector('.popup__new-card-close-button');

//card variables
const cardTemplate = document.querySelector('#card-template').content;
const placesGrid = document.querySelector('.places-grid');

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

//add six cards on page load
initialCards.forEach(function(element) {
  const cardElement = cardTemplate.querySelector('.places-grid__card').cloneNode(true);

  cardElement.querySelector('.places-grid__photo').src = element.link;
  cardElement.querySelector('.places-grid__photo').alt = element.alt;
  cardElement.querySelector('.places-grid__name').textContent = element.name;

  placesGrid.append(cardElement);
});

//open and close profile
function openProfile() {
  profilePopup.classList.add('popup_opened');
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;
}

function closeProfile() {
  profilePopup.classList.remove('popup_opened');
}

//open and close new card window
function openNewCard() {
  newCardPopup.classList.add('popup_opened');
}

function closeNewCard() {
  newCardPopup.classList.remove('popup_opened');
}

// form submit handler, but it's not yet sent anywhere
function formSubmitHandler (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  profilePopup.classList.remove('popup_opened');
}

//eventListeners for profile
editButton.addEventListener('click', openProfile);
profileCloseButton.addEventListener('click', closeProfile);
formElement.addEventListener('submit', formSubmitHandler);

//eventListeners for new place
addButton.addEventListener('click', openNewCard);
newCardCloseButton.addEventListener('click', closeNewCard);
