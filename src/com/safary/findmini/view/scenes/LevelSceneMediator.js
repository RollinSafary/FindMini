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
    super.onRegister()
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case GameScene.LEVEL_FAILED:
      case PlayerVOProxy.LEVEL_COMPLETE:
      case NavigationScene.START_GAME:
        this.recreateViewComponent()
        const soundState = this.playerVOProxy.vo.settings.mute
        this.viewComponent.createNavigationView(!soundState)
        this.viewComponent.createLevels(this.playerVOProxy.vo.level, this.playerVOProxy.vo.maxLevelCount)
        break
    }
  }

  onLevelClick (level) {
    if (this.playerVOProxy.vo.level < level) {
      return
    }
    this.registerGameSceneMediator()
    this.sendNotification(LevelScene.START_LEVEL, level)
    this.gameScene.remove(SCENE_LEVEL)
    this.gameScene.bootQueue()
  }

  recreateViewComponent () {
    if (this.gameScene.isActive(SCENE_NAVIGATION)) {
      this.gameScene.stop(SCENE_NAVIGATION)
    }
    if (this.gameScene.isActive(SCENE_GAME)) {
      this.gameScene.stop(SCENE_GAME)
    }
    if (this.gameScene.getScene(SCENE_LEVEL)) {
      window.game.scene.remove(SCENE_LEVEL)
      this.gameScene.bootQueue()
    }
    this.gameScene.add(SCENE_LEVEL, LevelScene, true)
    this.gameScene.bootQueue()
    this.viewComponent = this.gameScene.getScene(SCENE_LEVEL)
    this.setListeners()
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
    this.gameScene.remove(SCENE_LEVEL)
    this.gameScene.bootQueue()
  }

  registerGameSceneMediator () {
    if (this.facade.hasMediator(GameSceneMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new GameSceneMediator(null))
  }
}
