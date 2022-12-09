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
const cardNameInput = newCardFormElement.querySelector('.input_type_place-name');
const cardImageInput = newCardFormElement.querySelector('.input_type_place-image');

//card variables
const cardTemplate = document.querySelector('#card-template').content;
const places = document.querySelector('.places');


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
  const cardImage = cardElement.querySelector('.places__image');
  const cardName = cardElement.querySelector('.places__name');
  const likeButton = cardElement.querySelector('.places__like-button');
  const deleteButton = cardElement.querySelector('.places__delete-button');
  const imageButton = cardElement.querySelector('.places__image');
  const imagePopup = cardElement.querySelector('.popup__image-view');
  const bigImage = cardElement.querySelector('.places__image_big');
  const imageCloseButton = cardElement.querySelector('.popup__image-close-button');
  const caption = cardElement.querySelector('.places__caption');

  cardName.textContent = item.name;
  cardImage.src = item.link;
  cardImage.alt = item.alt;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__like-button_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    const listItem = deleteButton.closest('.places__card');
    listItem.remove();
  });

  function openImageView() {
    imagePopup.classList.add('popup_opened');
    bigImage.src = item.link;
    caption.textContent = item.name;
  }

  function closeImageView() {
    imagePopup.classList.remove('popup_opened');
  }

  imageButton.addEventListener('click', openImageView);
  imageCloseButton.addEventListener('click', closeImageView);

  places.append(cardElement);
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
  const cardImage = cardElement.querySelector('.places__image');
  const cardName = cardElement.querySelector('.places__name');
  const likeButton = cardElement.querySelector('.places__like-button');
  const deleteButton = cardElement.querySelector('.places__delete-button');
  const imageButton = cardElement.querySelector('.places__image');
  const imagePopup = cardElement.querySelector('.popup__image-view');
  const bigImage = cardElement.querySelector('.places__image_big');
  const imageCloseButton = cardElement.querySelector('.popup__image-close-button');
  const caption = cardElement.querySelector('.places__caption');

  cardName.textContent = cardNameInput.value;
  cardImage.src = cardImageInput.value;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__like-button_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    const listItem = deleteButton.closest('.places__card');
    listItem.remove();
  });

  function openImageView() {
    imagePopup.classList.add('popup_opened');
    bigImage.src = cardImage.src;
    caption.textContent = cardName.textContent;
  }

  function closeImageView() {
    imagePopup.classList.remove('popup_opened');
  }

  imageButton.addEventListener('click', openImageView);
  imageCloseButton.addEventListener('click', closeImageView);

  places.prepend(cardElement);
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

