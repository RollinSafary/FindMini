import Phaser from 'phaser'

export default class FingerBallsScene extends Phaser.Scene {
  constructor (name) {
    super(name)
    this.constructor['BOOT'] = `${name}BootNotification`
    this.constructor['PAUSE'] = `${name}PauseNotification`
    this.constructor['RESUME'] = `${name}ResumeNotification`
    this.constructor['SLEEP'] = `${name}SleepNotification`
    this.constructor['WAKE'] = `${name}WakeNotification`
    this.constructor['START'] = `${name}StartNotification`
    this.constructor['SHUTDOWN'] = `${name}ShutdownNotification`
    this.constructor['DESTROY'] = `${name}DestroyNotification`
  }
}
