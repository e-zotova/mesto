export default class UserInfo {
  constructor(name, job, avatar) {
    this._name = name;
    this._job = job;
    this._avatar = avatar;
  }

  getUserInfo() {
    const userInfo = {
      name: this._name.textContent,
      job: this._job.textContent
    };

    return userInfo;
  }

  getUserId() {
    return this._id;
  }

  setUserInfo (result) {
    this._name.textContent = result.name;
    this._job.textContent = result.about;
    this._avatar.src = result.avatar;
    this._id = result._id;
  }
}
