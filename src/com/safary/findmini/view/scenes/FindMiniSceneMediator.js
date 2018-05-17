import { Mediator } from '@koreez/pure-mvc'

export default class FindMiniSceneMediator extends Mediator {
  constructor (name, viewComponent) {
    super(name, viewComponent)
    if (!this.viewComponent) {
      return
    }
    this.setListeners()
  }

  setListeners () {
    this.viewComponent.sys.events.on('boot', this.onSceneBoot, this)
    this.viewComponent.sys.events.on('pause', this.onScenePause, this)
    this.viewComponent.sys.events.on('resume', this.onSceneResume, this)
    this.viewComponent.sys.events.on('sleep', this.onSceneSleep, this)
    this.viewComponent.sys.events.on('wake', this.onSceneWake, this)
    this.viewComponent.sys.events.on('start', this.onSceneStart, this)
    this.viewComponent.sys.events.on('shutdown', this.onSceneShutdown, this)
    this.viewComponent.sys.events.on('destroy', this.onSceneDestroy, this)
  }

  onSceneBoot () {
    this.sendNotification(this.viewComponent.constructor.BOOT)
  }

  onScenePause () {
    this.sendNotification(this.viewComponent.constructor.PAUSE)
  }

  onSceneResume () {
    this.sendNotification(this.viewComponent.constructor.RESUME)
  }

  onSceneSleep () {
    this.sendNotification(this.viewComponent.constructor.SLEEP)
  }

  onSceneWake () {
    this.sendNotification(this.viewComponent.constructor.WAKE)
  }

  onSceneStart () {
    this.sendNotification(this.viewComponent.constructor.START)
  }

  onSceneShutdown () {
    this.sendNotification(this.viewComponent.constructor.SHUTDOWN)
  }

  onSceneDestroy () {
    this.sendNotification(this.viewComponent.constructor.DESTROY)
  }

  get scenes () {
    return window.game.scene
  }

  get events () {
    return this.viewComponent.events
  }
}
