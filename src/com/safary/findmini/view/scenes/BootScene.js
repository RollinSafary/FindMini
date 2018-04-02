import { SCENE_BOOT, GENERAL_ASSETS_KEY } from '../../constants/Constants'
import {
  onLoadStart,
  onFileLoadComplete,
  onLoadComplete,
} from '../../constants/LoaderEvents'
import FindMiniScene from './FindMiniScene'

export default class BootScene extends FindMiniScene {
  static NAME = 'BootScene'
  static START = `${BootScene.NAME}Start`
  static FILE_LOAD_COMPLETE = `${BootScene.NAME}FileLoadComplete`
  static LOAD_COMPLETE = `${BootScene.NAME}LoadComplete`

  constructor () {
    super(SCENE_BOOT)
  }

  init () {
    this.totalLoaded = 0
  }

  preload () {
    this.load.image('preview', 'assets/preview.png')
    this.load.atlas(
      GENERAL_ASSETS_KEY,
      'assets/atlases/general.png',
      'assets/atlases/general.json',
    )
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

  onLoadComplete (loader) {
    onLoadComplete('Initial assets')
    this.events.emit('loadComplete')
    this.load.off('start')
    this.load.off('load')
    this.load.off('complete')
  }
}
