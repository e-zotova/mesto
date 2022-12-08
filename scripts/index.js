const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const profileFormElement = document.querySelector('.popup__profile-form');
const newCardFormElement = document.querySelector('.popup__new-card-form');


//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const nameInput = profileFormElement.querySelector('.input_type_full-name');
const jobInput = profileFormElement.querySelector('.input_type_job');
const profileCloseButton = page.querySelector('.popup__profile-close-button');

//profile variables
const fullName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

//new card popup variables
const newCardPopup = page.querySelector('.popup_new-card');
const placeNameInput = newCardFormElement.querySelector('.input_type_place-name');
const placeImageInput = newCardFormElement.querySelector('.input_type_place-image');
const newCardCloseButton = page.querySelector('.popup__new-card-close-button');

//card variables
const cardTemplate = document.querySelector('#card-template').content;
const placesGrid = document.querySelector('.places-grid');

const cardNameInput = newCardFormElement.querySelector('.input_type_place-name');
const cardImageInput = newCardFormElement.querySelector('.input_type_place-image');


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

//create card fuction
function createCard(item) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.places-grid__photo');
  const cardName = cardElement.querySelector('.places-grid__name');

  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.alt;

  placesGrid.append(cardElement);
};

//add six cards on page load
initialCards.forEach(element => createCard(element));

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

//form submit handler, but it's not yet sent anywhere
function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  profilePopup.classList.remove('popup_opened');
}

//add new card with name and picture
function cardFormSubmitHandler (evt) {
  evt.preventDefault();
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.places-grid__photo');
  const cardName = cardElement.querySelector('.places-grid__name');

  cardName.textContent = cardNameInput.value;
  cardImage.src = cardImageInput.value;

  placesGrid.prepend(cardElement);
  newCardPopup.classList.remove('popup_opened');
  cardNameInput.value = '';
  cardImageInput.value = '';
}

//eventListeners for profile
editButton.addEventListener('click', openProfile);
profileCloseButton.addEventListener('click', closeProfile);
profileFormElement.addEventListener('submit', profileFormSubmitHandler);

//eventListeners for new place
addButton.addEventListener('click', openNewCard);
newCardCloseButton.addEventListener('click', closeNewCard);
newCardFormElement.addEventListener('submit', cardFormSubmitHandler);
