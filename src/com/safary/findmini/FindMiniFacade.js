import { Facade } from '@koreez/pure-mvc'
import StartupCommand from './controller/StartupCommand'
import { SCENE_BOOT, SCENE_GAME, SCENE_NAVIGATION } from './constants/Constants'
import BootScene from './view/scenes/BootScene'
import GameScene from './view/scenes/GameScene'
import BootSceneMediator from './view/scenes/BootSceneMediator'
import GameSceneMediator from './view/scenes/GameSceneMediator'
import PlayerVOProxy from './model/PlayerVOProxy'
import SavePlayerVOCommand from './controller/player/SavePlayerVOCommand'
import NavigationSceneMediator from './view/scenes/NavigationSceneMediator'
import NavigationScene from './view/scenes/NavigationScene'

const consoleArgs = [
  ``,
  `background: ${'#c8c8ff'}`,
  `background: ${'#9696ff'}`,
  `color: ${'#ffffff'}; background: ${'#0000ff'};`,
  `background: ${'#9696ff'}`,
  `background: ${'#c8c8ff'}`,
]

export default class FindMiniFacade extends Facade {
  static getInstance (key) {
    if (!Facade.instanceMap[key]) {
      Facade.instanceMap[key] = new FindMiniFacade(key)
    }
    return Facade.instanceMap[key]
  }

  static NAME = 'FindMiniFacade'
  static STARTUP = `${FindMiniFacade.NAME}StartUp`

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

    this.registerCommand(FindMiniFacade.STARTUP, StartupCommand)
    this.registerCommand(PlayerVOProxy.INITIALIZE_SUCCESS, SavePlayerVOCommand)
  }

  initializeView () {
    super.initializeView()
    window.game.scene.add(SCENE_BOOT, BootScene)
    // window.game.scene.add(SCENE_NAVIGATION, NavigationScene)
    window.game.scene.add(SCENE_GAME, GameScene)
    this.registerMediator(
      new BootSceneMediator(window.game.scene.getScene(SCENE_BOOT)),
    )
    this.registerMediator(
      new GameSceneMediator(window.game.scene.getScene(SCENE_GAME)),
    )
    // this.registerMediator(
    //   new NavigationSceneMediator(window.game.scene.getScene(SCENE_NAVIGATION)),
    // )
  }

  startup () {
    this.sendNotification(FindMiniFacade.STARTUP)
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
