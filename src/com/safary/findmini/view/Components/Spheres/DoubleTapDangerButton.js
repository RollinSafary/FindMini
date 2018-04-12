
import SphereView from './SphereView'
import { BOMB_NAME } from '../../../constants/Constants'

export default class DoubleTapDangerButton extends SphereView {
  static DESCRIPTION = 'it contains a bomb,\ndon\'t tap on it'

  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x2faabc, 0xfc0134, 0x377695, number)
    this.createZone()
  }

  createBody (bgColor, secondBgColor, centerColor, number) {
    this.createBackgroundCircle(bgColor)
    this.createBackgroundCircle(secondBgColor)
    this.createCenterCircle(centerColor)
    this.createCenterCircle(secondBgColor)
    this.createNumberText(number, '#ffffff')
    this.name = BOMB_NAME
  }

  onClickAction () {
    this.removeFrontLayerBackground()
    this.onClickAction = () => {
      this.scene.events.emit('bombClick')
    }
  }
}
