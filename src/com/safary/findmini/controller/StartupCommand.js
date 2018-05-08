import { SyncMacroCommand } from '@koreez/pure-mvc'
import RegisterPlayerCommands from './RegisterPlayerCommands'
import InitializeFBInstantCommand from './fb/InitializeFBInstantCommand'

export default class StartupCommand extends SyncMacroCommand {
  initializeMacroCommand () {
    this.addSubCommand(InitializeFBInstantCommand)
    this.addSubCommand(RegisterPlayerCommands)
  }
}
