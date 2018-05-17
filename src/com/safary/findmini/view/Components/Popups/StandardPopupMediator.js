import {Mediator} from '@koreez/pure-mvc'

export default class StandardPopupMediator extends Mediator {
  static NAME = 'StandardPopupMediator'
  static SHOW_POPUP = `${StandardPopupMediator.NAME}ShowPopup`
  static HIDE_POPUP = `${StandardPopupMediator.NAME}HidePopup`
  static REMOVE_POPUP_FROM_QUEUE = `${StandardPopupMediator.NAME}RemovePopupFromQueue`

  setListeners () {
    this.events.on('popupShowStart', this.onPopupShowStart, this)
    this.events.on('popupShowComplete', this.onPopupShowComplete, this)
    this.events.on('popupHideStart', this.onPopupHideStart, this)
    this.events.on('popupHideComplete', this.onPopupHideComplete, this)
    this.events.on('actionDone', this.onActionDone, this)
  }

  onRegister () {
    super.onRegister()
    this.setListeners()
  }

  onRemove () {
    if (this.viewComponent) {
      this.viewComponent.destroy()
    }
    super.onRemove()
  }

  listNotificationInterests () {
    return [
    ]
  }

  handleNotification (notificationName, ...args) {
    switch (notificationName) {
    }
  }

  showView (...args) {
    args.splice(0, 0, this.viewComponent)
    this.sendNotification(StandardPopupMediator.SHOW_POPUP, args)
  }

  hideView (...args) {
    args.splice(0, 0, this.viewComponent)
    this.sendNotification(StandardPopupMediator.HIDE_POPUP, args)
  }

  removeViewFromQueue () {
    this.sendNotification(StandardPopupMediator.REMOVE_POPUP_FROM_QUEUE, this.viewComponent)
  }

  onPopupShowStart () {
    this.sendNotification(this.viewComponent.constructor.SHOW_START)
  }
  onPopupShowComplete () {
    this.sendNotification(this.viewComponent.constructor.SHOW_COMPLETE)
  }
  onPopupHideStart () {
    this.sendNotification(this.viewComponent.constructor.HIDE_START)
  }
  onPopupHideComplete () {
    this.sendNotification(this.viewComponent.constructor.HIDE_COMPLETE)
  }
  onActionDone (action, ...args) {
    this.hideView()
  }

  get events () {
    return this.viewComponent.events
  }
}
