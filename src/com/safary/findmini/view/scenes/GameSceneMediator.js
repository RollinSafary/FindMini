import { SCENE_GAME, OBJECT_TYPES } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from "./NavigationScene";

export default class GameSceneMediator extends FindMiniSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor (viewComponent) {
    super(GameSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.viewComponent.events.on('levelComplete', this.onLevelComplete, this)
  }

  listNotificationInterests () {
    return [BootScene.LOAD_COMPLETE]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE:
        window.game.scene.start(SCENE_GAME)
        const levelInfo = {
          SimpleSphere: 3,
          DoubleTapSimpleSphere: 1,
        }
        const options = this.createOptionsArray(levelInfo)
        this.viewComponent.startNewGame(options)
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

  onLevelComplete () {
    console.warn('levelComplete')
  }
}
