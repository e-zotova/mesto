export default class Card {
  constructor(name, link, alt) {
    this._name = name;
    this._link = link;
    this._alt = alt;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector('#card-template')
    .content
    .cloneNode(true);

  // вернём DOM-элемент карточки
    return cardElement;
  }
}
