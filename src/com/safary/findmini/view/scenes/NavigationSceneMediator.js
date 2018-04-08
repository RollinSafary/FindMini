import { SCENE_GAME, SCENE_NAVIGATION } from '../../constants/Constants'
import BootScene from './BootScene'
import FindMiniSceneMediator from './FindMiniSceneMediator'
import NavigationScene from './NavigationScene'

export default class NavigationSceneMediator extends FindMiniSceneMediator {
  static NAME = 'NavigationSceneMediator'

  constructor (viewComponent) {
    super(NavigationSceneMediator.NAME, viewComponent)
  }

  onRegister () {
    super.onRegister()
    this.viewComponent.events.on(
      'onStartGameClick',
      this.onStartGameClick,
      this,
    )
  }

  listNotificationInterests () {
    return [BootScene.LOAD_COMPLETE]
  }

  handleNotification (notificationName) {
    switch (notificationName) {
      case BootScene.LOAD_COMPLETE:
        window.game.scene.start(SCENE_NAVIGATION)
        break
    }
  }

  onStartGameClick () {
    window.game.scene.start(SCENE_GAME)
    window.game.scene.stop(SCENE_NAVIGATION)
    this.sendNotification(NavigationScene.START_GAME)
  }

  // createButton(scene, x, y, text, hook, context, ...args) {
  //   const buttonContainer = scene.add.container(0, 0)
  //   const button = scene.add
  //     .sprite(x, y, 'button')
  //     .setInteractive()
  //   button.on('pointerdown', () => {
  //     button.setScale(-1)
  //   }, this)
  //   button.on('pointerup', () => {
  //     button.setScale(1)
  //     hook.apply(context, args)
  //   }, this)
  //   button.on('pointerout', () => {
  //     button.setScale(1)
  //   })
  //   const text = scene.add
  //     .text(x, y, text, {
  //       fontFamily: 'Arial',
  //       fontSize: 36,
  //       color: '#feffc5',
  //     })
  //     .setOrigin(0.5)
  //   buttonContainer.add(button)
  //   buttonContainer.add(text)
  //   return buttonContainer
  // }
}
