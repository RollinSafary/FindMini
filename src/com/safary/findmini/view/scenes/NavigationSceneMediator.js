import { SCENE_GAME, SCENE_NAVIGATION } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from "./NavigationScene";

export default class NavigationSceneMediator extends FindMiniSceneMediator {
  static NAME = 'NavigationSceneMediator'

  constructor (viewComponent) {
    super(NavigationSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.viewComponent.events.on('onStartGameClick', this.onStartGameClick, this)
  }

  listNotificationInterests () {
    return [BootScene.LOAD_COMPLETE]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE:
        // window.game.scene.start(SCENE_NAVIGATION)
        break
    }
  }

  onStartGameClick () {
    window.game.scene.start(SCENE_GAME)
    window.game.scene.stop(SCENE_NAVIGATION)
    this.sendNotification(NavigationScene.START_GAME)
  }
}
