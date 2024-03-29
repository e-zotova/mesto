 export default class Card {
  constructor(data, templateSelector, handleCardClick, handleConfirmDelete,
              likeCard, unlikeCard, userId) {
    this._id = data._id;
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._alt = data.alt;
    this._likesArray = data.likes;
    this._handleCardClick = handleCardClick;
    this._handleConfirmDelete = handleConfirmDelete;
    this._likeCard = likeCard;
    this._unlikeCard = unlikeCard;
    this._owner = data.owner;
    this._userId = userId;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .cloneNode(true);

    return cardElement;
  }

  _showLikedCards(likesArray, likeButton) {
    likesArray.find(like => {
      if(like._id === this._userId) {
        likeButton.classList.toggle('places__like-button_active');
      }
    });
  }

  _showDeleteButton(owner, deleteButton) {
    if(this._userId === owner._id) {
      deleteButton.style.display = 'block';
    } else {
      deleteButton.style.display = 'none';
    }
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener('click', (evt) => {
      if(!evt.target.classList.contains('places__like-button_active')) {
        this._likeCard(this._id, this._likeCounter, this._likeButton);
      } else {
        this._unlikeCard(this._id, this._likeCounter, this._likeButton)
      }
    });

    this._deleteButton.addEventListener('click', () => {
      this._handleConfirmDelete(this._id, this._cardElement);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardElement = this._element.querySelector('.places__card');
    this._cardName = this._element.querySelector('.places__name');
    this._cardImage = this._element.querySelector('.places__image');
    this._likeButton = this._element.querySelector('.places__like-button');
    this._likeCounter = this._element.querySelector('.places__like-counter');
    this._deleteButton = this._element.querySelector('.places__delete-button');
    this._setEventListeners();
    this._showDeleteButton(this._owner, this._deleteButton);
    this._showLikedCards(this._likesArray, this._likeButton);

    this._cardName.textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._likeCounter.textContent = this._likesArray.length;

    return this._element;
  }
}
