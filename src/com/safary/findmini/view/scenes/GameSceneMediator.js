import { OBJECT_TYPES } from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from "../../model/PlayerVOProxy";

export default class GameSceneMediator extends FindMiniSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor (viewComponent) {
    super(GameSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.viewComponent.events.on('levelComplete', this.onLevelComplete, this)
    this.viewComponent.events.on('okayButtonClicked', this.createLevel, this)
  }

  listNotificationInterests () {
    return [NavigationScene.START_GAME]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case NavigationScene.START_GAME:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        const level = this.playerVOProxy.vo.level
        const levelInfo = this.playerVOProxy.levelInfo()
        this.viewComponent.showConditions(level, levelInfo)
        break
    }
  }

  createOptionsArray (levelInfo) {
    const options = []
    const keys = Object.keys(levelInfo)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const count = levelInfo[key]
      for (let j = 0; j < count; j++) {
        options.push(OBJECT_TYPES[key])
      }
    }
    return options
  }

  createLevel (conditionsView) {
    const levelInfo = this.playerVOProxy.levelInfo()
    const options = this.createOptionsArray(levelInfo)
    this.viewComponent.startNewGame(conditionsView, options)
  }

  onLevelComplete () {
    console.warn('levelComplete')
  }
}
