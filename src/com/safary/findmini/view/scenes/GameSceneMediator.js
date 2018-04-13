import { OBJECT_TYPES, SCENE_GAME, SCENE_LEVEL } from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelScene from './LevelScene'
import GameScene from './GameScene'
import FindMiniFacade from '../../FindMiniFacade'

export default class GameSceneMediator extends FindMiniSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor (viewComponent) {
    super(GameSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [LevelScene.START_LEVEL]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case LevelScene.START_LEVEL:
        this.recreateViewComponent()
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        const level = args[0]
        const levelInfo = this.playerVOProxy.levelInfo(level)
        this.viewComponent.showConditions(level, levelInfo)
        break
    }
  }

  createOptionsArray (levelInfo) {
    const options = []
    const keys = Object.keys(levelInfo)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const count = levelInfo[key]
      for (let j = 0; j < count; j++) {
        options.push(OBJECT_TYPES[key])
      }
    }
    return options
  }

  createLevel (conditionsView, level) {
    const levelInfo = this.playerVOProxy.levelInfo(level)
    const options = this.createOptionsArray(levelInfo)
    this.viewComponent.startNewGame(conditionsView, options)
  }

  onLevelComplete (level, score) {
    this.sendNotification(GameScene.LEVEL_COMPLETE, level, score)
    this.gameScene.remove(SCENE_GAME)
    this.gameScene.bootQueue()
  }

  recreateViewComponent () {
    if (this.gameScene.isActive(SCENE_LEVEL)) {
      this.gameScene.stop(SCENE_LEVEL)
    }
    if (this.gameScene.getScene(SCENE_GAME)) {
      window.game.scene.remove(SCENE_GAME)
    }
    this.gameScene.add(SCENE_GAME, GameScene, true)
    this.gameScene.bootQueue()
    this.viewComponent = this.gameScene.getScene(SCENE_GAME)
    this.setListeners()
  }

  onOkayButtonClicked (conditionsView, level) {
    this.createLevel(conditionsView, level)
    const remaining = this.playerVOProxy.levelTimeLimit(level)
    const soundState = this.playerVOProxy.vo.settings.mute
    this.viewComponent.createNavigationView(remaining, !soundState)
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on('levelComplete', this.onLevelComplete, this)
    this.viewComponent.events.on('okayButtonClicked', this.onOkayButtonClicked, this)
    this.viewComponent.events.on('bombClick', this.onBombClick, this)
    this.viewComponent.events.on('gameOver', this.onGameOver, this)
    this.viewComponent.events.on('giftClicked', this.onGiftClick, this)
    this.viewComponent.events.on('musicOff', this.onMusicOff, this)
    this.viewComponent.events.on('musicOn', this.onMusicOn, this)
    this.viewComponent.events.on('menuClicked', this.onMenuClicked, this)
  }
  onBombClick () {
    this.viewComponent.gameOver()
  }

  onGameOver () {
    this.sendNotification(GameScene.LEVEL_FAILED)
    this.gameScene.remove(SCENE_GAME)
    this.gameScene.bootQueue()
  }

  onMusicOff () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, false)
  }
  onMusicOn () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, true)
  }

  onMenuClicked () {
    this.onGameOver()
  }

  onGiftClick (x, y) {
    this.viewComponent.createGift(x, y)
  }
}
