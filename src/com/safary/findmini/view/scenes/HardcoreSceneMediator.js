import { OBJECT_TYPES, SCENE_GAME, SCENE_HARDCORE, SCENE_LEVEL } from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelScene from './LevelScene'
import GameScene from './GameScene'
import FindMiniFacade from '../../FindMiniFacade'
import HardcoreScene from "./HardcoreScene";

export default class HardcoreSceneMediator extends FindMiniSceneMediator {
  static NAME = 'HardcoreSceneMediator'

  constructor (viewComponent) {
    super(HardcoreSceneMediator.NAME, viewComponent)
  }

  listNotificationInterests () {
    return [NavigationScene.HARDCORE]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case NavigationScene.HARDCORE:
        this.recreateViewComponent()
        this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
        this.createLevel()
        this.viewComponent.createNavigationView(!this.playerVOProxy.vo.settings.mute)
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

  createLevel () {
    const hardCoreLevel = {
      SimpleSphere: parseInt(Math.random() * 30),
      DoubleTapSimpleSphere: parseInt(Math.random() * 20),
    }
    const levelInfo = this.createOptionsArray(hardCoreLevel)
    this.viewComponent.startNewGame(levelInfo)
  }

  recreateViewComponent () {
    if (this.gameScene.getScene(SCENE_HARDCORE)) {
      window.game.scene.remove(SCENE_HARDCORE)
      this.gameScene.bootQueue()
    }
    this.gameScene.add(SCENE_HARDCORE, HardcoreScene, true)
    this.gameScene.bootQueue()
    this.viewComponent = this.gameScene.getScene(SCENE_HARDCORE)
    this.setListeners()
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on('gameOver', this.onGameOver, this)
    this.viewComponent.events.on('giftClicked', this.onGiftClick, this)
    this.viewComponent.events.on('musicOff', this.onMusicOff, this)
    this.viewComponent.events.on('musicOn', this.onMusicOn, this)
    this.viewComponent.events.on('menuClicked', this.onMenuClicked, this)
    this.viewComponent.events.on('harder', this.onHarder, this)
  }

  onGameOver () {
    this.sendNotification(HardcoreScene.GAME_OVER)
    this.gameScene.remove(SCENE_HARDCORE)
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

  onHarder () {
    this.viewComponent.hardState()
  }

  onGiftClick (x, y) {
    this.viewComponent.createGift(x, y)
  }
}
