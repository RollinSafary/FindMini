import { SCENE_BOOT, SCENE_LOADING } from '../../constants/Constants'
import FindMiniFacade from '../../FindMiniFacade'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'

export default class BootSceneMediator extends FindMiniSceneMediator {
  static NAME = 'BootSceneMediator'

  constructor (viewComponent) {
    super(BootSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [FindMiniFacade.STARTUP]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case FindMiniFacade.STARTUP:
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
