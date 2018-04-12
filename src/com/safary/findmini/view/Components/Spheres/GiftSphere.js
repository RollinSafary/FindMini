import SphereView from './SphereView'

export default class GiftSphere extends SphereView {
  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x5AFF80, 0x5AFF80, number)
    this.createZone()
  }

  createBody (bgColor, centerColor, number) {
    this.createBackgroundCircle(bgColor)
    this.createCenterCircle(centerColor)
    this.createNumberText(number, '#ffffff')
  }

  onClickAction () {
    this.scene.events.emit('giftClicked', this.x, this.y)
    super.onClickAction()
  }
}
