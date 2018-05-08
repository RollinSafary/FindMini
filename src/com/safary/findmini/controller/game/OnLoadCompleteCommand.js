import { SimpleCommand } from '@koreez/pure-mvc'
import { SCENE_GAME, SCENE_HARDCORE, SCENE_LEVEL, SCENE_NAVIGATION, SCENE_SETTINGS } from '../../constants/Constants'
import NavigationSceneMediator from '../../view/scenes/NavigationSceneMediator'
import SettingsSceneMediator from '../../view/scenes/SettingsSceneMediator'
import LevelSceneMediator from "../../view/scenes/LevelSceneMediator";
import GameSceneMediator from "../../view/scenes/GameSceneMediator";
import HardcoreSceneMediator from "../../view/scenes/HardcoreSceneMediator";

export default class OnLoadCompleteCommand extends SimpleCommand {
  execute (notification) {
    this.facade.registerMediator(
      new NavigationSceneMediator(window.game.scene.getScene(SCENE_NAVIGATION)),
    )
    this.facade.registerMediator(
      new LevelSceneMediator(window.game.scene.getScene(SCENE_LEVEL)),
    )
    this.facade.registerMediator(
      new GameSceneMediator(window.game.scene.getScene(SCENE_GAME)),
    )
    this.facade.registerMediator(
      new HardcoreSceneMediator(window.game.scene.getScene(SCENE_HARDCORE)),
    )
    this.facade.registerMediator(
      new SettingsSceneMediator(window.game.scene.getScene(SCENE_SETTINGS)),
    )
  }
}
