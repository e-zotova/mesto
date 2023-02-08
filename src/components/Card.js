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
    this._cardImage = this._element.querySelector('.places__image');
    this._likeButton = this._element.querySelector('.places__like-button');
    this._deleteButton = this._element.querySelector('.places__delete-button');

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', function (evt) {
      evt.target.classList.toggle('places__like-button_active');
    });

    this._deleteButton.addEventListener('click', function (evt) {
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
