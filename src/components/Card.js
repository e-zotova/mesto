import PopupWithImage from "./PopupWithImage.js";
import { imagePopup } from "../utils/constants.js";

 export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    const cardImage = this._element.querySelector('.places__image');
    const likeButton = this._element.querySelector('.places__like-button');
    const deleteButton = this._element.querySelector('.places__delete-button');

    cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

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
