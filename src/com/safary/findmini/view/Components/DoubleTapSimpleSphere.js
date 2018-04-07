import SphereView from './SphereView'

export default class DoubleTapSimpleSphere extends SphereView {
  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x00ffff, 0xff0000, 0x008080, number)
    this.hitArea.on('pointerup', this.onClick, this)
    this.doubleTap = true
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
