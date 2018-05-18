import Phaser from 'phaser'
import { delayRunnable, removeRunnable } from '../../../utils/utils'

export default class TypeWriter extends Phaser.GameObjects.Container {
  constructor (scene, text, style = {fontSize: 36}, origin = {x: 0.5, y: 0.5}, oneCharacterDuration = 100) {
    super(scene, 0, 0)
    this.textContent = text
    this.charDuration = oneCharacterDuration
    this.text = this.scene.add.text(0, 0, ' ', style)
    this.text.setOrigin(origin.x ? origin.x : origin, origin.y ? origin.y : origin.x ? origin.x : origin)
    this.add(this.text)
  }

  start () {
    this.charsCount = 0
    this.typingRunnable = delayRunnable(this.scene, this.charDuration, this.addCharacter, this)
  }

  stop () {
    removeRunnable(this.typingRunnable)
  }

  addCharacter () {
    const textCopy = Array.from(this.textContent)
    const textPart = textCopy.splice(0, this.charsCount)
    let resultText = ''
    for (const char of textPart) {
      resultText = resultText + char
    }
    this.text.setText(resultText)
    this.charsCount++
    if (this.charsCount < this.textContent.length) {
      this.typingRunnable = delayRunnable(this.scene, this.charDuration, this.addCharacter, this)
    }
  }
}
