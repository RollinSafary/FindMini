import { SyncMacroCommand } from '@koreez/pure-mvc'
import CreatePlayerVOCommand from './player/CreatePlayerVOCommand'
import RegisterPlayerCommands from './RegisterPlayerCommands'

export default class StartupCommand extends SyncMacroCommand {
  initializeMacroCommand () {
    this.addSubCommand(CreatePlayerVOCommand)
    this.addSubCommand(RegisterPlayerCommands)
  }
}
