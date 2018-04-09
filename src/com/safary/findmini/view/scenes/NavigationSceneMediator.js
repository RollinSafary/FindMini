import { SCENE_LEVEL, SCENE_NAVIGATION } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelSceneMediator from './LevelSceneMediator'
export default class NavigationSceneMediator extends FindMiniSceneMediator {
  static NAME = 'NavigationSceneMediator'

  constructor (viewComponent) {
    super(NavigationSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.viewComponent.events.on(
      'onStartGameClick',
      this.onStartGameClick,
      this,
    )
  }

  listNotificationInterests () {
    return [BootScene.LOAD_COMPLETE]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        this.viewComponent.createBackground(this.playerVOProxy.vo.theme)
        window.game.scene.start(SCENE_NAVIGATION)
        break
    }
  }

  onStartGameClick () {
    this.registerLevelSceneMediator()
    this.sendNotification(NavigationScene.START_GAME)
  }

  registerLevelSceneMediator () {
    if (this.facade.hasMediator(LevelSceneMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new LevelSceneMediator(null))
  }
}
