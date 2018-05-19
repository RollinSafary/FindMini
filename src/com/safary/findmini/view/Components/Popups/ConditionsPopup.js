import Phaser from 'phaser'
import { gameConfig } from '../../../constants/GameConfig'
import { OBJECT_TYPES } from '../../../constants/Constants'
import StandardPopup from './StandardPopup'

export default class ConditionsPopup extends StandardPopup {
  static NAME = 'ConditionsPopup'
  static OKAY_CLICKED = `${ConditionsPopup.NAME}OkayClicked`
  static ACTION_DEFAULT = 0

  constructor () {
    super()
    this.createBackground()
    this.createTitleText()
    this.createOkayButton()
  }
  createBody (conditions) {
    this.createConditions(conditions)
  }

  createBackground () {
    this.backgroundRectangle = new Phaser.Geom.Rectangle(
      gameConfig.width * 0.1,
      gameConfig.height * 0.2,
      gameConfig.width * 0.8,
      gameConfig.height * 0.6,
    )
    this.background = this.scene.make.graphics({
      fillStyle: { color: 0x000000 },
    })
    this.background.fillRectShape(this.backgroundRectangle)
    this.background.alpha = 0.6
    this.add(this.background)
  }

  createTitleText () {
    this.titleText = this.scene.add
      .text(
        gameConfig.width / 2,
        this.backgroundRectangle.y + 50,
        `LEVEL`,
        {
          fontFamily: 'Arial',
          fontSize: 36,
          color: '#ffffff',
        },
      )
      .setOrigin(0.5)
    this.add(this.titleText)
  }

  createConditions (conditions) {
    const keys = Object.keys(conditions)
    let height = -75
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const type = OBJECT_TYPES[key]
      const count = conditions[key]
      if (count <= 0) {
        continue
      }
      height += 75
      const condition = new ConditionView(this.scene, type, this.backgroundRectangle.x + 50, this.backgroundRectangle.y + 150 + height, count)
      this.add(condition)
    }
  }

  createOkayButton () {
    this.okayButtonDown = this.scene.add
      .image(
        gameConfig.width / 2,
        this.backgroundRectangle.bottom - 100,
        'button',
      )
      .setInteractive()
      .setScale(-1)
      .setOrigin(0.5)
    this.okayButtonDown.visible = false
    this.okayButton = this.scene.add
      .image(
        gameConfig.width / 2,
        this.backgroundRectangle.bottom - 100,
        'button',
      )
      .setInteractive()
      .setOrigin(0.5)
    this.add(this.okayButtonDown)
    this.add(this.okayButton)
    const text = this.scene.add
      .text(this.okayButton.x, this.okayButton.y, `OKAY`, {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#ffffff',
      })
      .setOrigin(0.5)
    this.okayButton.on('pointerdown', () => {
      this.okayButtonDown.visible = true
      this.okayButton.visible = false
    }, this)
    this.okayButtonDown.on('pointerup', () => {
      this.okayButtonDown.visible = false
      this.okayButton.visible = true
      this.emitOkay()
    }, this)
    this.okayButtonDown.on('pointerout', () => {
      this.okayButtonDown.visible = false
      this.okayButton.visible = true
    }, this)
    this.disableButtons()
    this.add(text)
  }

  emitOkay () {
    this.events.emit('actionDone', ConditionsPopup.ACTION_DEFAULT, this.level)
  }

  show (args) {
    this.enableButtons()
    this.level = args.splice(0, 1)[0]
    this.titleText.setText(`LEVEL ${this.level}`)
    const conditions = args.splice(0, 1)[0]
    this.createBody(conditions)
    super.show()
  }

  onHideStart() {
    this.disableButtons()
    super.onHideStart()
  }

  enableButtons () {
    this.okayButton.input.enabled = true
    this.okayButtonDown.input.enabled = true
  }

  disableButtons () {
    this.okayButton.input.enabled = false
    this.okayButtonDown.input.enabled = false
  }
}

class ConditionView extends Phaser.GameObjects.Container {
  constructor (scene, SphereTypeClass, x, y, count) {
    super(scene, x, y)
    this.createBody(SphereTypeClass, count)
  }

  createBody (SphereTypeClass, count) {
    const sphere = new SphereTypeClass(this.scene, 0, 0, 0)
    const text = this.scene.add
      .text(
        sphere.x + sphere.backgroundCircle.radius * 1.5,
        sphere.y,
        ` x${count} (${SphereTypeClass.DESCRIPTION})`,
        {
          fontFamily: 'Arial',
          fontSize: sphere.backgroundCircle.radius,
          color: '#ffffff',
        },
      )
      .setOrigin(0, 0.5)
    this.add(sphere)
    this.add(text)
  }
}
