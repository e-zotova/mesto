import {openPopup} from './index.js';

 export default class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);

    return cardElement;
  }

  _handleImageClick() {
    const imagePopup = document.querySelector('.popup_image-view');
    const bigImage = document.querySelector('.popup__big-image');
    const caption = document.querySelector('.popup__caption');

    openPopup(imagePopup);
    bigImage.src = this._link;
    bigImage.alt = this._name;
    caption.textContent = this._name;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector('.places__image');
    const likeButton = this._element.querySelector('.places__like-button');
    const deleteButton = this._element.querySelector('.places__delete-button');

    cardImage.addEventListener('click', this._handleImageClick);

    likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('places__like-button_active');
    });

    deleteButton.addEventListener('click', function (evt) {
      evt.target.closest('.places__card').remove();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardName = this._element.querySelector('.places__name');
    const cardImage = this._element.querySelector('.places__image');
    this._setEventListeners();

    cardName.textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }
}
