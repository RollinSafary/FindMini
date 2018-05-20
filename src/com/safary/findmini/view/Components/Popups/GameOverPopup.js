import Phaser from 'phaser'
import { gameConfig } from '../../../constants/GameConfig'
import { OBJECT_TYPES } from '../../../constants/Constants'
import StandardPopup from './StandardPopup'

export default class GameOverPopup extends StandardPopup {
  static NAME = 'GameOverPopup'
  static RESTART_CLICKED = `${GameOverPopup.NAME}RestartClicked`
  static BACK_CLICKED = `${GameOverPopup.NAME}BackClicked`
  static ACTION_DEFAULT = 0
  static ACTION_RESTART = 1

  constructor () {
    super()
    this.createBackground()
    this.createTitleText()
    this.createLevelText()
    this.createButtons()
  }

  createBody (args) {
    this.levelText.setText(`Level ${this.level}`)
  }

  createButtons () {
    this.restartButton = this.scene.add.sprite(0, 0, 'restart').setInteractive()
    this.restartButton.on('pointerup', () => {
      this.events.emit('actionDone', GameOverPopup.ACTION_RESTART, this.level)
    })
    this.add(this.restartButton)
    this.restartButton.x = this.backgroundRectangle.centerX - this.restartButton.width
    this.restartButton.y = this.backgroundRectangle.bottom - this.restartButton.height
    this.backButton = this.scene.add.sprite(0, 0, 'back').setInteractive()
    this.backButton.on('pointerup', () => {
      this.events.emit('actionDone', GameOverPopup.ACTION_DEFAULT)
    })
    this.add(this.backButton)
    this.backButton.x = this.backgroundRectangle.centerX + this.backButton.width
    this.backButton.y = this.backgroundRectangle.bottom - this.backButton.height
    this.disableButtons()
  }

  createBackground () {
    const widthMultiplier = 0.8
    const heightMultiplier = 0.4
    this.backgroundRectangle = new Phaser.Geom.Rectangle(
      gameConfig.width * (1 - widthMultiplier) / 2,
      gameConfig.height * (1 - heightMultiplier) / 2,
      gameConfig.width * widthMultiplier,
      gameConfig.height * heightMultiplier,
    )
    this.background = this.scene.make.graphics({
      fillStyle: { color: 0x000000 },
    })
    this.background.fillRectShape(this.backgroundRectangle)
    this.background.alpha = 0.6
    this.add(this.background)
  }

  createTitleText () {
    this.titleText = this.scene.add.text(
      gameConfig.width / 2,
      this.backgroundRectangle.y + 50,
      'Game Over',
      {
        fontFamily: 'Arial',
        fontSize: 40,
        color: '#ffffff',
      }).setOrigin(0.5)
    this.add(this.titleText)
  }

  createLevelText () {
    this.levelText = this.scene.add
      .text(
        gameConfig.width / 2,
        this.titleText.y + 50,
        `LEVEL`,
        {
          fontFamily: 'Arial',
          fontSize: 36,
          color: '#ffffff',
        },
      )
      .setOrigin(0.5)
    this.add(this.levelText)
  }

  show (args) {
    this.enableButtons()
    this.level = args[0]
    this.createBody(args)
    super.show()
  }

  hide () {
    this.disableButtons()
    super.hide()
  }

  enableButtons () {
    this.restartButton.input.enabled = true
    this.backButton.input.enabled = true
  }
  disableButtons () {
    this.restartButton.input.enabled = false
    this.backButton.input.enabled = false
  }

  onShowComplete () {
    super.onShowComplete()
  }
}
