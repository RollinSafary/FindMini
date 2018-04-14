import { SCENE_LEVEL, SCENE_LOADING, SCENE_NAVIGATION, SCENE_SETTINGS } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelSceneMediator from './LevelSceneMediator'
import LoadingScene from './LoadingScene'
import FindMiniFacade from '../../FindMiniFacade'
import LevelScene from './LevelScene'
import SettingsScene from "./SettingsScene";
export default class SettingsSceneMediator extends FindMiniSceneMediator {
  static NAME = 'SettingsSceneMediator'

  constructor (viewComponent) {
    super(SettingsSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
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
      'menuClicked',
      this.onMenuClicked,
      this,
    )
  }

  listNotificationInterests () {
    return [NavigationScene.SETTINGS]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case NavigationScene.SETTINGS:
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        this.gameScene.start(SCENE_SETTINGS)
        this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
        break
    }
  }

  onMusicOn () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, true)
  }

  onMusicOff () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, false)
  }

  onMenuClicked () {
    this.sendNotification(SettingsScene.MENU)
    this.gameScene.stop(SCENE_SETTINGS)
  }

  get events () {
    return this.viewComponent.events
  }
}
