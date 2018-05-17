import { SCENE_NAVIGATION } from '../../constants/Constants'
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
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
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
    super.onRegister()
  }

  listNotificationInterests () {
    return [PlayerVOProxy.INITIALIZE_SUCCESS, LoadingScene.SHUTDOWN, SettingsScene.MENU, HardcoreScene.GAME_OVER, LevelScene.MENU_CLICKED]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case LoadingScene.SHUTDOWN:
        window.game.scene.start(SCENE_NAVIGATION)
        this.setValues()
        break
      case HardcoreScene.GAME_OVER:
      case SettingsScene.MENU:
      case LevelScene.MENU_CLICKED:
        window.game.scene.start(SCENE_NAVIGATION)
        this.setValues()
        break
    }
  }

  setValues () {
    this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
    this.viewComponent.setScore(this.playerVOProxy.vo.score)
  }

  onStartGameClick () {
    this.registerLevelSceneMediator()
    this.sendNotification(NavigationScene.START_GAME)
    this.scenes.stop(SCENE_NAVIGATION)
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
    this.scenes.stop(SCENE_NAVIGATION)
  }

  onHardcoreClick () {
    this.registerHardcoreSceneMediator()
    this.sendNotification(NavigationScene.HARDCORE)
    this.scenes.stop(SCENE_NAVIGATION)
  }

  get events () {
    return this.viewComponent.events
  }
}
