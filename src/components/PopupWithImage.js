import { bigImage, caption } from "../utils/constants.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup, name, link) {
    super(popup);
		this._link = link;
    this._name = name;
	}

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', this._handleEscClose.bind(this));
    bigImage.src = this._link;
    bigImage.alt = this._name;
    caption.textContent = this._name;
  }
}
