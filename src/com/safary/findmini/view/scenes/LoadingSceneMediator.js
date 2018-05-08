import { SCENE_BOOT, SCENE_LOADING } from '../../constants/Constants'
import FindMiniFacade from '../../FindMiniFacade'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LoadingScene from './LoadingScene'

export default class LoadingSceneMediator extends FindMiniSceneMediator {
  static NAME = 'LoadingSceneMediator'

  constructor (viewComponent) {
    super(LoadingSceneMediator.NAME, viewComponent)
  }

  onSceneStart () {
    this.sendNotification(LoadingScene.SCENE_START)
    super.onSceneStart()
  }

  listNotificationInterests () {
    return [BootScene.START, BootScene.FILE_LOAD_COMPLETE, PlayerVOProxy.INITIALIZE_SUCCESS]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case BootScene.START:
        window.game.scene.start(SCENE_LOADING)
        break
      case BootScene.FILE_LOAD_COMPLETE:
        const progress = args[0]
        this.viewComponent.setProgress(progress)
        break
      case PlayerVOProxy.INITIALIZE_SUCCESS:
        this.sendNotification(LoadingScene.LOAD_COMPLETE)
        if (window.game.scene.isActive(SCENE_LOADING)) {
          window.game.scene.stop(SCENE_LOADING)
        }
        break
    }
  }
}
