import { gameConfig } from '../../constants/GameConfig'
import { BOMB_NAME, SCENE_GAME } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import Phaser from 'phaser'
import GameNavigationView from '../Components/TopBars/GameNavigationView'
import ConditionsView from '../Components/Tutorials/ConditionsView'
import { delayRunnable, removeRunnable } from '../../utils/utils'

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
    this.startY = this.distance + 75
    this.endX = gameConfig.width - this.distance
    this.endY = gameConfig.height - this.distance
    this.score = 0
  }

  showConditions (level, conditions) {
    this.level = level
    this.conditionsView = new ConditionsView(this, level, conditions)
    this.add.existing(this.conditionsView)
  }

  createNavigationView (remaining) {
    this.gameNavigation = new GameNavigationView(this)
    this.add.existing(this.gameNavigation)
    this.gameNavigation.setTimer(remaining)
    this.gameNavigation.setScore(0)
  }

  setSoundState (soundState) {
    this.gameNavigation.setSoundState(soundState)
  }

  startNewGame (conditionsView, options) {
    this.events.on('onSphereClick', this.onSphereClick, this)
    this.events.on('onSphereMustDestroy', this.destroySphere, this)
    this.clearConditions(conditionsView, options)
  }

  clearConditions (conditionsView, options) {
    this.tweens.add({
      targets: conditionsView.list,
      alpha: 0,
      duration: 300,
      ease: 'Power1',
      onComplete: () => {
        conditionsView.destroy()
        this.emitSpheres(options)
      },
    })
  }

  emitSpheres (options) {
    this.createNumbersArray(options.length)
    this.createSpheres(options)
    for (let i = 0; i < this.spheres.length; i++) {
      const sphere = this.spheres[i]
      const x = sphere.x
      const y = sphere.y
      sphere.x = gameConfig.width / 2
      sphere.y = gameConfig.height / 2
      this.tweens.add({
        targets: sphere,
        x: x,
        y: y,
        delay: i * 75,
        duration: 300,
        ease: 'Sine.easeInOut',
        onStart: () => {
          sphere.visible = true
        },
      })
    }
    setTimeout(() => {
      this.enableSpheresMoving()
      this.timerRunnable = delayRunnable(this, 1000, this.changeTimer, this)
    }, this.spheres.length * 75)
  }

  changeTimer () {
    const remaining = this.gameNavigation.getTimerValue()
    if (remaining === 0) {
      this.gameOver()
      return
    }
    this.gameNavigation.setTimer(remaining - 1)
    this.timerRunnable = delayRunnable(this, 1000, this.changeTimer, this)
  }

  gameOver () {
    if (this.timerRunnable) {
      removeRunnable(this.timerRunnable)
    }
    this.events.emit('gameOver')
  }

  enableSpheresMoving () {
    for (const sphere of this.spheres) {
      sphere.start()
    }
  }

  createSpheres (options) {
    this.spheresContainer = this.add.container(0, 0)
    for (let i = 0; i < options.length; i++) {
      const SphereType = options[i]
      const x = Phaser.Math.Between(this.startX, this.endX)
      const y = Phaser.Math.Between(this.startY, this.endY)
      const number = this.numbersArray[i]
      const sphere = new SphereType(this, x, y, number)
      sphere.visible = false
      this.spheresContainer.add(sphere)
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
    this.score += target.number
    this.gameNavigation.setScore(this.score)
    this.tweens.add({
      targets: target,
      ease: 'Power1',
      duration: 200,
      scaleX: 0,
      scaleY: 0,
      onComplete: () => {
        target.destroy()
      },
    })
    if (this.checkWinConditions(target)) {
      setTimeout(() => {
        this.events.emit('levelComplete', this.level, this.score)
      }, 300)
    }
  }

  update () {
    if (this.spheresContainer) {
      for (const sphere of this.spheresContainer.list) {
        sphere.update()
      }
    }
  }

  createGift (x, y) {}

  checkWinConditions (target) {
    if (this.spheresContainer.list.length === 0) {
      return true
    }
    for (const sphere of this.spheresContainer.list) {
      if (sphere.name !== BOMB_NAME && sphere.number !== target.number) {
        return false
      }
    }
    return true
  }

  get spheres () {
    return this.spheresContainer.list
  }
}
