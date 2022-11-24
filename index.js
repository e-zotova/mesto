//open popup
let content = document.querySelector('.content');
let editButton = content.querySelector('.button__edit');
let popup = content.querySelector('.popup');


//edit profile
let formElement = document.querySelector('.popup__container');
let nameInput = formElement.querySelector('.input_type_full-name');
let occupationInput = formElement.querySelector('.input_type_occupation');
let saveButton = formElement.querySelector('.button__save');
let closeButton = content.querySelector('.button__close');

let fullName = document.querySelector('.profile__full-name');
let occupation = document.querySelector('.profile__occupation');

let likeButton = content.querySelector('.button__like');

//functions
function openProfile() {
  popup.classList.add('popup_opened');
  nameInput.value = fullName.textContent;
  occupationInput.value = occupation.textContent;
}

function closeProfile() {
  popup.classList.remove('popup_opened');
}

saveButton.onclick = formSubmitHandler;
// Обработчик «отправки» формы, хотя пока она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  fullName.childNodes[0].textContent = nameInput.value;
  occupation.textContent = occupationInput.value;
  popup.classList.remove('popup_opened');
}

function likeElement() {
  likeButton.classList.add('button__like_active');
}

//eventListeners
editButton.addEventListener('click', openProfile);

closeButton.addEventListener('click', closeProfile);

formElement.addEventListener('submit', formSubmitHandler);

likeButton.addEventListener("click", likeElement); //работает только для первой кнопки like
