import Phaser from 'phaser'

export default class SphereView extends Phaser.GameObjects.Container {
  static DESCRIPTION = 'tap once to clear'

  constructor (scene, x, y, number) {
    super(scene, x, y)
    this.depth = -number
    this.backgroundShapes = []
    this.centerShapes = []
    this.texts = []
    this.createShapes()
    this.rotationSpeed = Math.random() * 0.05
    this.ySpeed = 30 + this.rotationSpeed * 600
    this.xSpeed = 20 + this.rotationSpeed * 400
    this.xMultiplier = Math.random() * 10 > 5 ? 1 : -1
    this.yMultiplier = Math.random() * 10 > 5 ? 1 : -1
    this.rotationMultiplier = 1
    this.moveEnabled = false
  }

  createBody () {}

  createShapes () {
    this.backgroundCircle = new Phaser.Geom.Circle(0, 0, 30)
    this.centerCircle = new Phaser.Geom.Circle(0, 0, 25)
  }

  createBackgroundCircle (color, depth = -10) {
    const backgroundGraphics = this.scene.make.graphics({
      fillStyle: { color: color },
    })
    backgroundGraphics.fillCircleShape(this.backgroundCircle)
    backgroundGraphics.depth = depth
    this.add(backgroundGraphics)
    this.backgroundShapes.push(backgroundGraphics)
  }

  createCenterCircle (color, depth = -5) {
    const centerGraphics = this.scene.make.graphics({
      fillStyle: { color: color },
    })
    centerGraphics.fillCircleShape(this.centerCircle)
    centerGraphics.depth = depth
    this.add(centerGraphics)
    this.centerShapes.push(centerGraphics)
  }
  createNumberText (number, color) {
    this.numberText = this.scene.add
      .text(0, 0, number, {
        fontFamily: 'Arial',
        fontSize: this.centerCircle.radius,
        color: color,
      })
      .setOrigin(0.5)
    this.numberText.depth = 10
    this.add(this.numberText)
  }

  removeFrontLayerWithText () {
    this.removeFrontLayer()
    this.removeFrontLayerText()
  }

  removeFrontLayer () {
    this.removeFrontLayerBackground()
    this.removeFrontLayerCenter()
  }

  removeFrontLayerBackground () {
    const frontLayer = this.backgroundShapes[this.backgroundShapes.length - 1]
    if (this.backgroundShapes.length === 1) {
      return
    }
    frontLayer.destroy()
  }

  removeFrontLayerCenter () {
    const frontLayer = this.centerShapes[this.centerShapes.length - 1]
    if (this.centerShapes.length === 1) {
      return
    }
    frontLayer.destroy()
  }

  removeFrontLayerText () {
    const frontLayer = this.texts[this.texts.length - 1]
    if (this.texts.length === 1) {
      return
    }
    frontLayer.destroy()
  }

  createZone () {
    this.hitArea = this.scene.add.zone(this.x, this.y).setCircleDropZone(40)
    this.add(this.hitArea)
    this.hitArea.setInteractive()
    this.hitArea.depth = 10
    this.hitArea.on('pointerdown', this.onClick, this)
    const graphics = this.scene.add.graphics({ fillStyle: { color: 0x000000 } })
    graphics.fillRectShape(this.hitArea)
  }

  update () {
    this.move()
    if (this.moveEnabled) {
    }
    if (this.hitArea) {
      this.hitArea.x = this.x
      this.hitArea.y = this.y
    }
  }

  enableMove () {
    this.moveEnabled = true
  }

  disableMove () {
    this.moveEnabled = false
  }

  move () {
    this.rotation += this.rotationSpeed * this.rotationMultiplier
    if (this.x >= this.scene.endX || this.x <= this.scene.startX) {
      this.rotationMultiplier *= -1
      this.xMultiplier *= -1
    }
    if (this.y >= this.scene.endY || this.y <= this.scene.startY) {
      this.rotationMultiplier *= -1
      this.yMultiplier *= -1
    }
    this.x += this.xSpeed / 10 * this.xMultiplier
    this.y += this.ySpeed / 10 * this.yMultiplier
  }

  onClick () {
    this.scene.events.emit('onSphereClick', this)
  }

  onClickAction () {
    this.scene.events.emit('onSphereMustDestroy', this)
  }

  get number () {
    if (!this.numberText) {
      console.error('numberText is not added')
      return -1
    }
    return parseInt(this.numberText.text)
  }

  preDestroy () {
    this.hitArea.off('pointerdown', this.onClick, this)
    this.hitArea = null
  }
}
