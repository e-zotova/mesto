import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {

  constructor({popup, handleFormSubmit}) {
    super(popup);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.input'));
    this._saveButton = this._popup.querySelector('.popup__save-button')
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues(), this._saveButton);
    })
  }

  close() {
    super.close();
    this._form.reset();
  }
}
