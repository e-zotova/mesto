//this class is for opening and closing popups
import { closeButtons } from "../utils/constants.js";
export default class Popup {
  constructor(popup) {
    this._popup = popup;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));

  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners(evt) {
    closeButtons.forEach(button => {
      button.addEventListener('click', function(evt) {
        const popup = new Popup(evt.target.closest('.popup'));
        popup.close();
      });
    });


    if (evt.target.classList.contains('popup')) {
      const popup = new Popup(evt.target.closest('.popup'));
      popup.close();
    };
  }
}
