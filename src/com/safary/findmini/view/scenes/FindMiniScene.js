import Phaser from 'phaser'

export default class FindMiniScene extends Phaser.Scene {
  static NAME = 'FindMiniScene'
  constructor (name) {
    super(name)
    this.constructor['BOOT'] = `${this.constructor.NAME}BootNotification`
    this.constructor['PAUSE'] = `${this.constructor.NAME}PauseNotification`
    this.constructor['RESUME'] = `${this.constructor.NAME}ResumeNotification`
    this.constructor['SLEEP'] = `${this.constructor.NAME}SleepNotification`
    this.constructor['WAKE'] = `${this.constructor.NAME}WakeNotification`
    this.constructor['START'] = `${this.constructor.NAME}StartNotification`
    this.constructor['SHUTDOWN'] = `${this.constructor.NAME}ShutdownNotification`
    this.constructor['DESTROY'] = `${this.constructor.NAME}DestroyNotification`
  }

  addChild (child) {
    this.sys.displayList.add(child)
  }
}
