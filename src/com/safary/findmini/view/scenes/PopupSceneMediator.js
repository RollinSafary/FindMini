import { SCENE_LEVEL, SCENE_LOADING, SCENE_NAVIGATION, SCENE_POPUP, SCENE_SETTINGS } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import LevelSceneMediator from './LevelSceneMediator'
import LoadingScene from './LoadingScene'
import FindMiniFacade from '../../FindMiniFacade'
import LevelScene from './LevelScene'
import SettingsScene from './SettingsScene'
import StandardPopup from '../Components/Popups/StandardPopup'
import StandardPopupMediator from '../Components/Popups/StandardPopupMediator'
export default class PopupSceneMediator extends FindMiniSceneMediator {
  static NAME = 'PopupSceneMediator'

  constructor (viewComponent) {
    super(PopupSceneMediator.NAME, viewComponent)
    this.queue = []
    this.shown = false
  }

  onRegister () {
    if (this.viewComponent) {
      this.scene.start(SCENE_POPUP)
    }
    super.onRegister()
  }

  listNotificationInterests () {
    return [
      StandardPopupMediator.SHOW_POPUP,
      StandardPopupMediator.HIDE_POPUP,
      StandardPopupMediator.REMOVE_POPUP_FROM_QUEUE,
    ]
  }

  handleNotification (notificationName, args) {
    switch (notificationName) {
      case StandardPopupMediator.SHOW_POPUP:
        {
          const popup = args.splice(0, 1)[0]
          this.show(popup, args)
        }
        break
      case StandardPopupMediator.HIDE_POPUP:
        {
          const popup = args.splice(0, 1)[0]
          this.hide(popup, args)
        }
        break
      case StandardPopupMediator.REMOVE_POPUP_FROM_QUEUE:
        {
          const popup = args.splice(0, 1)[0]
          this.removeFromQueue(popup)
        }
        break
    }
  }

  show (popup, args) {
    if (this.shown) {
      this.queue.push({
        popup: popup,
        otherArgs: args,
      })
      return
    }
    this._internalShow(popup, args)
  }

  _internalShow (popup, args) {
    const currentPopup = this.viewComponent.addPopup(popup)
    this.events.once('popupShowComplete', () => {
      currentPopup.show(args)
    })
    this.viewComponent.show()
    this.shown = true
  }

  hide (popup, ...args) {
    popup.events.on('popupHideComplete', () => {
      this.viewComponent.hide()
    })
    popup.hide(args)
    this.events.once('popupHideComplete', this._onPopupHide, this)
  }

  removeFromQueue (popup) {
    const indexInQueue = this._checkForElementInQueue(popup)

    if (!popup || indexInQueue === -1) {
      return
    }
    this.queue.splice(indexInQueue, 1)
  }

  _onPopupHide () {
    this.shown = false
    if (this.queue.length > 0) {
      const parameters = this.queue.shift()
      this._internalShow(
        parameters.popup,
        ...parameters.args,
      )
    }
  }

  _checkForElementInQueue (popup) {
    for (const element of this.queue) {
      if (element.popup === popup) {
        return this.queue.indexOf(element)
      }
    }
    return -1
  }

  get events () {
    return this.viewComponent.events
  }

  get scene () {
    return window.game.scene
  }
}
