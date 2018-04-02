export default class UserVO {
  constructor (key, username, photo) {
    this._key = key
    this._username = username
    this._photo = photo
  }

  get key () {
    return this._key
  }

  get username () {
    return this._username
  }

  set username (value) {
    this._username = value
  }

  get photo () {
    return this._photo
  }

  set photo (value) {
    this._photo = value
  }
}
