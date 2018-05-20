
import { SCENE_GAME, SCENE_HARDCORE } from '../../../constants/Constants'
import FindMiniFacade from '../../../FindMiniFacade'
import PlayerVOProxy from '../../../model/PlayerVOProxy'
import {Mediator} from '@koreez/pure-mvc'
import ConditionsPopup from '../Popups/ConditionsPopup'
import GameNavigationView from './GameNavigationView'

export default class GameNavigationViewMediator extends Mediator {
  static NAME = 'GameNavigationViewMediator'

  constructor (viewComponent) {
    super(GameNavigationViewMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  setListeners () {
    this.viewComponent.events.on('musicOff', this.onMusicOff, this)
    this.viewComponent.events.on('musicOn', this.onMusicOn, this)
    this.viewComponent.events.on('menuClicked', this.onMenuClicked, this)
  }

  onRemove () {
    this.viewComponent.destroy()
    super.onRemove()
  }

  listNotificationInterests () {
    return [
      ConditionsPopup.OKAY_CLICKED,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case
        ConditionsPopup.OKAY_CLICKED :
        const scene = window.game.scene.getScene(SCENE_GAME)
        const level = args[0]
        const remaining = this.playerVOProxy.levelTimeLimit(level)
        const soundState = !this.playerVOProxy.vo.settings.mute
        const viewComponent = new GameNavigationView(scene)
        this.setViewComponent(viewComponent)
        this.viewComponent.scene.add.existing(this.viewComponent)
        this.viewComponent.setSoundState(soundState)
        this.viewComponent.setTimer(remaining)
        this.viewComponent.setScore(0)
        this.setListeners()
        this.viewComponent.enableButtons()
        this.sendNotification(GameNavigationView.STARTED)
        break
    }
  }

  onMusicOff () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, false)
  }
  onMusicOn () {
    this.sendNotification(FindMiniFacade.GAME_SOUND, true)
  }
  onMenuClicked () {
    this.sendNotification(GameNavigationView.MENU_CLICKED)
  }
}
