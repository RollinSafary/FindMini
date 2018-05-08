import { SCENE_LEVEL, SCENE_LOADING, SCENE_NAVIGATION } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelSceneMediator from './LevelSceneMediator'
import LoadingScene from './LoadingScene'
import FindMiniFacade from '../../FindMiniFacade'
import LevelScene from './LevelScene'
import SettingsScene from './SettingsScene'
import HardcoreScene from './HardcoreScene'
import HardcoreSceneMediator from './HardcoreSceneMediator'
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
      'onHardcoreClick',
      this.onHardcoreClick,
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
    this.events.on(
      'onSettingsClick',
      this.onSettingsClick,
      this,
    )
  }

  listNotificationInterests () {
    return [LoadingScene.SHUTDOWN, SettingsScene.MENU, HardcoreScene.GAME_OVER, LevelScene.MENU_CLICKED]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case LoadingScene.SHUTDOWN:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        window.game.scene.start(SCENE_NAVIGATION)
        this.viewComponent.createScore(this.playerVOProxy.vo.score)
        // this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
        break
      case HardcoreScene.GAME_OVER:
      case SettingsScene.MENU:
      case LevelScene.MENU_CLICKED:
        window.game.scene.start(SCENE_NAVIGATION)
        this.viewComponent.createScore(this.playerVOProxy.vo.score)
        // this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
        break
    }
  }

  onStartGameClick () {
    this.registerLevelSceneMediator()
    this.sendNotification(NavigationScene.START_GAME)
    this.gameScene.stop(SCENE_NAVIGATION)
  }

  registerLevelSceneMediator () {
    if (this.facade.hasMediator(LevelSceneMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new LevelSceneMediator(null))
  }

  registerHardcoreSceneMediator () {
    if (this.facade.hasMediator(HardcoreScene.NAME)) {
      return
    }
    this.facade.registerMediator(new HardcoreSceneMediator(null))
  }

  onMusicOn () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, true)
  }

  onMusicOff () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, false)
  }

  onSettingsClick () {
    this.sendNotification(NavigationScene.SETTINGS)
    this.gameScene.stop(SCENE_NAVIGATION)
  }

  onHardcoreClick () {
    this.registerHardcoreSceneMediator()
    this.sendNotification(NavigationScene.HARDCORE)
    this.gameScene.stop(SCENE_NAVIGATION)
  }

  get events () {
    return this.viewComponent.events
  }
}
