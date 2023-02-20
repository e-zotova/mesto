 export default class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmDelete) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._likes = data.likes.length;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDelete = handleConfirmDelete;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('places__like-button_active');
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleConfirmDelete(this._id);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardName = this._element.querySelector('.places__name');
    this._cardImage = this._element.querySelector('.places__image');
    this._likeButton = this._element.querySelector('.places__like-button');
    this._likeCounter = this._element.querySelector('.places__like-counter');
    this._deleteButton = this._element.querySelector('.places__delete-button');
    this._setEventListeners();

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likes;

    return this._element;
  }
}
