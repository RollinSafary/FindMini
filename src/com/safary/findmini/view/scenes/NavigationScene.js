import { SCENE_NAVIGATION } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'
import { createButton } from '../../utils/utils'

export default class NavigationScene extends FindMiniScene {
  static NAME = 'NavigationScene'
  static START = `${NavigationScene.NAME}Start`
  static START_GAME = NavigationScene.NAME + 'StartGame'

  constructor () {
    super(SCENE_NAVIGATION)
  }

  create () {
    this.createBackground()
    this.createPlayButton()
    this.createHardCoreButton()
  }

  createBackground () {
    this.background = this.add.sprite(0, 0, 'background').setScale(2)
  }

  createPlayButton () {
    createButton(this, gameConfig.width / 2, gameConfig.height / 3, 'Start Game', this.onStartGameClick, this)
  }

  createHardCoreButton () {
    createButton(this, gameConfig.width / 2, gameConfig.height / 2, 'Hardcore', this.onHardCoreClick, this)
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
