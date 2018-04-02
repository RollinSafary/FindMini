import { gameConfig } from '../../constants/GameConfig'
import { SCENE_GAME, GENERAL_ASSETS_KEY } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'

export default class GameScene extends FindMiniScene {
  static NAME = 'GameScene'
  static START = `${GameScene.NAME}Start`

  constructor () {
    super(SCENE_GAME)
  }

  create () {}

  update () {}
}
