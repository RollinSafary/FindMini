
import { SCENE_GAME, SCENE_HARDCORE } from '../../../constants/Constants'
import FindMiniFacade                 from '../../../FindMiniFacade'
import PlayerVOProxy                  from '../../../model/PlayerVOProxy'
import {Mediator}                     from '@koreez/pure-mvc'
import HardcoreScene                  from "../../scenes/HardcoreScene";
import ConditionsPopup                from '../Popups/ConditionsPopup'
import GameNavigationView             from './GameNavigationView'
import HardCoreNavigationView         from "./HardCoreNavigationView";

export default class HardCoreNavigationViewMediator extends Mediator {
  static NAME = 'HardCoreNavigationViewMediator'

  constructor (viewComponent) {
    super(HardCoreNavigationViewMediator.NAME, viewComponent)
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
      HardcoreScene.SHOW_NAVIGATION
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case
        HardcoreScene.SHOW_NAVIGATION :
        const scene = window.game.scene.getScene(SCENE_HARDCORE)
        const soundState = !this.playerVOProxy.vo.settings.mute
        const viewComponent = new HardCoreNavigationView(scene)
        this.setViewComponent(viewComponent)
        this.viewComponent.scene.add.existing(this.viewComponent)
        this.viewComponent.setSoundState(soundState)
        this.viewComponent.setTimer(0)
        this.viewComponent.setScore(0)
        this.setListeners()
        this.viewComponent.enableButtons()
        this.sendNotification(HardCoreNavigationView.STARTED)
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
    this.sendNotification(HardCoreNavigationView.MENU_CLICKED)
  }
}
