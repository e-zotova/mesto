import { bigImage, caption } from "../utils/constants.js";
import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
	}

  open(name, link) {
    super.open();
    bigImage.src = link;
    caption.textContent = name;
    bigImage.alt = name;
  }
}
