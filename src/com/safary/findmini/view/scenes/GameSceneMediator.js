import {
  OBJECT_TYPES,
  SCENE_GAME,
} from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelScene from './LevelScene'
import GameScene from './GameScene'
import FindMiniFacade from '../../FindMiniFacade'
import ConditionsPopupMediator from '../Components/Popups/ConditionsPopupMediator'
import ConditionsPopup from '../Components/Popups/ConditionsPopup'

export default class GameSceneMediator extends FindMiniSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor (viewComponent) {
    super(GameSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }
  listNotificationInterests () {
    return [LevelScene.START_LEVEL, ConditionsPopup.OKAY_CLICKED]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case LevelScene.START_LEVEL:
        window.game.scene.start(SCENE_GAME)
        this.registerConditionsPopupMediator()
        const level = args[0]
        this.sendNotification(GameScene.SHOW_CONDITIONS_POPUP, level)
        break
      case ConditionsPopup.OKAY_CLICKED:
        {
          const level = args[0]
          this.onOkayButtonClicked(level)
        }
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

  createLevel (level) {
    const levelInfo = this.playerVOProxy.levelInfo(level)
    const options = this.createOptionsArray(levelInfo)
    this.viewComponent.startNewGame(level, options)
  }

  onLevelComplete (level, score) {
    this.sendNotification(GameScene.LEVEL_COMPLETE, level, score)
  }

  onOkayButtonClicked (level) {
    this.createLevel(level)
    const remaining = this.playerVOProxy.levelTimeLimit(level)
    const soundState = this.playerVOProxy.vo.settings.mute
    this.viewComponent.createNavigationView(remaining)
    this.viewComponent.setSoundState(!soundState)
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on('levelComplete', this.onLevelComplete, this)
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
    this.removeConditionsPopupMediator()
    window.game.scene.stop(SCENE_GAME)
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

  registerConditionsPopupMediator () {
    if (this.facade.hasMediator(ConditionsPopupMediator.NAME)) {
      return
    }
    const conditionsPopup = new ConditionsPopup()
    this.facade.registerMediator(new ConditionsPopupMediator(conditionsPopup))
  }

  removeConditionsPopupMediator () {
    if (!this.facade.hasMediator(ConditionsPopupMediator.NAME)) {
      return
    }
    this.facade.removeMediator(ConditionsPopupMediator.NAME)
  }
}
