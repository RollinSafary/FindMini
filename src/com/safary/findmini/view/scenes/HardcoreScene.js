import { gameConfig } from '../../constants/GameConfig'
import { BOMB_NAME, OBJECT_TYPES, SCENE_GAME, SCENE_HARDCORE } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import Phaser from 'phaser'
import GameNavigationView from '../Components/TopBars/GameNavigationView'
import ConditionsView from '../Components/Tutorials/ConditionsView'
import { delayRunnable, removeRunnable } from '../../utils/utils'

export default class HardcoreScene extends FindMiniScene {
  static NAME = 'HardcoreScene'
  static START = `${HardcoreScene.NAME}Start`
  static GAME_OVER = `${HardcoreScene.NAME}GameOver`

  constructor () {
    super(SCENE_HARDCORE)
  }

  create () {
    this.distance = 30
    this.startX = this.distance
    this.startY = this.distance + 75
    this.endX = gameConfig.width - this.distance
    this.endY = gameConfig.height - this.distance
    this.score = 0
  }

  createNavigationView (soundState) {
    if (this.navigationContainer) {
      return
    }
    this.navigationContainer = this.add.container(0, 0)
    this.gameNavigation = new GameNavigationView(this)
    this.navigationContainer.add(this.gameNavigation)
    this.gameNavigation.setTimer(0)
    this.gameNavigation.setScore(0)
    this.gameNavigation.setSoundState(soundState)
  }

  startNewGame (hardCoreLevel) {
    this.hardMode = false
    this.events.on('onSphereClick', this.onSphereClick, this)
    this.events.on('onSphereMustDestroy', this.destroySphere, this)
    this.clearWorld()
    this.emitSpheres(hardCoreLevel)
  }

  emitSpheres (options) {
    this.spheresMaxCount = options.length + 20
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
        onComplete: () => {
          sphere.start()
        },
      })
    }
    setTimeout(() => {
      this.enableSpheresMoving()
      this.timerRunnable = delayRunnable(this, 1000, this.changeTimer, this)
    }, this.spheres.length * 75)
  }

  emitSphere () {
    const randomTypeIndex = Phaser.Math.Between(0, 1)
    const keys = Object.keys(OBJECT_TYPES)
    const sphereType = OBJECT_TYPES[keys[randomTypeIndex]]
    const x = Phaser.Math.Between(this.startX, this.endX)
    const y = Phaser.Math.Between(this.startY, this.endY)
    const number = this.generateNumber(1, this.numbersArray.length + 10)
    this.numbersArray.push(number)
    const sphere = new sphereType(this, x, y, number)
    sphere.visible = false
    this.spheresContainer.add(sphere)
    sphere.x = gameConfig.width / 2
    sphere.y = gameConfig.height / 2
    this.tweens.add({
      targets: sphere,
      x: x,
      y: y,
      duration: 300,
      ease: 'Sine.easeInOut',
      onStart: () => {
        sphere.visible = true
      },
      onComplete: () => {
        sphere.start()
      },
    })
  }

  changeTimer () {
    const time = this.gameNavigation.getTimerValue()
    if ((time !== 0 && time % 2 === 0) || this.hardMode) {
      this.emitSphere()
      if (this.spheresContainer.list.length >= this.spheresMaxCount) {
        this.gameOver()
      }
    }
    this.gameNavigation.setTimer(time + 1)
    this.timerRunnable = delayRunnable(this, 1000, this.changeTimer, this)
  }

  hardState () {
    this.hardMode = true
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
      const sphere = new sphereType(this, x, y, number)
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
    target.destroy()
    this.numbersArray.splice(this.numbersArray.indexOf(target.number), 1)
    if (this.numbersArray.length === 10) {
      this.events.emit('harder')
    }
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

  createGift (x, y) {

  }

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
