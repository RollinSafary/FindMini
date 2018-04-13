import { SCENE_LOADING } from '../../constants/Constants'
import Phaser from 'phaser'
import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'

export default class LoadingScene extends FindMiniScene {
  static NAME = 'LoadingScene'

  constructor () {
    super(SCENE_LOADING)
  }

  preload () {
    this.load.image('loading', 'assets/loading.png')
  }

  create () {
    const rect = new Phaser.Geom.Rectangle(0, 0, gameConfig.width, gameConfig.height)
    const rectGraphics = this.add.graphics({fillStyle: {color: 0x000000}})
    rectGraphics.fillRectShape(rect)
    rectGraphics.alpha = 0.8
    this.loadingSprite = this.add.sprite(gameConfig.width / 2, gameConfig.height / 2, 'loading')
    this.loadingPercent = this.add.text(this.loadingSprite.x, this.loadingSprite.y, '97%', {
      fontFamily: 'Arial',
      fontSize: 48,
      color: '#feffc5',
    }).setOrigin(0.5)

    const loadingText = this.add.text(gameConfig.width / 2, gameConfig.height * 0.7, 'Loading...', {
      fontFamily: 'Arial',
      fontSize: 52,
      color: '#feffc5',
    }).setOrigin(0.5)
  }

  update () {
    this.loadingSprite.angle += 7
  }
}
