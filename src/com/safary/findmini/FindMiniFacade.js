import { Facade } from '@koreez/pure-mvc'
import StartupCommand from './controller/StartupCommand'
import {
  SCENE_BOOT, SCENE_GAME, SCENE_HARDCORE, SCENE_LEVEL, SCENE_LOADING, SCENE_NAVIGATION, SCENE_POPUP,
  SCENE_SETTINGS,
} from './constants/Constants'
import PlayerVOProxy from './model/PlayerVOProxy'
import SavePlayerVOCommand from './controller/player/SavePlayerVOCommand'
import StartGameCommand from './controller/game/StartGameCommand'
import NavigationScene from './view/scenes/NavigationScene'
import SettingsScene from './view/scenes/SettingsScene'
import BootScene from './view/scenes/BootScene'
import OnLoadCompleteCommand from './controller/game/OnLoadCompleteCommand'
import StartFBGameCommand from './controller/fb/StartFBGameCommand'
import LoadingScene from './view/scenes/LoadingScene'
import LevelScene from './view/scenes/LevelScene'
import HardcoreScene from './view/scenes/HardcoreScene'
import GameScene from './view/scenes/GameScene'
import PopupScene from './view/scenes/PopupScene'

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
    this.registerCommand(LoadingScene.SCENE_START, StartFBGameCommand)
    this.registerCommand(LoadingScene.LOAD_COMPLETE, OnLoadCompleteCommand)
    this.registerCommand(PlayerVOProxy.INITIALIZE_SUCCESS, SavePlayerVOCommand)
  }

  initializeView () {
    super.initializeView()
    window.game.scene.add(SCENE_BOOT, BootScene)
    window.game.scene.add(SCENE_LOADING, LoadingScene)
    window.game.scene.add(SCENE_NAVIGATION, NavigationScene)
    window.game.scene.add(SCENE_LEVEL, LevelScene)
    window.game.scene.add(SCENE_GAME, GameScene)
    window.game.scene.add(SCENE_HARDCORE, HardcoreScene)
    window.game.scene.add(SCENE_SETTINGS, SettingsScene)
    window.game.scene.add(SCENE_POPUP, PopupScene)
    window.game.scene.bootQueue()
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
