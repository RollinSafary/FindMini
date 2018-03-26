import { SCENE_BOOT } from '../../constants/Constants'
import FingerBallsFacade from '../../FingerBallsFacade'
import BootScene from './BootScene'
import FingerBallsSceneMediator from './FingerBallsSceneMediator'

export default class BootSceneMediator extends FingerBallsSceneMediator {
  static NAME = 'BootSceneMediator'

  constructor (viewComponent) {
    super(BootSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [FingerBallsFacade.STARTUP]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case FingerBallsFacade.STARTUP:
        this.viewComponent.events.on('loadComplete', this.onLoadComplete, this)
        this.viewComponent.events.on(
          'fileLoadComplete',
          this.onFileLoadComplete,
          this,
        )
        window.game.scene.start(SCENE_BOOT)
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
