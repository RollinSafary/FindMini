import { Proxy } from '@koreez/pure-mvc'
import 'whatwg-fetch'
import UserVO from './vo/UserVO'
import { A_DAY_IN_MILLISECONDS, BASE_URI } from '../constants/Constants'
import { RetentionData } from './vo/PlayerVO'
import firebase from 'firebase'
import 'firebase/firestore'
import {
  urlWithParams,
  getFirebaseDataAsync,
  setFirebaseDataAsync,
} from '../utils/utils'
import _ from 'lodash'
import { PLAYER_COLLECTION_NAME } from '../FindMiniGame'
import moment from 'moment'
import Phaser from 'phaser'

export default class PlayerVOProxy extends Proxy {
  static NAME = 'PlayerVOProxy'
  //
  static INITIALIZE_SUCCESS = PlayerVOProxy.NAME + 'InitializeSuccess'
  static INITIALIZE_FAIL = PlayerVOProxy.NAME + 'InitializeFail'
  static SAVE_SUCCESS = PlayerVOProxy.NAME + 'SaveSuccess'
  static SAVE_FAIL = PlayerVOProxy.NAME + 'SaveFail'

  static FRIENDS_READY = PlayerVOProxy.NAME + 'FriendsReady'
  static FRIENDS_DISTRIBUTED = PlayerVOProxy.NAME + 'FriendsDistributed'

  static LEVEL_COMPLETE = PlayerVOProxy.NAME + 'LevelComplete'

  constructor (playerVO) {
    super(PlayerVOProxy.NAME, playerVO)
    this._throttleSave = _.throttle(this._save.bind(this), 2000, {
      trailing: true,
      leading: true,
    })
    this.vo.theme = Phaser.Math.Between(0, 1)
  }

  get vo () {
    return this.getData()
  }

  async initialize () {
    try {
      const json = await this._authenticateMe()
      console.log('PlayerVOProxy initialize : ', json)
      if (!json) {
        this.sendNotification(PlayerVOProxy.INITIALIZE_SUCCESS)
        return
      }
      this.vo.retentionData = json.retentionData || new RetentionData(-1, 1)
      this._checkForRetention()
      this.sendNotification(PlayerVOProxy.INITIALIZE_SUCCESS)
    } catch (error) {
      console.error(error)

      this.sendNotification(PlayerVOProxy.INITIALIZE_FAIL)
    }
  }

  setName (name) {
    this.vo.name = name
  }

  setPhoto (photo) {
    this.vo.photo = photo
  }

  async save () {
    this._throttleSave()
  }

  addFriends (userVO) {
    this.vo.friends.push(...userVO)
    this.sendNotification(PlayerVOProxy.FRIENDS_READY)
  }

  getFriend (friendId) {
    const friends = this.vo.friends
    for (const theFriend of friends) {
      if (theFriend.key === friendId) {
        return theFriend
      }
    }
    return new UserVO('-1', 'Player', '-1')
  }

  getFriendName (friendId) {
    return this.getFriend(friendId).username
  }

  async _save () {
    try {
      await setFirebaseDataAsync(`${PLAYER_COLLECTION_NAME}/${this.vo.key}`, {
        retentionData: {
          time: this.vo.retentionData.time,
          retainedDay: this.vo.retentionData.retainedDay,
        },
        installTimestemp: this.vo.installTimestemp,
        name: this.vo.name,
        // locale: getUserLanguage(),
        // timestemp: moment.utc().valueOf(),
      })
      this.sendNotification(PlayerVOProxy.SAVE_SUCCESS)
    } catch (error) {
      this.sendNotification(PlayerVOProxy.SAVE_FAIL)
    }
  }

  _checkForRetention () {
    const retentionData = this.vo.retentionData
    const now = moment.utc().valueOf()
    if (retentionData.time === -1) {
      this._updateRetention(true)
      return
    }
    const deyDiff = now - retentionData.time
    if (deyDiff <= A_DAY_IN_MILLISECONDS) {
      // TODO: highest retention day!
      // this.unlimitedEnergy = retentionData.retainedDay === 5
      return
    }
    if (deyDiff <= 2 * A_DAY_IN_MILLISECONDS) {
      // this._upRetention(false)
      return
    }
    this._updateRetention(true)
  }

  _updateRetention (reset) {
    const retentionData = this.vo.retentionData
    retentionData.retainedDay = reset ? 1 : retentionData.retainedDay + 1
    if (retentionData.retainedDay > 5) {
      this._updateRetention(true)
      return
    }
    retentionData.time = moment.utc().valueOf()
    this.vo.hasRetentionBonus = true
    console.log(`updateRetention : retainedDay=${retentionData.retainedDay}`)
  }

  _authenticateMe () {
    return new Promise(async (resolve, reject) => {
      // const playerInfo = await FBInstant.player.getSignedPlayerInfoAsync(
      //   'chat_royal',
      // )
      const verification = await fetch(
        urlWithParams(`${BASE_URI}/authenticate`, {
          id: 'someID', // playerInfo.getPlayerID(),
          signature: 'someSignature', // playerInfo.getSignature(),
        }),
      )
      const verificationJson = await verification.json()
      if (verificationJson.error) {
        console.error(verificationJson.error.message)
        reject(verificationJson.error)
        return
      }
      const success = await firebase
        .auth()
        .signInWithCustomToken(verificationJson.token)
      if (
        success.message ||
        !firebase.auth().currentUser ||
        !firebase.auth().currentUser.uid
      ) {
        reject(verificationJson.error)
        return
      }
      const doc = await getFirebaseDataAsync(
        `${PLAYER_COLLECTION_NAME}/${this.vo.key}`,
      )
      resolve(doc.exists ? doc.data() : {})
    })
  }

  levelInfo (level) {
    return {
      SimpleSphere: level + parseInt(level / 3),
      DoubleTapSimpleSphere: parseInt(level / 5),
      DoubleTapDangerButton: parseInt(level / 10),
      GiftSphere: 1,
    }
  }

  levelComplete (level) {
    if (this.vo.level === level) {
      this.vo.level++
    }
    this.sendNotification(PlayerVOProxy.LEVEL_COMPLETE)
  }
}
