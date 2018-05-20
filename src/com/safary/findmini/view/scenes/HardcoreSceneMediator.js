import {
  OBJECT_TYPES,
  SCENE_GAME,
  SCENE_HARDCORE,
} from '../../constants/Constants'
import HardCoreNavigationView
  from '../Components/TopBars/HardCoreNavigationView'
import HardCoreNavigationViewMediator
  from '../Components/TopBars/HardCoreNavigationViewMediator'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import HardcoreScene from './HardcoreScene'

export default class HardcoreSceneMediator extends FindMiniSceneMediator {
  static NAME = 'HardcoreSceneMediator'

  constructor (viewComponent) {
    super(HardcoreSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  listNotificationInterests () {
    return [NavigationScene.HARDCORE, HardCoreNavigationView.STARTED, HardCoreNavigationView.MENU_CLICKED]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case NavigationScene.HARDCORE:
        window.game.scene.start(SCENE_HARDCORE)
        this.createLevel()
        this.registerHardcoreNavigationViewMediator()
        this.sendNotification(HardcoreScene.SHOW_NAVIGATION)
        break
      case HardCoreNavigationView.STARTED:
        const hardCoreNavigationViewMediator = this.facade.retrieveMediator(HardCoreNavigationViewMediator.NAME)
        this.viewComponent.gameNavigation = hardCoreNavigationViewMediator.viewComponent
        break
      case HardCoreNavigationView.MENU_CLICKED:
        setTimeout(() => {
          this.removeHardcoreNavigationViewMediator()
          window.game.scene.stop(SCENE_HARDCORE)
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

  createLevel () {
    const hardCoreLevel = {
      SimpleSphere: parseInt(Math.random() * 30),
      DoubleTapSimpleSphere: parseInt(Math.random() * 20),
    }
    const levelInfo = this.createOptionsArray(hardCoreLevel)
    this.viewComponent.startNewGame(levelInfo)
  }

  setListeners () {
    super.setListeners()
    this.viewComponent.events.on('gameOver', this.onGameOver, this)
    this.viewComponent.events.on('harder', this.onHarder, this)
  }

  onGameOver () {
    this.sendNotification(HardcoreScene.GAME_OVER)
    this.removeHardcoreNavigationViewMediator()
    window.game.scene.stop(SCENE_HARDCORE)
  }

  onHarder () {
    this.viewComponent.hardState()
  }

  registerHardcoreNavigationViewMediator () {
    if (this.facade.hasMediator(HardCoreNavigationViewMediator.NAME)) {
      return
    }
    this.facade.registerMediator(new HardCoreNavigationViewMediator(null))
  }
  removeHardcoreNavigationViewMediator () {
    if (!this.facade.hasMediator(HardCoreNavigationViewMediator.NAME)) {
      return
    }
    this.facade.removeMediator(new HardCoreNavigationViewMediator(null))
  }
}
