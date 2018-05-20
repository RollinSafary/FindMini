
import FindMiniFacade from '../../../FindMiniFacade'
import LevelScene from '../../scenes/LevelScene'
import PlayerVOProxy from '../../../model/PlayerVOProxy'
import {Mediator} from '@koreez/pure-mvc'
import LevelNavigationView from './LevelNavigationView'

export default class LevelNavigationViewMediator extends Mediator {
  static NAME = 'LevelNavigationViewMediator'
  constructor (viewComponent) {
    super(LevelNavigationViewMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  setListeners () {
    this.viewComponent.events.on('musicOff', this.onMusicOff, this)
    this.viewComponent.events.on('musicOn', this.onMusicOn, this)
    this.viewComponent.events.once('menuClicked', this.onMenuClicked, this)
  }

  onRemove () {
    this.viewComponent.disableButtons()
    this.viewComponent.destroy()
    super.onRemove()
  }

  listNotificationInterests () {
    return [
      LevelScene.SHOW_NAVIGATION,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case LevelScene.SHOW_NAVIGATION:
        const viewComponent = new LevelNavigationView()
        viewComponent.scene.add.existing(viewComponent)
        this.setViewComponent(viewComponent)
        this.setListeners()
        this.viewComponent.setSoundState(!this.playerVOProxy.vo.settings.mute)
        this.viewComponent.enableButtons()
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
    this.sendNotification(LevelNavigationView.MENU_CLICKED)
  }
}
