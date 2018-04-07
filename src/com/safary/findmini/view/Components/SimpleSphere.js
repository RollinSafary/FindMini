import SphereView from './SphereView'

export default class SimpleSphere extends SphereView {
  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x2faabc, 0x377695, number)
    this.createZone()
  }

  createBody (bgColor, centerColor, number) {
    this.createBackgroundCircle(bgColor)
    this.createCenterCircle(centerColor)
    this.createNumberText(number, '#ffffff')
  }
}
