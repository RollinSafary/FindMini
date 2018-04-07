import Phaser from 'phaser'
import { gameConfig } from '../../constants/GameConfig'

export default class GameNavigationView extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene, 0, 0)
    this.createBody()
  }

  createBody () {
    this.createBackground()
    this.createMenuButton()
    this.createTimer()
    this.createSoundButton()
  }

  createBackground () {
    const rectangle = new Phaser.Geom.Rectangle(0, 0, gameConfig.width, 50)
    const graphics = this.scene.make.graphics({
      fillStyle: { color: 0x0f35ba },
    })
    graphics.fillRectShape(rectangle)
    this.add(graphics)
  }
  createMenuButton () {}
  createTimer () {}
  createSoundButton () {}
}
