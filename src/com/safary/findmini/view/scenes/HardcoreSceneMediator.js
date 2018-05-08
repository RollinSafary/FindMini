import { OBJECT_TYPES, SCENE_HARDCORE } from '../../constants/Constants'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import FindMiniFacade from '../../FindMiniFacade'
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
    return [NavigationScene.HARDCORE]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case NavigationScene.HARDCORE:
        window.game.scene.start(SCENE_HARDCORE)
        this.createLevel()
        this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
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
    this.viewComponent.events.on('musicOff', this.onMusicOff, this)
    this.viewComponent.events.on('musicOn', this.onMusicOn, this)
    this.viewComponent.events.on('menuClicked', this.onMenuClicked, this)
    this.viewComponent.events.on('harder', this.onHarder, this)
  }

  onGameOver () {
    this.sendNotification(HardcoreScene.GAME_OVER)
    window.game.scene.stop(SCENE_HARDCORE)
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
}
