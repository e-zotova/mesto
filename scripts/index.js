const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popup = page.querySelector('.popup');
const closeButtons = page.querySelectorAll('.popup__close-button');

//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const profileFormElement = document.querySelector('.popup__profile-form');
const nameInput = profileFormElement.querySelector('.input_type_full-name');
const jobInput = profileFormElement.querySelector('.input_type_job');
const profileCloseButton = page.querySelector('.popup__profile-close-button');

//profile variables
const fullName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

//new card popup variables
const newCardPopup = page.querySelector('.popup_new-card');
const newCardFormElement = document.querySelector('.popup__new-card-form');
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
const createCard = (name, link, alt) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.places__image');
  const cardName = cardElement.querySelector('.places__name');
  const likeButton = cardElement.querySelector('.places__like-button');
  const deleteButton = cardElement.querySelector('.places__delete-button');
  const imageButton = cardElement.querySelector('.places__image');
  const imagePopup = cardElement.querySelector('.popup__image-view');
  const imageCloseButton = cardElement.querySelector('.popup__image-close-button');
  const bigImage = cardElement.querySelector('.places__image_big');
  const caption = cardElement.querySelector('.places__caption');

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = alt; //TODO default?

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__like-button_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.places__card').remove();
  });

  imageButton.addEventListener('click', function (evt) {
    openPopup(imagePopup);
    bigImage.src = link;
    caption.textContent = name;
  });

  imageCloseButton.addEventListener('click', function (evt) {
    closePopup(imagePopup);
  });

  return cardElement;
};

//add cards on page load
initialCards.forEach(function(element) {
  places.append(
    createCard(element.name, element.link, element.alt));
});

//open and close popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//open, close, submit profile
editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;
});

closeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.path[2]);
  });
});

function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', profileFormSubmitHandler);

//open, close, submit new card
addButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

// close popups
// profileCloseButton.addEventListener('click', function() {
//   closePopup(profilePopup);
// });

// newCardCloseButton.addEventListener('click', function() {
//   closePopup(newCardPopup);
//   cardNameInput.value = '';
//   cardImageInput.value = '';
// });

function newCardFormSubmitHandler (evt) {
  evt.preventDefault();

  places.prepend(createCard(cardNameInput.value, cardImageInput.value, cardNameInput.value));
  closePopup(newCardPopup);
  cardNameInput.value = '';
  cardImageInput.value = '';
}

newCardFormElement.addEventListener('submit', newCardFormSubmitHandler);
