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

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    this._element.querySelector('.places__name').textContent = this._name;
    this._element.querySelector('.places__image').src = this._link;
    this._element.querySelector('.places__image').alt = this._name;

    return this._element;
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
    this._element.querySelector('.places__image').addEventListener('click', () => {
      this._handleImageClick();
    });
  }
}
