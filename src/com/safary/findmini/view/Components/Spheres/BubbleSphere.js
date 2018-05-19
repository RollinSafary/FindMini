
import SphereView from './SphereView'
import { BUBBLE_NAME } from '../../../constants/Constants'

export default class BubbleSphere extends SphereView {
  static DESCRIPTION = 'it\'s a bubble with\nspheres in it'

  constructor (scene, x, y, number) {
    super(scene, x, y, number)
    this.createBody(0x5AFF80, 0x5affb2, number)
    this.createZone()
  }

  createBody (bgColor, centerColor, number) {
    this.createBackgroundCircle(bgColor)
    this.createCenterCircle(centerColor)
    this.createNumberText(number, '#ffffff')
    this.name = BUBBLE_NAME
  }

  onClickAction () {
      this.scene.events.emit('onBubbleClick', this)
  }
}
