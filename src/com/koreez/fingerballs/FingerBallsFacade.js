import { Facade } from '@koreez/pure-mvc'
import StartupCommand from './controller/StartupCommand'
import { SCENE_BOOT, SCENE_GAME } from './constants/Constants'
import BootScene from './view/scenes/BootScene'
import GameScene from './view/scenes/GameScene'
import BootSceneMediator from './view/scenes/BootSceneMediator'
import GameSceneMediator from './view/scenes/GameSceneMediator'
import PlayerVOProxy from './model/PlayerVOProxy'
import SavePlayerVOCommand from './controller/player/SavePlayerVOCommand'

const consoleArgs = [
  ``,
  `background: ${'#c8c8ff'}`,
  `background: ${'#9696ff'}`,
  `color: ${'#ffffff'}; background: ${'#0000ff'};`,
  `background: ${'#9696ff'}`,
  `background: ${'#c8c8ff'}`,
]

export default class FingerBallsFacade extends Facade {
  static getInstance (key) {
    if (!Facade.instanceMap[key]) {
      Facade.instanceMap[key] = new FingerBallsFacade(key)
    }
    return Facade.instanceMap[key]
  }

  static NAME = 'FingerBallsFacade'
  static STARTUP = `${FingerBallsFacade.NAME}StartUp`

  initializeFacade () {
    setTimeout(() => {
      this._internalInitializeFacade()
    }, 100)
  }

  initializeModel () {
    super.initializeModel()
  }

  initializeController () {
    super.initializeController()

    this.registerCommand(FingerBallsFacade.STARTUP, StartupCommand)
    this.registerCommand(PlayerVOProxy.INITIALIZE_SUCCESS, SavePlayerVOCommand)
  }

  initializeView () {
    super.initializeView()
    window.game.scene.add(SCENE_BOOT, BootScene)
    window.game.scene.add(SCENE_GAME, GameScene)
    this.registerMediator(
      new BootSceneMediator(window.game.scene.getScene(SCENE_BOOT)),
    )
    this.registerMediator(
      new GameSceneMediator(window.game.scene.getScene(SCENE_GAME)),
    )
  }

  startup () {
    this.sendNotification(FingerBallsFacade.STARTUP)
  }

  sendNotification (notificationName, ...args) {
    consoleArgs[0] = `%c %c %c ${notificationName}${
      args.length > 0 ? ' | ' + args : ''
    } %c %c `
    console.log.apply(console, consoleArgs)
    super.sendNotification(notificationName, ...args)
  }

  _internalInitializeFacade () {
    super.initializeFacade()
    this.startup()
  }
}
