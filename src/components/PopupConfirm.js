import Popup from "./Popup";

export default class PopupConfirm extends Popup {
  constructor({popup, handleSubmit}) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this._handleSubmit = handleSubmit;
  }

open(cardId) {
  super.open();
  this._cardId = cardId;
}

setEventListeners() {
  super.setEventListeners();

  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleSubmit(this._cardId);
  });
 }
}
