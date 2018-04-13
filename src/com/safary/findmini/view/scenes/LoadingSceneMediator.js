import { SCENE_BOOT, SCENE_LOADING } from '../../constants/Constants'
import FindMiniFacade from '../../FindMiniFacade'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import PlayerVOProxy from '../../model/PlayerVOProxy'

export default class LoadingSceneMediator extends FindMiniSceneMediator {
  static NAME = 'LoadingSceneMediator'

  constructor (viewComponent) {
    super(LoadingSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [BootScene.START, BootScene.LOAD_COMPLETE, PlayerVOProxy.INITIALIZE_SUCCESS]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case BootScene.START:
        window.game.scene.start(SCENE_LOADING)
        break
      case BootScene.LOAD_COMPLETE:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        break
      case PlayerVOProxy.INITIALIZE_SUCCESS:
        if (window.game.scene.isActive(SCENE_LOADING)) {
          window.game.scene.stop(SCENE_LOADING)
        }
        break
    }
  }

  onFileLoadComplete (progress) {
    this.facade.sendNotification(BootScene.FILE_LOAD_COMPLETE, progress)
  }

  onLoadComplete () {
    this.facade.sendNotification(BootScene.LOAD_COMPLETE)
  }
}
