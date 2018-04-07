import Phaser from 'phaser'

export default class SphereView extends Phaser.GameObjects.Container {
  constructor (scene, x, y, number) {
    super(scene, x, y)
    this.depth = -number
    this.backgroundShapes = []
    this.centerShapes = []
    this.texts = []
    this.createShapes()
    this.createZone()
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
    if (!this.backgroundShapes.length === 1) {
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
    this.hitArea = this.scene.add.zone(this.x, this.y).setCircleDropZone(30)
    this.add(this.hitArea)
    this.hitArea.setInteractive()
    this.hitArea.depth = 10
  }

  update () {
    this.hitArea.x = this.x
    this.hitArea.y = this.y
  }

  onClick () {
    this.scene.events.emit('onSphereCLick', this)
  }

  onClickAction () {
    this.scene.events.emit('onSphereMustDestroy', this)
  }

  emitDestroy () {}

  get number () {
    if (!this.numberText) {
      console.error('numberText is not added')
      return -1
    }
    return parseInt(this.numberText.text)
  }
}
