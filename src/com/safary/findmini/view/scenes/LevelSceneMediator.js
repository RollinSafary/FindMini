import { SCENE_LEVEL } from '../../constants/Constants'
import GameOverPopup from '../Components/Popups/GameOverPopup'
import GameNavigationView from '../Components/TopBars/GameNavigationView'
import LevelNavigationView from '../Components/TopBars/LevelNavigationView'
import LevelNavigationViewMediator
  from '../Components/TopBars/LevelNavigationViewMediator'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import LevelScene from './LevelScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'

export default class LevelSceneMediator extends FindMiniSceneMediator {
  static NAME = 'LevelSceneMediator'

  constructor (viewComponent) {
    super(LevelSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [
      NavigationScene.START_GAME,
      PlayerVOProxy.LEVEL_COMPLETE,
      GameNavigationView.MENU_CLICKED,
      GameOverPopup.BACK_CLICKED,
      LevelNavigationView.MENU_CLICKED,
    ]
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  onRemove () {
    this.removeLevelNavigationViewMediator()
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case GameNavigationView.MENU_CLICKED:
      case GameOverPopup.BACK_CLICKED:
      case PlayerVOProxy.LEVEL_COMPLETE:
      case NavigationScene.START_GAME:
        window.game.scene.start(SCENE_LEVEL)
        this.viewComponent.createLevels(this.playerVOProxy.vo.level, this.playerVOProxy.vo.maxLevelCount)
        this.registerLevelNavigationViewMediator()
        this.sendNotification(LevelScene.SHOW_NAVIGATION)
        break
      case LevelNavigationView.MENU_CLICKED:
        this.stopScene()
        break
    }
  }

  onLevelClick (level) {
    if (this.playerVOProxy.vo.level < level) {
      return
    }
    this.sendNotification(LevelScene.START_LEVEL, level)
    this.stopScene()
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on(
      'onLevelClick',
      this.onLevelClick,
      this,
    )
  }

  stopScene () {
    this.removeLevelNavigationViewMediator()
    window.game.scene.stop(SCENE_LEVEL)
  }

  registerLevelNavigationViewMediator () {
    if (this.facade.hasMediator(LevelNavigationViewMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new LevelNavigationViewMediator(null))
  }
  removeLevelNavigationViewMediator () {
    if (!this.facade.hasMediator(LevelNavigationViewMediator.NAME)) {
      return
    }
    this.facade.removeMediator(LevelNavigationViewMediator.NAME)
  }
}
