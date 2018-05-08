import { Facade } from '@koreez/pure-mvc'
import StartupCommand from './controller/StartupCommand'
import { SCENE_BOOT, SCENE_LOADING } from './constants/Constants'
import BootSceneMediator from './view/scenes/BootSceneMediator'
import PlayerVOProxy from './model/PlayerVOProxy'
import SavePlayerVOCommand from './controller/player/SavePlayerVOCommand'
import LoadingScene from './view/scenes/LoadingScene'
import LoadingSceneMediator from './view/scenes/LoadingSceneMediator'
import StartGameCommand from './controller/game/StartGameCommand'

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
  static GAME_SOUND = `${FindMiniFacade.NAME}GameSound`
  static FB_INITIALIZE_SUCCESS = FindMiniFacade.NAME + 'FbInitializeSuccess'
  static FB_INITIALIZE_FAIL = FindMiniFacade.NAME + 'FbInitializeFail'
  static FB_START_GAME_SUCCESS = FindMiniFacade.NAME + 'FbStartGameSuccess'
  static FB_START_GAME_FAIL = FindMiniFacade.NAME + 'FbStartGameFail'
  static START_GAME_SUCCESS = FindMiniFacade.NAME + 'StartGameSuccess'
  static GET_FB_PLAYER_FRIENDS_SUCCESS = FindMiniFacade.NAME +
    'GetFbPlayerFriendsSuccess'
  static GET_FB_PLAYER_FRIENDS_FAIL = FindMiniFacade.NAME +
    'GetFbPlayerFriendsFail'
  static SCREENSHOT_TAKEN = FindMiniFacade.NAME + 'ScreenshotTaken'
  static EXTRA_ASSETS_LOAD_COMPLETE = FindMiniFacade.NAME +
    'ExtraAssetsLoadComplete'
  static FB_CHOOSE_CONTEXT_SUCCESS = FindMiniFacade.NAME +
    'FBChooseContextSuccess'
  static FB_CHOOSE_CONTEXT_FAIL = FindMiniFacade.NAME + 'FBChooseContextFail'

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
    this.registerCommand(FindMiniFacade.FB_INITIALIZE_SUCCESS, StartGameCommand)
    this.registerCommand(PlayerVOProxy.INITIALIZE_SUCCESS, SavePlayerVOCommand)
  }

  initializeView () {
    super.initializeView()
    window.game.scene.add(SCENE_LOADING, LoadingScene)
    this.registerMediator(
      new BootSceneMediator(window.game.scene.getScene(SCENE_BOOT)),
    )
    this.registerMediator(
      new LoadingSceneMediator(window.game.scene.getScene(SCENE_LOADING)),
    )
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
