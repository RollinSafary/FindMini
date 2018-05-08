import { SCENE_BOOT } from '../../constants/Constants'
import FindMiniFacade from '../../FindMiniFacade'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import PlayerVOProxy from '../../model/PlayerVOProxy'

export default class BootSceneMediator extends FindMiniSceneMediator {
  static NAME = 'BootSceneMediator'

  constructor (viewComponent) {
    super(BootSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.viewComponent.events.on('loadComplete', this.onLoadComplete, this)
    this.viewComponent.events.on(
      'fileLoadComplete',
      this.onFileLoadComplete,
      this,
    )
    window.game.scene.start(SCENE_BOOT)
  }

  listNotificationInterests () {
    return [
      PlayerVOProxy.INITIALIZE_SUCCESS,
      FindMiniFacade.GAME_SOUND,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case PlayerVOProxy.INITIALIZE_SUCCESS:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        this.sendNotification(
          BootScene.THEME_CHOOSE,
          this.viewComponent.themeNumber,
        )
        this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
        break
      case FindMiniFacade.GAME_SOUND:
        this.viewComponent.setSoundState(args[0])
        break
    }
  }

  onFileLoadComplete (progress) {
    this.facade.sendNotification(BootScene.FILE_LOAD_COMPLETE, progress > 97 ? 97 : progress)
  }

  onLoadComplete () {
    this.facade.sendNotification(BootScene.LOAD_COMPLETE)
  }
}
