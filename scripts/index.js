const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');
const addButton = page.querySelector('.profile__add-button');
const popup = page.querySelector('.popup');
const closeButtons = page.querySelectorAll('.popup__close-button');
const places = page.querySelector('.places');

//profile variables
const fullName = page.querySelector('.profile__name');
const job = page.querySelector('.profile__job');

//profile popup variables
const profilePopup = page.querySelector('.popup_profile');
const profileFormElement = page.querySelector('.popup__profile-form');
const nameInput = profileFormElement.querySelector('.input_type_full-name');
const jobInput = profileFormElement.querySelector('.input_type_job');

//new card popup variables
const newCardPopup = page.querySelector('.popup_new-card');
const newCardFormElement = page.querySelector('.popup__new-card-form');
const cardNameInput = newCardFormElement.querySelector('.input_type_place-name');
const cardImageInput = newCardFormElement.querySelector('.input_type_place-image');

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

//create card
const createCard = (name, link, alt = '') => {
  const cardTemplate = page.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.places__image');
  const cardName = cardElement.querySelector('.places__name');

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;

  createCardButtons(cardElement, name, link);

  return cardElement;
};

const createCardButtons = (element, name, link) => {
  const likeButton = element.querySelector('.places__like-button');
  const deleteButton = element.querySelector('.places__delete-button');
  const imageButton = element.querySelector('.places__image');
  const closeButton = element.querySelector('.popup__close-button');
  const imagePopup = element.querySelector('.popup__image-view');
  const bigImage = element.querySelector('.places__image_big');
  const caption = element.querySelector('.places__caption');

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

  closeButton.addEventListener('click', function (evt) {
    closePopup(imagePopup);
  });

  return element;
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

//close button listener
closeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.path[2]);
  });
});

//open profile
editButton.addEventListener('click', function() {
  openPopup(profilePopup);
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;
});

//submit profile
function profileFormSubmitHandler (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(profilePopup);
}

profileFormElement.addEventListener('submit', profileFormSubmitHandler);

//open new card
addButton.addEventListener('click', function() {
  openPopup(newCardPopup);
});

//submit new card
function newCardFormSubmitHandler (evt) {
  evt.preventDefault();

  places.prepend(createCard(cardNameInput.value, cardImageInput.value, cardNameInput.value));
  closePopup(newCardPopup);
  cardNameInput.value = '';
  cardImageInput.value = '';
}

newCardFormElement.addEventListener('submit', newCardFormSubmitHandler);
