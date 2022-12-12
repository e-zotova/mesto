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

//open popup
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//close popup
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

//close button listener
closeButtons.forEach(button => {
  button.addEventListener('click', function(evt) {
    closePopup(evt.path[2]);
  });
});

//create card
const createCard = (name, link, alt = '') => {
  const cardTemplate = page.querySelector('#card-template').content;
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.places__image');
  const cardName = cardElement.querySelector('.places__name');
  const likeButton = cardElement.querySelector('.places__like-button');
  const deleteButton = cardElement.querySelector('.places__delete-button');
  const imageButton = cardElement.querySelector('.places__image');
  const closeButton = cardElement.querySelector('.popup__close-button');
  const imagePopup = cardElement.querySelector('.popup__image-view');
  const bigImage = cardElement.querySelector('.places__image_big');
  const caption = cardElement.querySelector('.places__caption');

  cardName.textContent = name;
  cardImage.src = link;
  cardImage.alt = alt;

  likeButton.addEventListener('click', function (evt) {
    evt.target.classList.toggle('places__like-button_active');
  });

  deleteButton.addEventListener('click', function (evt) {
    evt.target.closest('.places__card').remove();
  });

  imageButton.addEventListener('click', () => {
    openPopup(imagePopup);
    bigImage.src = link;
    caption.textContent = name;
  });

  closeButton.addEventListener('click', () => {
    closePopup(imagePopup);
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
});

//submit new card
function submitNewCardForm(evt) {
  evt.preventDefault();

  places.prepend(createCard(cardNameInput.value, cardImageInput.value, cardNameInput.value));
  closePopup(newCardPopup);
  cardNameInput.value = '';
  cardImageInput.value = '';
}

newCardFormElement.addEventListener('submit', submitNewCardForm);
