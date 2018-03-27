import { SyncMacroCommand } from '@koreez/pure-mvc'
import CreatePlayerVOCommand from './player/CreatePlayerVOCommand'

export default class StartupCommand extends SyncMacroCommand {
  initializeMacroCommand () {
    this.addSubCommand(CreatePlayerVOCommand)
  }
}
