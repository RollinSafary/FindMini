import { SCENE_GAME } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import SimpleSphere from '../Components/SimpleSphere'
import DoubleTapSimpleSphere from '../Components/DoubleTapSimpleSphere'

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
        const options = [
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          SimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
          DoubleTapSimpleSphere,
        ]
        this.viewComponent.startNewGame(options)
        break
    }
  }
}
