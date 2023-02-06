//this class is to insert elements
export default class Section {
  constructor({ items, renderer }, selector) {
    //items - массив данных, которые нужно добавить на страницу при инициализации класса
    this._items = items;
    //renderer - функция, которая отвечает за создание и отрисовку данных на странице
    this._renderer = renderer;
    //selector - селектор контейнера, в который нужно добавлять созданные элементы
    this._container = selector;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(element) {
    this._items.length === 1 ? this._container.prepend(element) : this._container.append(element);
  }
}
