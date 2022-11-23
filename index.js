//open popup
let content = document.querySelector('.content');
let editButton = content.querySelector('.button__edit');
let popup = content.querySelector('.popup');


//edit profile
let editProfileWindow = content.querySelector('.popup__container');
let fullNameInput = editProfileWindow.querySelector('.input_type_full-name');
let occupationInput = editProfileWindow.querySelector('.input_type_occupation');
let saveButton = editProfileWindow.querySelector('.button__save');
let closeButton = content.querySelector('.button__close');

//imputs filled from profile
let fullName = document.querySelector('.profile__full-name');
fullNameInput.value = fullName.textContent;

let occupation = document.querySelector('.profile__occupation');
occupationInput.value = occupation.textContent;

let likeButton = content.querySelector('.button__like');

//functions
function openProfile() {
  popup.classList.add('popup_opened');
}

function closeProfile() {
  popup.classList.remove('popup_opened');
}

function likeElement() {
  likeButton.classList.add('button__like_active');
}

//eventListeners
editButton.addEventListener('click', openProfile);

closeButton.addEventListener('click', closeProfile);

likeButton.addEventListener("click", likeElement); //работает только для первой кнопки like
