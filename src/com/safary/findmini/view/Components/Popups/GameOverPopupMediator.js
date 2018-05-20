
import GameOverPopup from './GameOverPopup'
import StandardPopupMediator from './StandardPopupMediator'
import GameScene from '../../scenes/GameScene'
import PlayerVOProxy from '../../../model/PlayerVOProxy'

export default class GameOverPopupMediator extends StandardPopupMediator {
  static NAME = 'GameOverPopupMediator'
  constructor (viewComponent) {
    super(GameOverPopupMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  listNotificationInterests () {
    return [
      GameScene.LEVEL_FAILED,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case GameScene.LEVEL_FAILED:
        const level = args[0]
        this.showView(level)
        break
    }
  }

  onActionDone (action, ...args) {
    const level = args[0]
    switch (action) {
      case GameOverPopup.ACTION_DEFAULT:
        this.sendNotification(GameOverPopup.BACK_CLICKED)
        break
      case GameOverPopup.ACTION_RESTART:
        this.sendNotification(GameOverPopup.RESTART_CLICKED, level)
        break
    }
    super.onActionDone()
  }
}
