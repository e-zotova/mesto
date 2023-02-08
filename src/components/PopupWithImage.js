import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._bigImage = popup.querySelector('.popup__big-image');
    this._caption = popup.querySelector('.popup__caption');
	}

  open(name, link) {
    console.log(this._bigImage);
    super.open();
    this._bigImage.src = link;
    this._caption.textContent = name;
    this._bigImage.alt = name;
  }
}
