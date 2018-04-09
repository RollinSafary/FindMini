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
  }

  createBackground (bgType) {
    this.background = this.add.sprite(0, 0, `background${bgType}`).setScale(2)
    this.background.depth = -100
  }

  createPlayButton () {
    createButton(this, gameConfig.width / 2, gameConfig.height / 3, 'button', 'Start Game', 1, this.onStartGameClick, this)
  }

  createHardCoreButton () {
    createButton(this, gameConfig.width / 2, gameConfig.height / 2, 'button', 'Hardcore', 1, this.onHardCoreClick, this)
  }

  onStartGameClick () {
    this.events.emit('onStartGameClick')
  }

  onHardCoreClick () {
    this.events.emit('onHardCoreClick')
  }

  // createButton(x, y, text, hook, context, ...args) {
  //   const button = this.add
  //     .sprite(x, y, 'button')
  //     .setInteractive()
  //   button.on('pointerdown', () => {
  //     button.setScale(-1)
  //   }, this)
  //   button.on('pointerup', () => {
  //     button.setScale(1)
  //     hook.apply(context, args)
  //   }, this)
  //   button.on('pointerout', () => {
  //     button.setScale(1)
  //   })
  //   this.add
  //     .text(x, y, text, {
  //       fontFamily: 'Arial',
  //       fontSize: 36,
  //       color: '#feffc5',
  //     })
  //     .setOrigin(0.5)
  // }
}
