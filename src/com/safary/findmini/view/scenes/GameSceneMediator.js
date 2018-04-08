import { OBJECT_TYPES } from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'

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
        // window.game.scene.start(SCENE_GAME)
        const levelInfo = {
          SimpleSphere: 3,
          DoubleTapSimpleSphere: 1,
        }
        const level = 1
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
    const levelInfo = {
      SimpleSphere: 3,
      DoubleTapSimpleSphere: 1,
    }
    const options = this.createOptionsArray(levelInfo)
    this.viewComponent.startNewGame(conditionsView, options)
  }

  onLevelComplete () {
    console.warn('levelComplete')
  }
}
