import SphereView from './SphereView'

export default class SimpleSphere extends SphereView {
  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x00ffff, 0x008080, number)
    this.hitArea.once('pointerup', this.onClick, this)
  }

  createBody (bgColor, centerColor, number) {
    this.createBackgroundCircle(bgColor)
    this.createCenterCircle(centerColor)
    this.createNumberText(number, '#ffffff')
  }
}
