import { Mediator } from '@koreez/pure-mvc'

export default class FingerBallsSceneMediator extends Mediator {
  constructor (name, viewComponent) {
    super(name, viewComponent)
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
    this.facade.sendNotification(this.viewComponent.constructor.BOOT)
  }

  onScenePause () {
    this.facade.sendNotification(this.viewComponent.constructor.PAUSE)
  }

  onSceneResume () {
    this.facade.sendNotification(this.viewComponent.constructor.RESUME)
  }

  onSceneSleep () {
    this.facade.sendNotification(this.viewComponent.constructor.SLEEP)
  }

  onSceneWake () {
    this.facade.sendNotification(this.viewComponent.constructor.WAKE)
  }

  onSceneStart () {
    this.facade.sendNotification(this.viewComponent.constructor.START)
  }

  onSceneShutdown () {
    this.facade.sendNotification(this.viewComponent.constructor.SHUTDOWN)
  }

  onSceneDestroy () {
    this.facade.sendNotification(this.viewComponent.constructor.DESTROY)
  }
}
