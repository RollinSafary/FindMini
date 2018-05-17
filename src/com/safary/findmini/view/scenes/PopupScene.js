import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'
import Phaser from 'phaser'
import { SCENE_POPUP } from '../../constants/Constants'

export default class PopupScene extends FindMiniScene {
  static NAME = 'PopupScene'
  static START = `${PopupScene.NAME}Start`

  constructor () {
    super(SCENE_POPUP)
    this.backgroundAlpha = 0.6
  }

  createBackground () {
    this.backgroundRectangle = new Phaser.Geom.Rectangle(
      0, 0, gameConfig.width, gameConfig.height,
    )
    this.background = this.add.graphics({
      fillStyle: { color: 0x000000 },
    })
    this.background.fillRectShape(this.backgroundRectangle)
    this.background.alpha = 0.6
    this.background.depth = 0
  }

  show () {
    this.scene.bringToTop()
    this.tweens.add({
      targets: this.background,
      duration: 200,
      ease: 'Poser1',
      alpha: this.backgroundAlpha,
      onStart: () => {
        this.onShowStart()
      },
      onComplete: () => {
        this.onShowComplete()
      },
    })
  }

  hide () {
    this.tweens.add({
      targets: this.background,
      duration: 100,
      ease: 'Poser1',
      alpha: 0,
      onStart: () => {
        this.onHideStart()
      },
      onComplete: () => {
        this.onHideComplete()
      },
    })
  }

  onShowStart () {
    this.createBackground()
    this.events.emit('popupShowStart')
  }
  onShowComplete () {
    this.events.emit('popupShowComplete')
  }
  onHideStart () {
    this.events.emit('popupHideStart')
  }
  onHideComplete () {
    this.background.destroy()
    this.events.emit('popupHideComplete')
  }

  addPopup (popupView) {
    this.popup = popupView
    return this.add.existing(this.popup)
  }
}
