import Phaser from 'phaser'
import { gameConfig } from '../../../constants/GameConfig'

export default class LevelNavigationView extends Phaser.GameObjects.Container {
  constructor (scene) {
    super(scene, 0, 0)
    this.createBody()
  }

  createBody () {
    this.createBackground()
    this.createMenuButton()
    this.createSoundButton()
  }

  createBackground () {
    this.bg = new Phaser.Geom.Rectangle(0, 0, gameConfig.width, 75)
    const graphics = this.scene.make.graphics({
      fillStyle: { color: 0x0f35ba },
    })
    graphics.fillRectShape(this.bg)
    this.add(graphics)
    graphics.alpha = 0.8
  }
  createMenuButton () {
    this.menuButton = this.scene.add.sprite(0, 0, 'back').setInteractive()
    this.menuButton.x = this.menuButton.displayWidth / 2 + 5
    this.menuButton.y = this.menuButton.displayHeight / 2 + 5
    this.menuButton.on('pointerup', () => {
      this.events.emit('menuClicked')
    })
    this.add(this.menuButton)
  }

  createSoundButton () {
    this.soundButton = this.scene.add.sprite(0, 0, 'musicOn').setInteractive()
    this.soundButton.x = this.bg.right - this.menuButton.x
    this.soundButton.y = this.bg.top + this.soundButton.height / 2 + 5
    this.add(this.soundButton)
  }

  turnOffSound () {
    this.soundButton.setTexture('musicOff')
    this.events.emit('musicOff')
    this.soundButton.once('pointerup', this.turnOnSound, this)
  }

  turnOnSound () {
    this.soundButton.setTexture('musicOn')
    this.events.emit('musicOn')
    this.soundButton.once('pointerup', this.turnOffSound, this)
  }

  setSoundState (isEnabled) {
    this.soundButton.setTexture(isEnabled ? 'musicOn' : 'musicOff')
    this.soundButton.once('pointerup', isEnabled ? this.turnOffSound : this.turnOnSound, this)
  }

  get events () {
    return this.scene.events
  }
}
