//this class is for opening and closing popups
import { popupOverlays, closeButtons } from "../utils/constants.js";
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

  setEventListeners() {
    popupOverlays.forEach((overlay) => {
      overlay.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
          this.close();
        }
      });
    })

    closeButtons.forEach(button => {
      button.addEventListener('click', () => {
        this.close();
      });
    });
  }
}
