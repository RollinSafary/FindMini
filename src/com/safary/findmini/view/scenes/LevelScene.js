import { SCENE_LEVEL } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'
import { gameConfig } from '../../constants/GameConfig'
import { createButton } from '../../utils/utils'
import LevelNavigationView from '../Components/TopBars/LevelNavigationView'

export default class LevelScene extends FindMiniScene {
  static NAME = 'LevelScene'
  static START = `${LevelScene.NAME}Start`

  static START_LEVEL = LevelScene.NAME + 'StartLevel'
  static MENU_CLICKED = `${LevelScene.NAME}MenuClicked`

  constructor () {
    super(SCENE_LEVEL)
  }

  createNavigationView (soundState) {
    if (this.navigationContainer) {
      return
    }
    this.navigationContainer = this.add.container(0, 0)
    this.levelNavigation = new LevelNavigationView(this)
    this.navigationContainer.add(this.levelNavigation)
    this.levelNavigation.setSoundState(soundState)
  }

  createLevels (level, maxLevels) {
    if (this.levelsContainer) {
      for (const level of this.levelsContainer.list) {
        level.destroy()
      }
      this.levelsContainer.destroy()
      this.levelsContainer = null
    }
    this.levelsContainer = this.add.container(0, 0)
    for (let i = 1; i <= maxLevels; i++) {
      if (i <= level) {
        this.createOpenedLevel(i)
      } else {
        this.createDisabledLevel(i)
      }
    }
    console.warn(this)
  }

  createOpenedLevel (level) {
    const position = this.generatePosition()
    const levelButton = createButton(this, position.x, position.y, 'level', level, this.emitLevelClick, this, level)
    this.levelsContainer.add(levelButton)
    this.add.text(levelButton.x, levelButton.y, level).setOrigin(0.5)
  }

  createDisabledLevel (level) {
    const position = this.generatePosition()
    const levelButton = createButton(this, position.x, position.y, 'levelDisabled', level)
    this.levelsContainer.add(levelButton)
    this.add.text(levelButton.x, levelButton.y, level).setOrigin(0.5)
  }
  generatePosition () {
    const position = this.lastLevelPosition
    if (position.x >= gameConfig.width - 75) {
      position.y += 87.5
      position.x = 70
    } else {
      position.x += 100
    }
    return position
  }

  emitLevelClick (level) {
    this.events.emit('onLevelClick', level)
  }

  get lastLevelPosition () {
    const levels = this.levelsContainer.list
    const lastLevel = levels[levels.length - 1]
    const position = lastLevel ? lastLevel.list[0] : {x: -30, y: 150}
    return {x: position.x, y: position.y}
  }
}
