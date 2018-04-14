import { SCENE_NAVIGATION, SCENE_SETTINGS } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'
import { createButton } from '../../utils/utils'
import Phaser from 'phaser'

export default class SettingsScene extends FindMiniScene {
  static NAME = 'SettingsScene'
  static START = `${SettingsScene.NAME}Start`
  static MENU = `${SettingsScene.NAME}Menu`

  constructor () {
    super(SCENE_SETTINGS)
  }

  create () {
    this.createSoundButton()
    this.createMenuButton()
  }

  createMenuButton () {
    this.menuButton = this.add.sprite(0, 0, 'back').setInteractive()
    this.menuButton.x = this.menuButton.width / 2 + 5
    this.menuButton.y = this.menuButton.height / 2 + 5
    this.menuButton.on('pointerup', () => {
      this.events.emit('menuClicked')
    })
  }

  createSoundButton () {
    this.soundButton = this.add.sprite(0, 0, 'button').setInteractive()
    this.soundButton.x = gameConfig.width / 2
    this.soundButton.y = gameConfig.height * 0.5
    this.soundText = this.add
      .text(this.soundButton.x, this.soundButton.y, `Sound: On`, {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#ffffff',
      })
      .setOrigin(0.5)
  }

  turnOffSound () {
    this.soundText.setText('Sound: Off')
    this.events.emit('musicOff')
    this.soundButton.once('pointerup', this.turnOnSound, this)
  }

  turnOnSound () {
    this.soundText.setText('Sound: On')
    this.events.emit('musicOn')
    this.soundButton.once('pointerup', this.turnOffSound, this)
  }

  setSoundState (isEnabled) {
    this.soundText.setText(isEnabled ? 'Sound: On' : 'Sound: Off')
    this.soundButton.once('pointerup', isEnabled ? this.turnOffSound : this.turnOnSound, this)
  }
}
