import Phaser from 'phaser'
import { gameConfig } from '../../constants/GameConfig'
import { OBJECT_TYPES } from '../../constants/Constants'

export default class ConditionsView extends Phaser.GameObjects.Container {
  constructor (scene, level, conditions) {
    super(scene, 0, 0)
    this.createBody(level, conditions)
  }

  createBody (level, conditions) {
    this.createBackground(level)
    this.createConditions(conditions)
    this.createOkayButton()
  }

  createBackground (level) {
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
    const text = this.scene.add
      .text(
        gameConfig.width / 2,
        this.backgroundRectangle.y + 50,
        `LEVEL ${level}`,
        {
          fontFamily: 'Arial',
          fontSize: 36,
          color: '#ffffff',
        },
      )
      .setOrigin(0.5)
    this.add(text)
  }

  createConditions (conditions) {
    const keys = Object.keys(conditions)
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const type = OBJECT_TYPES[key]
      const count = conditions[key]
      if (count <= 0) {
        continue
      }
      const condition = this.createCondition(type, count)
      condition.x = this.backgroundRectangle.x + 50
      condition.y = this.backgroundRectangle.y + 150 + i * 75
    }
  }
  createCondition (type, count) {
    const container = this.scene.make.container(0, 0)
    this.add(container)
    const sphere = new type(this.scene, 0, 0, 0)
    const text = this.scene.add
      .text(
        sphere.x + sphere.backgroundCircle.radius * 1.5,
        sphere.y,
        ` x${count} (${type.DESCRIPTION})`,
        {
          fontFamily: 'Arial',
          fontSize: sphere.backgroundCircle.radius,
          color: '#ffffff',
        },
      )
      .setOrigin(0, 0.5)
    container.add(sphere)
    container.add(text)
    return container
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
    this.add(text)
  }

  emitOkay () {
    this.scene.events.emit('okayButtonClicked', this)
  }

  destroy () {
    this.okayButton.off('pointerup', this.emitOkay, this)
    super.destroy()
  }
}
