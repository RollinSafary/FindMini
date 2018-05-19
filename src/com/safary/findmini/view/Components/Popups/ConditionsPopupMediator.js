
import StandardPopupMediator from './StandardPopupMediator'
import GameScene from '../../scenes/GameScene'
import PlayerVOProxy from '../../../model/PlayerVOProxy'
import ConditionsPopup from './ConditionsPopup'

export default class ConditionsPopupMediator extends StandardPopupMediator {
  static NAME = 'ConditionsPopupMediator'
  constructor (viewComponent) {
    super(ConditionsPopupMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  listNotificationInterests () {
    return [
      GameScene.SHOW_CONDITIONS_POPUP,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case GameScene.SHOW_CONDITIONS_POPUP:
        const level = args[0]
        const levelInfo = this.playerVOProxy.levelInfo(level)
        this.showView(level, levelInfo)
        break
    }
  }

  onActionDone (action, ...args) {
    const level = args[0]
    switch (action) {
      case ConditionsPopup.ACTION_DEFAULT:
        this.sendNotification(ConditionsPopup.OKAY_CLICKED, level)
        break
    }
    super.onActionDone()
  }

  onPopupHideComplete () {
    super.onPopupHideComplete()
  }
}
