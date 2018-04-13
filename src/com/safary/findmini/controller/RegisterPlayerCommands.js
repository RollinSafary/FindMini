import { SyncMacroCommand } from '@koreez/pure-mvc'
import GameScene from '../view/scenes/GameScene'
import onLevelCompleteCommand from './player/onLevelCompleteCommand'
import BootScene from '../view/scenes/BootScene'
import onThemeChangeCommand from "./player/onThemeChangeCommand";

export default class RegisterPlayerCommands extends SyncMacroCommand {
  execute (notification, args) {
    this.facade.registerCommand(
      GameScene.LEVEL_COMPLETE,
      onLevelCompleteCommand,
    )
    this.facade.registerCommand(
      BootScene.THEME_CHOOSE,
      onThemeChangeCommand,
    )
    super.execute(notification, args)
  }
}
