import { SyncMacroCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import SavePlayerVOCommand from './SavePlayerVOCommand'

export default class ChangeSoundOptionsCommand extends SyncMacroCommand {
  async execute (notification, ...args) {
    this.proxy.setSoundOption(args[0])
    super.execute(notification, ...args)
  }

  get proxy () {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME)
  }

  initializeMacroCommand () {
    this.addSubCommand(SavePlayerVOCommand)
  }
}
