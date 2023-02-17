const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  } else {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export class Api {
  constructor(config) {
    this._headers = config.headers;
    this._baseUrl = config.baseUrl
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(handleResponse)
  }

  createCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data)
    })
      .then(handleResponse)
  }

  deleteCard() {

  }
}

export const apiConfig = {
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "095d3f4f-e15b-43ab-9be7-70fc7024aa3b",
    'Content-Type': 'application/json'
  }
}
