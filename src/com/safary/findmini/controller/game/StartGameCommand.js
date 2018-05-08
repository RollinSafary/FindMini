import { SimpleCommand } from '@koreez/pure-mvc'
import { SCENE_NAVIGATION, SCENE_SETTINGS } from '../../constants/Constants'
import NavigationScene from '../../view/scenes/NavigationScene'
import SettingsScene from '../../view/scenes/SettingsScene'
import NavigationSceneMediator from '../../view/scenes/NavigationSceneMediator'
import SettingsSceneMediator from '../../view/scenes/SettingsSceneMediator'

export default class StartGameCommand extends SimpleCommand {
  execute (notification) {
    window.game.scene.add(SCENE_NAVIGATION, NavigationScene)
    window.game.scene.add(SCENE_SETTINGS, SettingsScene)
    this.facade.registerMediator(
      new NavigationSceneMediator(window.game.scene.getScene(SCENE_NAVIGATION)),
    )
    this.facade.registerMediator(
      new SettingsSceneMediator(window.game.scene.getScene(SCENE_SETTINGS)),
    )
  }
}
