import { SCENE_NAVIGATION } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'

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
    this.playButton = this.add
      .sprite(gameConfig.width / 2, gameConfig.height / 3, 'button')
      .setScale(0.5)
      .setInteractive()
    this.playButton.on('pointerup', this.onStartGameClick, this)
    this.add
      .text(this.playButton.x, this.playButton.y, 'Start Game', {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#feffc5',
      })
      .setOrigin(0.5)
  }

  createHardCoreButton () {
    this.hardCoreButton = this.add
      .sprite(gameConfig.width / 2, gameConfig.height / 2, 'button')
      .setScale(0.5)
      .setInteractive()
    this.hardCoreButton.on('pointerup', this.onHardCoreClick, this)
    this.add
      .text(this.hardCoreButton.x, this.hardCoreButton.y, 'Hard Core', {
        fontFamily: 'Arial',
        fontSize: 36,
        color: '#feffc5',
      })
      .setOrigin(0.5)
  }

  onStartGameClick () {
    this.events.emit('onStartGameClick')
  }

  onHardCoreClick () {
    this.events.emit('onHardCoreClick')
  }
}
