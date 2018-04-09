import { SyncMacroCommand } from '@koreez/pure-mvc'
import GameScene from '../view/scenes/GameScene'
import onLevelCompleteCommand from './player/onLevelCompleteCommand'

export default class RegisterPlayerCommands extends SyncMacroCommand {
  execute (notification, args) {
    this.facade.registerCommand(
      GameScene.LEVEL_COMPLETE,
      onLevelCompleteCommand,
    )
    super.execute(notification, args)
  }
}
