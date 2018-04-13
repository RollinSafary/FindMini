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
