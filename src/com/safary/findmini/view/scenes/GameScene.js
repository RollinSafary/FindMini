import { gameConfig } from '../../constants/GameConfig'
import { BOMB_NAME, SCENE_GAME } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import Phaser from 'phaser'
import GameNavigationView from '../Components/GameNavigationView'
import ConditionsView from '../Components/ConditionsView'

export default class GameScene extends FindMiniScene {
  static NAME = 'GameScene'
  static START = `${GameScene.NAME}Start`
  static LEVEL_COMPLETE = `${GameScene.NAME}LevelComplete`
  static LEVEL_FAILED = `${GameScene.NAME}LevelFailed`

  constructor () {
    super(SCENE_GAME)
  }

  create () {
    this.distance = 30
    this.startX = this.distance
    this.startY = this.distance + 50
    this.endX = gameConfig.width - this.distance
    this.endY = gameConfig.height - this.distance
    // this.createBackgroundMusic()
    this.createNavigationView()
  }

  createBackgroundMusic () {
    this.backgroundMusic = this.sound.add('theme')
    this.backgroundMusic.play()
  }

  showConditions (level, conditions) {
    this.level = level
    if (this.conditionsContainer) {
      this.conditionsContainer.destroy()
      this.conditionsContainer = null
      this.conditionsView = null
    }
    this.conditionsContainer = this.add.container(0, 0)
    this.conditionsView = new ConditionsView(this, level, conditions)
    this.conditionsContainer.add(this.conditionsView)
  }

  createNavigationView () {
    if (this.navigationContainer) {
      return
    }
    this.navigationContainer = this.add.container(0, 0)
    this.gameNavigation = new GameNavigationView(this)
    this.navigationContainer.add(this.gameNavigation)
  }

  startNewGame (conditionsView, options) {
    this.events.on('onSphereClick', this.onSphereClick, this)
    this.events.on('onSphereMustDestroy', this.destroySphere, this)
    this.clearWorld()
    this.clearConditions(conditionsView, options)
  }

  clearConditions (conditionsView, options) {
    this.conditionsContainer.alpha = 1
    this.tweens.add({
      targets: conditionsView.list,
      alpha: 0,
      duration: 300,
      ease: 'Power1',
      onComplete: () => {
        conditionsView.destroy()
        this.conditionsContainer.destroy()
        this.createNumbersArray(options.length)
        this.createSpheres(options)
      },
    })
  }

  clearWorld () {
    if (this.spheresContainer) {
      this.spheresContainer.destroy()
    }
    this.spheresContainer = null
  }

  createSpheres (options) {
    this.spheresContainer = this.add.container(0, 0)
    for (let i = 0; i < options.length; i++) {
      const sphereType = options[i]
      const x = Phaser.Math.Between(this.startX, this.endX)
      const y = Phaser.Math.Between(this.startY, this.endY)
      const number = this.numbersArray[i]
      this.spheresContainer.add(new sphereType(this, x, y, number))
    }
  }

  createNumbersArray (length) {
    this.numbersArray = []
    for (let i = 0; i < length; i++) {
      this.numbersArray.push(this.generateNumber(1, length + 10))
    }
  }

  generateNumber (min, max) {
    let randomNumber = 0
    do {
      randomNumber = Phaser.Math.Between(min, max)
    } while (this.numbersArray.includes(randomNumber))
    return randomNumber
  }

  onSphereClick (target) {
    if (!this.checkToRemove(target)) {
      return
    }
    target.onClickAction()
  }

  checkToRemove (target) {
    for (const sphere of this.spheresContainer.list) {
      if (target.number > sphere.number) {
        if (sphere.name === BOMB_NAME) {
          continue
        }
        return false
      }
    }
    return true
  }
  destroySphere (target) {
    target.destroy()
    if (this.chekcWinConditions()) {
      this.events.emit('levelComplete', this.level)
    }
  }

  update () {
    if (this.spheresContainer) {
      for (const sphere of this.spheresContainer.list) {
        sphere.update()
      }
    }
  }

  createGift (x, y) {

  }

  chekcWinConditions () {
    if (this.spheresContainer.list.length === 0) {
      return true
    }
    for (const sphere of this.spheresContainer.list) {
      if (sphere.name !== BOMB_NAME) {
        return false
      }
    }
    return true
  }
}
