
import StandardPopupMediator from './StandardPopupMediator'
import GameScene from '../../scenes/GameScene'
import PlayerVOProxy from '../../../model/PlayerVOProxy'
import LevelCompletePopup from './LevelCompletePopup'

export default class LevelCompletePopupMediator extends StandardPopupMediator {
  static NAME = 'LevelCompletePopupMediator'
  constructor (viewComponent) {
    super(LevelCompletePopupMediator.NAME, viewComponent)
  }

  onRegister () {
    this.playerVOProxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    super.onRegister()
  }

  listNotificationInterests () {
    return [
      GameScene.LEVEL_COMPLETE,
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
      case GameScene.LEVEL_COMPLETE:
        const level = args[0]
        const score = args[1]
        const levelMaxTime = this.playerVOProxy.levelTimeLimit(level)
        const remaining = args[2]
        const timeLimit = levelMaxTime / 2 - 5
        let starsCount = 1
        if (remaining > timeLimit * 2 / 3) {
          starsCount = 3
        } else if (remaining > timeLimit / 3) {
          starsCount = 2
        }
        this.showView(level, score, starsCount)
        break
    }
  }

  onActionDone (action, ...args) {
    switch (action) {
      case LevelCompletePopup.ACTION_DEFAULT:
        this.sendNotification(LevelCompletePopup.OKAY_CLICKED, args)
        break
    }
    super.onActionDone()
  }

  onPopupHideComplete () {
    this.viewComponent.destroy()
    super.onPopupHideComplete()
  }
}
