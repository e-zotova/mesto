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

  setUserInfo (name, job) {
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setUserAvatar(avatar) {
    this._avatar.src = avatar;
  }
}
