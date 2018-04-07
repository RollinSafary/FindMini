import Phaser from 'phaser'
import 'babel-polyfill'
import { gameConfig } from './constants/GameConfig'
import { Facade } from '@koreez/pure-mvc'
import FindMiniFacade from './FindMiniFacade'
import firebase from 'firebase'

const consoleArgs = [
  `%c %c %c  FindMini  %c %c `,
  `background: ${'#c8ffc8'}`,
  `background: ${'#96ff96'}`,
  `color: ${'#0003ff'}; background: ${'#00FF00'};`,
  `background: ${'#96ff96'}`,
  `background: ${'#c8ffc8'}`,
]

export const PLAYER_COLLECTION_NAME = 'PlayerObjects'

export default class FindMiniGame extends Phaser.Game {
  static NAME = 'FindMiniGame'

  constructor (config) {
    super(config)
    window.onresize = this.resize.bind(this)
    this.resize()
    console.log.apply(console, consoleArgs)

    this.init()
    Facade.getInstance = FindMiniFacade.getInstance
    this.facade = Facade.getInstance(FindMiniFacade.NAME)
  }

  init () {
    firebase.initializeApp({
      apiKey: 'AIzaSyCvnD8pqdipJTMnqVfWEs5DypD7sQktvWY',
      authDomain: 'find-mini.firebaseapp.com',
      projectId: 'find-mini',
      storageBucket: 'find-mini.appspot.com',
    })
  }

  resize () {
    const { width, height } = this.config
    const scale = Math.min(
      window.innerHeight / height,
      window.innerWidth / width,
    )
    this.canvas.style.position = 'absolute'
    this.canvas.style.width = width * scale + 'px'
    this.canvas.style.height = height * scale + 'px'
    this.canvas.style.left = (window.innerWidth - width * scale) * 0.5 + 'px'
    this.canvas.style.top = (window.innerHeight - height * scale) * 0.5 + 'px'
    if (this.context) {
      this.context.rect(0, 0, width, height)
      this.context.fillStyle = 'red'
      this.context.fill()
    }
    super.resize(gameConfig.width, gameConfig.height)
  }
}

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    window.game = new FindMiniGame(gameConfig)
  }
}
