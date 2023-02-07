// this class is to change user info on the page
export default class UserInfo {
  constructor(nameSelector, jobSelector) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    };

    return userInfo;
  }

  setUserInfo (data) {
    this._name.textContent = data.username;
    this._job.textContent = data.userjob;
  }
}
