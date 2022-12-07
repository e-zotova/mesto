
const page = document.querySelector('.page');
const editButton = page.querySelector('.profile__edit-button');

//popup variables
const popup = page.querySelector('.popup');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.input_type_full-name');
const jobInput = formElement.querySelector('.input_type_job');
const closeButton = page.querySelector('.popup__close-button');

//profile variables
const fullName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

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
  popup.classList.add('popup_opened');
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;
}

function closeProfile() {
  popup.classList.remove('popup_opened');
}

// form submit handler, but it's not yet sent anywhere
function formSubmitHandler (evt) {
  evt.preventDefault();

  fullName.textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

//eventListeners for profile
editButton.addEventListener('click', openProfile);
closeButton.addEventListener('click', closeProfile);
formElement.addEventListener('submit', formSubmitHandler);
