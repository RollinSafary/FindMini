import { SCENE_BOOT } from '../../constants/Constants'
import {
  onLoadStart,
  onFileLoadComplete,
  onLoadComplete,
} from '../../constants/LoaderEvents'
import FindMiniScene from './FindMiniScene'
import Phaser from 'phaser'

export default class BootScene extends FindMiniScene {
  static NAME = 'BootScene'
  static START = `${BootScene.NAME}Start`
  static FILE_LOAD_COMPLETE = `${BootScene.NAME}FileLoadComplete`
  static LOAD_COMPLETE = `${BootScene.NAME}LoadComplete`
  static THEME_CHOOSE = `${BootScene.NAME}ThemeChoose`

  constructor () {
    super(SCENE_BOOT)
  }

  init () {
    this.totalLoaded = 0
  }

  preload () {
    this.themeNumber = Phaser.Math.Between(0, 1)
    this.load.image('background', `assets/background${this.themeNumber}.jpg`)
    this.load.image('button', `assets/button.png`)
    this.load.image('back', `assets/back.png`)
    this.load.image('musicOn', `assets/musicOn.png`)
    this.load.image('musicOff', `assets/musicOff.png`)
    this.load.image('level', 'assets/level.png')
    this.load.image('levelDisabled', 'assets/levelDisabled.png')
    this.load.audio('backgroundMusic', [
      'assets/sounds/background.ogg',
      'assets/audio/background.mp3',
    ])
    this.load.audio('hit', ['assets/sounds/hit.ogg', 'assets/audio/hit.mp3'])
    this.load.on('start', this.onLoadStart, this)
    this.load.on('load', this.onFileLoadComplete, this)
    this.load.on('complete', this.onLoadComplete, this)
  }

  onLoadStart (loader) {
    onLoadStart('Initial assets')
  }

  onFileLoadComplete (file) {
    this.totalLoaded++
    const progress = Math.round(this.totalLoaded * 100 / this.load.totalToLoad)
    this.events.emit('fileLoadComplete', progress)
    onFileLoadComplete(
      progress,
      file.key,
      file.bytesLoaded,
      file.type,
      file.src,
    )
  }
  create () {
    this.createBackground()
    this.createBgMusic()
  }

  createBgMusic () {
    this.backgroundMusic = this.sound.add('backgroundMusic')
    // this.backgroundMusic.play()
  }
  createBackground () {
    this.background = this.add.sprite(0, 0, 'background').setScale(2)
    this.background.depth = -1000
  }

  onLoadComplete (loader) {
    onLoadComplete('Initial assets')
    this.events.emit('loadComplete')
    this.load.off('start')
    this.load.off('load')
    this.load.off('complete')
  }

  setSoundState (state) {}
}
