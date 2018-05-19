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

    // images' load

    this.load.image('background', `assets/images/background${this.themeNumber}.jpg`)
    this.load.image('button', `assets/images/button.png`)
    this.load.image('back', `assets/images/back.png`)
    this.load.image('musicOn', `assets/images/musicOn.png`)
    this.load.image('musicOff', `assets/images/musicOff.png`)
    this.load.image('level', 'assets/images/level.png')
    this.load.image('levelDisabled', 'assets/images/levelDisabled.png')
    this.load.image('star', 'assets/images/star.png')
    // this.load.image('popupBackground', 'assets/images/popupBackground.png')

    // sounds' load

    this.load.audio('backgroundMusic', [
      'assets/sounds/background.ogg',
      'assets/sounds/background.mp3',
    ])
    this.load.audio('hit', ['assets/sounds/hit.ogg', 'assets/audio/hit.mp3'])
    this.load.audio('miss', ['assets/sounds/miss.ogg', 'assets/audio/miss.mp3'])
    this.load.audio('bubble', ['assets/sounds/bubble.ogg', 'assets/audio/bubble.mp3'])

    // setting listeners

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
    const loopMarker = {
      name: 'loop',
      start: 0,
      // duration: 7.68,
      config: {
        loop: true,
      },
    }
    this.backgroundMusic.addMarker(loopMarker)
    this.backgroundMusic.play('loop')
    this.backgroundMusic.pause()
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

  setSoundState (state) {
    if (state) {
      this.backgroundMusic.resume()
    } else {
      this.backgroundMusic.pause()
    }
  }
}
