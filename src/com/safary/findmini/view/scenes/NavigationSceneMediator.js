import { SCENE_LEVEL, SCENE_LOADING, SCENE_NAVIGATION } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelSceneMediator from './LevelSceneMediator'
import LoadingScene from './LoadingScene'
import FindMiniFacade from '../../FindMiniFacade'
import LevelScene from './LevelScene'
export default class NavigationSceneMediator extends FindMiniSceneMediator {
  static NAME = 'NavigationSceneMediator'

  constructor (viewComponent) {
    super(NavigationSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.events.on(
      'onStartGameClick',
      this.onStartGameClick,
      this,
    )
    this.events.on(
      'musicOff',
      this.onMusicOff,
      this,
    )
    this.events.on(
      'musicOn',
      this.onMusicOn,
      this,
    )
  }

  listNotificationInterests () {
    return [LoadingScene.SHUTDOWN, LevelScene.MENU_CLICKED]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case LoadingScene.SHUTDOWN:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        window.game.scene.start(SCENE_NAVIGATION)
        this.viewComponent.createScore(this.playerVOProxy.vo.score)
        this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
        break
      case LevelScene.MENU_CLICKED:
        window.game.scene.start(SCENE_NAVIGATION)
        this.viewComponent.createScore(this.playerVOProxy.vo.score)
        this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
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

  onMusicOn () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, true)
  }

  onMusicOff () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, false)
  }

  get events () {
    return this.viewComponent.events
  }
}
