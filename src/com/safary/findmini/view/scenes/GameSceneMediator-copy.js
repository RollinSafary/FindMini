import { SCENE_GAME } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'

export default class GameSceneMediator extends FindMiniSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor (viewComponent) {
    super(GameSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [BootScene.LOAD_COMPLETE]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE:
        window.game.scene.start(SCENE_GAME)
        break
    }
  }
}
