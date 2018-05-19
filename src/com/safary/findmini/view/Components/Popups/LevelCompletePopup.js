import Phaser from 'phaser'
import { gameConfig } from '../../../constants/GameConfig'
import { OBJECT_TYPES } from '../../../constants/Constants'
import StandardPopup from './StandardPopup'

export default class LevelCompletePopup extends StandardPopup {
  static NAME = 'LevelCompletePopup'
  static OKAY_CLICKED = `${LevelCompletePopup.NAME}OkayClicked`
  static ACTION_DEFAULT = 0

  constructor () {
    super()
    this.phrases = {
      1: ['You can better'],
      2: ['Very good'],
      3: ['Excellent'],
    }
    this.createBackground()
    this.createTitleText()
    this.createScoreText()
    this.createOkayButton()
  }

  createBody (args) {
    this.score = args[1]
    this.starsCount = args[2]
    this.titleText.setText(`Level ${this.level} Complete !!!`)
    this.scoreText.setText(`SCORE: ${this.score}`)
    this.setCongratulationsText(this.starsCount)
    this.createStars(this.starsCount)
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
    this.congratulations = this.scene.add.text(
      gameConfig.width / 2,
      this.backgroundRectangle.y + 50,
      'Congratulations',
      {
        fontFamily: 'Arial',
        fontSize: 40,
        color: '#ffffff',
      }).setOrigin(0.5)
    this.titleText = this.scene.add
      .text(
        gameConfig.width / 2,
        this.congratulations.y + 50,
        `LEVEL`,
        {
          fontFamily: 'Arial',
          fontSize: 36,
          color: '#ffffff',
        },
      )
      .setOrigin(0.5)
    this.add(this.titleText)
    this.add(this.congratulations)
  }

  setCongratulationsText (index) {
    this.congratulations.setText(this.phrases[index][0])
  }

  createScoreText () {
    this.scoreText = this.scene.add
      .text(
        this.backgroundRectangle.centerX,
        this.backgroundRectangle.centerY,
        `LEVEL`,
        {
          fontFamily: 'Arial',
          fontSize: 40,
          color: '#ffffff',
        },
      )
      .setOrigin(0.5)
    this.add(this.scoreText)
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
    this.events.emit('actionDone', LevelCompletePopup.ACTION_DEFAULT, this.level, this.score, this.starsCount)
  }

  show (args) {
    this.enableButtons()
    this.level = args[0]
    this.createBody(args)
    super.show()
  }

  createStars (count) {
    this.stars = []
    for (let i = 0; i < count; i++) {
      const star = this.scene.add.sprite(0, 0, 'star')
      this.add(star)
      this.stars.push(star)
      switch (this.stars.length) {
        case 1:
          star.x = this.backgroundRectangle.centerX - star.width * 1.5
          break
        case 2:
          star.x = this.backgroundRectangle.centerX + star.width * 1.5
          break
        case 3:
          star.x = this.backgroundRectangle.centerX

          break
      }
      star.y = this.backgroundRectangle.centerY - 100
      star.visible = false
    }
  }

  showStars () {
    const timeline = this.scene.tweens.createTimeline()
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i]
      timeline.add({
        targets: star,
        ease: 'Power1',
        duration: 300,
        scaleX: 1,
        scaleY: 1,
        onStart: () => {
          star.visible = true
          star.setScale(3)
        },
      })
    }
    timeline.play()
  }

  onShowComplete () {
    this.showStars()
    super.onShowComplete()
  }

  removeStars () {
    for (const star of this.stars) {
      star.destroy()
    }
  }

  onHideStart () {
    this.disableButtons()
    this.removeStars()
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
