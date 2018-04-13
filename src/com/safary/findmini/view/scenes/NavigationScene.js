import { SCENE_NAVIGATION } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'
import { createButton } from '../../utils/utils'
import Phaser from 'phaser'

export default class NavigationScene extends FindMiniScene {
  static NAME = 'NavigationScene'
  static START = `${NavigationScene.NAME}Start`
  static START_GAME = NavigationScene.NAME + 'StartGame'

  constructor () {
    super(SCENE_NAVIGATION)
  }

  create () {
    this.createPlayButton()
    this.createHardCoreButton()
    this.createSoundButton()
  }

  createScore (value) {
    this.score = this.add.text(25, 25, `Score: ${value}`, {
      fontFamily: 'Arial',
      fontSize: 30,
      color: '#feffc5',
    }).setOrigin(0, 0.5)
  }

  createSoundButton () {
    this.soundButton = this.add.sprite(0, 0, 'musicOn').setInteractive()
    this.soundButton.x = gameConfig.width - this.soundButton.width / 2 - 5
    this.soundButton.y = this.soundButton.height / 2 + 5
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

  createPlayButton () {
    createButton(this, gameConfig.width / 2, gameConfig.height / 3, 'button', 'Start Game', this.onStartGameClick, this)
  }

  createHardCoreButton () {
    createButton(this, gameConfig.width / 2, gameConfig.height / 2, 'button', 'Hardcore', this.onHardCoreClick, this)
  }

  onStartGameClick () {
    this.events.emit('onStartGameClick')
  }

  onHardCoreClick () {
    this.events.emit('onHardCoreClick')
  }
}
