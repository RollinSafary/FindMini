import { SCENE_GAME, SCENE_LEVEL, SCENE_NAVIGATION } from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import LevelScene from './LevelScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import GameSceneMediator from './GameSceneMediator'
import GameScene from './GameScene'
import FindMiniFacade from '../../FindMiniFacade'

export default class LevelSceneMediator extends FindMiniSceneMediator {
  static NAME = 'LevelSceneMediator'

  constructor (viewComponent) {
    super(LevelSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [NavigationScene.START_GAME, PlayerVOProxy.LEVEL_COMPLETE, GameScene.LEVEL_FAILED]
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case GameScene.LEVEL_FAILED:
      case PlayerVOProxy.LEVEL_COMPLETE:
      case NavigationScene.START_GAME:
        window.game.scene.start(SCENE_LEVEL)
        const soundState = this.playerVOProxy.vo.settings.mute
        this.viewComponent.setSoundState(!soundState)
        this.viewComponent.createLevels(this.playerVOProxy.vo.level, this.playerVOProxy.vo.maxLevelCount)
        break
    }
  }

  onLevelClick (level) {
    if (this.playerVOProxy.vo.level < level) {
      return
    }
    this.sendNotification(LevelScene.START_LEVEL, level)
    window.game.scene.stop(SCENE_LEVEL)
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on(
      'onLevelClick',
      this.onLevelClick,
      this,
    )
    this.viewComponent.events.on('musicOff', this.onMusicOff, this)
    this.viewComponent.events.on('musicOn', this.onMusicOn, this)
    this.viewComponent.events.on('menuClicked', this.onMenuClicked, this)
  }

  onMusicOff () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, false)
  }
  onMusicOn () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, true)
  }

  onMenuClicked () {
    this.sendNotification(LevelScene.MENU_CLICKED)
    window.game.scene.stop(SCENE_LEVEL)
  }
}
