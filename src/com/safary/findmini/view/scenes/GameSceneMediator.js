import {
  OBJECT_TYPES,
  SCENE_GAME,
} from '../../constants/Constants'
import GameOverPopup from '../Components/Popups/GameOverPopup'
import GameOverPopupMediator
  from '../Components/Popups/GameOverPopupMediator'
import GameNavigationView
  from '../Components/TopBars/GameNavigationView'
import GameNavigationViewMediator
  from '../Components/TopBars/GameNavigationViewMediator'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelScene from './LevelScene'
import GameScene from './GameScene'
import ConditionsPopupMediator from '../Components/Popups/ConditionsPopupMediator'
import ConditionsPopup from '../Components/Popups/ConditionsPopup'
import LevelCompletePopupMediator from '../Components/Popups/LevelCompletePopupMediator'
import LevelCompletePopup from '../Components/Popups/LevelCompletePopup'

export default class GameSceneMediator extends FindMiniSceneMediator {
  static NAME = 'GameSceneMediator'

  constructor (viewComponent) {
    super(GameSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  onRemove () {
    this.removeLevelCompletePopupMediator()
    this.removeConditionsPopupMediator()
    this.removeGameOverPopupMediator()
    super.onRemove()
  }
  listNotificationInterests () {
    return [
      LevelScene.START_LEVEL,
      ConditionsPopup.OKAY_CLICKED,
      GameOverPopup.RESTART_CLICKED,
      GameNavigationView.STARTED,
      GameNavigationView.MENU_CLICKED,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case LevelScene.START_LEVEL:
      case GameOverPopup.RESTART_CLICKED:
        window.game.scene.start(SCENE_GAME)
        this.registerConditionsPopupMediator()
        this.registerLevelCompletePopupMediator()
        this.registerGameOverPopupMediator()
        this.registerGameNavigationViewMediator()
        const level = args[0]
        this.sendNotification(GameScene.SHOW_CONDITIONS_POPUP, level)
        break
      case ConditionsPopup.OKAY_CLICKED:
        {
          const level = args[0]
          this.onOkayButtonClicked(level)
        }
        break
      case GameNavigationView.STARTED:
        const gameNavigationViewMediator = this.facade.retrieveMediator(GameNavigationViewMediator.NAME)
        this.viewComponent.gameNavigation = gameNavigationViewMediator.getViewComponent()
        break
      case GameNavigationView.MENU_CLICKED:
        setTimeout(() => {
          this.removeConditionsPopupMediator()
          this.removeLevelCompletePopupMediator()
          this.removeGameOverPopupMediator()
          this.removeGameNavigationViewMediator()
          window.game.scene.stop(SCENE_GAME)
        }, 50)
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

  onLevelComplete (level, score, remaining) {
    this.sendNotification(GameScene.LEVEL_COMPLETE, level, score, remaining)
    this.removeConditionsPopupMediator()
    this.removeGameOverPopupMediator()
  }

  onOkayButtonClicked (level) {
    this.createLevel(level)
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on('levelComplete', this.onLevelComplete, this)
    this.viewComponent.events.on('bombClick', this.onBombClick, this)
    this.viewComponent.events.on('gameOver', this.onGameOver, this)
    this.viewComponent.events.on('giftClicked', this.onGiftClick, this)
  }

  onBombClick () {
    this.viewComponent.onBombTap()
  }

  onGameOver (level) {
    this.sendNotification(GameScene.LEVEL_FAILED, level)
    this.removeConditionsPopupMediator()
    this.removeLevelCompletePopupMediator()
    this.removeGameNavigationViewMediator()
    window.game.scene.stop(SCENE_GAME)
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
  registerLevelCompletePopupMediator () {
    if (this.facade.hasMediator(LevelCompletePopupMediator.NAME)) {
      return
    }
    const levelCompletePopup = new LevelCompletePopup()
    this.facade.registerMediator(new LevelCompletePopupMediator(levelCompletePopup))
  }

  removeLevelCompletePopupMediator () {
    if (!this.facade.hasMediator(LevelCompletePopupMediator.NAME)) {
      return
    }
    this.facade.removeMediator(LevelCompletePopupMediator.NAME)
  }
  registerGameOverPopupMediator () {
    if (this.facade.hasMediator(GameOverPopupMediator.NAME)) {
      return
    }
    const gameOverPopup = new GameOverPopup()
    this.facade.registerMediator(new GameOverPopupMediator(gameOverPopup))
  }

  removeGameOverPopupMediator () {
    if (!this.facade.hasMediator(GameOverPopupMediator.NAME)) {
      return
    }
    this.facade.removeMediator(GameOverPopupMediator.NAME)
  }

  registerGameNavigationViewMediator () {
    if (this.facade.hasMediator(GameNavigationViewMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new GameNavigationViewMediator(null))
  }

  removeGameNavigationViewMediator () {
    if (!this.facade.hasMediator(GameNavigationViewMediator.NAME)) {
      return
    }
    this.facade.removeMediator(GameNavigationViewMediator.NAME)
  }
}
