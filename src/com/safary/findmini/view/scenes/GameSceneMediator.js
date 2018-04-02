import { SCENE_GAME } from '../../constants/Constants'
import BootScene from './BootScene'
import FingerBallsSceneMediator from './FingerBallsSceneMediator'

export default class GameSceneMediator extends FingerBallsSceneMediator {
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
