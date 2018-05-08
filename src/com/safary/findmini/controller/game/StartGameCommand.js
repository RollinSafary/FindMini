import { SimpleCommand } from '@koreez/pure-mvc'
import { SCENE_BOOT, SCENE_LOADING } from '../../constants/Constants'
import BootSceneMediator from '../../view/scenes/BootSceneMediator'
import LoadingSceneMediator from '../../view/scenes/LoadingSceneMediator'

export default class StartGameCommand extends SimpleCommand {
  execute (notification) {
    this.facade.registerMediator(
      new LoadingSceneMediator(window.game.scene.getScene(SCENE_LOADING)),
    )
    this.facade.registerMediator(
      new BootSceneMediator(window.game.scene.getScene(SCENE_BOOT)),
    )
  }
}
