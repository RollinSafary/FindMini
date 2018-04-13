import { SyncMacroCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import SavePlayerVOCommand from './SavePlayerVOCommand'

export default class onLevelCompleteCommand extends SyncMacroCommand {
  async execute (notification, ...args) {
    const proxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    proxy.levelComplete(...args)
    proxy.addScore(args[0], args[1])
    super.execute(notification)
  }

  initializeMacroCommand () {
    this.addSubCommand(SavePlayerVOCommand)
  }
}
