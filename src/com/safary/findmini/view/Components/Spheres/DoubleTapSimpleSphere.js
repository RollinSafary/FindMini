
import SphereView from './SphereView'

export default class DoubleTapSimpleSphere extends SphereView {
  static DESCRIPTION = 'need to tap twice'

  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x2faabc, 0xff5000, 0x377695, number)
    this.createZone()
  }

  createBody (bgColor, secondBgColor, centerColor, number) {
    this.createBackgroundCircle(bgColor)
    this.createBackgroundCircle(secondBgColor)
    this.createCenterCircle(centerColor)
    this.createNumberText(number, '#ffffff')
  }

  onClickAction () {
    this.removeFrontLayerBackground()
    this.onClickAction = super.onClickAction
  }
}
