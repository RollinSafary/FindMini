import Phaser from 'phaser'
import { SCENE_POPUP } from '../../../constants/Constants'

export default class StandardPopup extends Phaser.GameObjects.Container {
  static NAME = 'StandardPopup'
  static SHOW_START = `${StandardPopup.NAME}ShowStart`
  static SHOW_COMPLETE = `${StandardPopup.NAME}ShowComplete`
  static HIDE_START = `${StandardPopup.NAME}HideStart`
  static HIDE_COMPLETE = `${StandardPopup.NAME}HideComplete`
  constructor () {
    super(window.game.scene.getScene(SCENE_POPUP), 0, 0)
    this.events = new Phaser.EventEmitter()
  }

  createBody () {
    console.error(`${this.constructor.NAME} createBody isn't overridden`)
  }

  show (args) {
    this.scene.tweens.add({
      targets: this,
      duration: 300,
      alpha: 1,
      onStart: () => {
        this.visible = true
        this.alpha = 0
        this.onShowStart()
      },
      onComplete: () => {
        this.onShowComplete()
      },
      ease: 'Power1',
    })
  }

  hide () {
    this.scene.tweens.add({
      targets: this,
      duration: 300,
      alpha: 0,
      onStart: () => {
        this.onHideStart()
      },
      onComplete: () => {
        this.onHideComplete()
      },
      ease: 'Power1',
    })
  }

  onShowStart () {
    this.visible = true
    this.depth = 100
    this.events.emit('popupShowStart')
  }

  onShowComplete () {
    this.events.emit('popupShowComplete')
  }

  onHideStart () {
    this.events.emit('popupHideStart')
  }

  onHideComplete () {
    this.visible = false
    this.depth = 0
    this.events.emit('popupHideComplete')
  }

  onAction (actionID) {
    this.events.emit('actionDone', actionID)
  }
}
