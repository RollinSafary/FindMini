import UserVO from './UserVO'
import moment from 'moment'

export default class PlayerVO extends UserVO {
  constructor (key, username, photo) {
    super(key, username, photo)

    this._installTimestamp = moment.utc().valueOf()
    this._retentionData = new RetentionData(-1, 1)
    this._retentionBonus = false
    this._friends = []
    this._sessionNumber = -1
    this._level = 1
    this._maxLevelCount = 45
    this._score = 0
    this._theme = 0
    this._settings = {
      mute: true,
    }
  }

  set installTimestamp (value) {
    this._installTimestamp = value || moment.utc().valueOf()
  }

  set sessionNumber (value) {
    this._sessionNumber = value !== undefined ? value + 1 : 0
  }

  set retentionData (value) {
    this._retentionData = value
  }

  set hasRetentionBonus (value) {
    this._retentionBonus = value
  }

  set level (value) {
    this._level = value || 1
  }

  set score (value) {
    this._score = value || 0
  }

  set theme (value) {
    this._theme = value
  }

  set settings (value) {
    this._settings = value
  }
  // ---------------------------- GETTERS -------------------------------
  get installTimestamp () {
    return this._installTimestamp
  }

  get settings () {
    return this._settings
  }

  get theme () {
    return this._theme
  }

  get friends () {
    return this._friends
  }

  get friendsIds () {
    const keys = []
    this.friends.forEach(theFriend => {
      keys.push(theFriend.key)
    })
    return keys
  }

  get sessionNumber () {
    return this._sessionNumber
  }

  get retentionData () {
    return this._retentionData
  }

  get hasRetentionBonus () {
    return this._retentionBonus
  }

  get retainedDay () {
    return this.retentionData.retainedDay
  }

  get isNewInstall () {
    return !(this.pets.length > 0)
  }

  get level () {
    return this._level
  }

  get score () {
    return this._score
  }

  get maxLevelCount () {
    return this._maxLevelCount
  }
}

export class RetentionData {
  constructor (time, retainedDay) {
    this.time = time
    this.retainedDay = retainedDay
  }
}
