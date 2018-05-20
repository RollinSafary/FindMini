import Phaser from 'phaser'
import { SCENE_LEVEL } from '../../../constants/Constants'
import { gameConfig } from '../../../constants/GameConfig'

export default class LevelNavigationView extends Phaser.GameObjects.Container {
  static NAME = 'LevelNavigationView'
  static MENU_CLICKED = `${LevelNavigationView.NAME}MenuClicked`
  constructor () {
    super(window.game.scene.getScene(SCENE_LEVEL), 0, 0)
    this.createBody()
  }

  createBody () {
    this.createBackground()
    this.createMenuButton()
    this.createSoundButton()
    this.disableButtons()
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
    this.menuButton = this.scene.add.sprite(0, 0, 'back')
    this.menuButton.setInteractive()
    this.menuButton.x = this.menuButton.width / 2 + 5
    this.menuButton.y = this.menuButton.height / 2 + 5
    this.menuButton.once('pointerup', () => {
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
    this.soundButton.once(
      'pointerup',
      isEnabled ? this.turnOffSound : this.turnOnSound,
      this,
    )
  }

  enableButtons () {
    this.menuButton.input.enabled = true
    this.soundButton.input.enabled = true
  }
  disableButtons () {
    this.menuButton.input.enabled = false
    this.soundButton.input.enabled = false
  }

  get events () {
    return this.scene.events
  }
}
