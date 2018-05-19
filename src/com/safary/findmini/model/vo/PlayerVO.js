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
    this._levelsInfo = {}
    this._maxLevelCount = 45
    this._score = 0
    this._theme = 0
    this._settings = {
      mute: true,
    }
  }

  set installTimestamp (value) {
    if (!value) {
      return
    }
    this._installTimestamp = value || moment.utc().valueOf()
  }

  set sessionNumber (value) {
    if (!value) {
      return
    }
    this._sessionNumber = value !== undefined ? value + 1 : 0
  }

  set retentionData (value) {
    if (!value) {
      return
    }
    this._retentionData = value
  }

  set hasRetentionBonus (value) {
    if (!value) {
      return
    }
    this._retentionBonus = value
  }

  set level (value) {
    this._levelsInfo[value.level] = value.stars
  }

  set levelInfo (value) {
    this._levelsInfo = value || {}
  }

  set score (value) {
    if (!value) {
      return
    }
    this._score = value || 0
  }

  set theme (value) {
    if (!value) {
      return
    }
    this._theme = value
  }

  set settings (value) {
    if (!value) {
      return
    }
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
    return Object.keys(this._levelsInfo).length + 1
  }
  get levelInfo () {
    return this._levelsInfo
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
