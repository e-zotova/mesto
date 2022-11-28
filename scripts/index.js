//variables
const page = document.querySelector('.page');
const editButton = page.querySelector('.button__edit');
const popup = page.querySelector('.popup');

const formElement = document.querySelector('.popup__container');
const nameInput = formElement.querySelector('.input_type_full-name');
const jobInput = formElement.querySelector('.input_type_job');
const closeButton = page.querySelector('.button__close');

const fullName = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

//functions
function openProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = fullName.textContent;
  jobInput.value = job.textContent;
}

function closeProfile() {
  popup.classList.remove('popup_opened');
}

// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault();

  fullName.childNodes[0].textContent = nameInput.value;
  job.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}


//eventListeners
editButton.addEventListener('click', openProfile);

closeButton.addEventListener('click', closeProfile);

formElement.addEventListener('submit', formSubmitHandler);
