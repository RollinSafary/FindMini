import { SyncMacroCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import SavePlayerVOCommand from './SavePlayerVOCommand'

export default class onLevelCompleteCommand extends SyncMacroCommand {
  async execute (notification, args) {
    const proxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    const level = args[0]
    const score = args[1]
    const starsCount = args[2]
    proxy.levelComplete(level, starsCount)
    proxy.addScore(level, score)
    super.execute(notification)
  }

  initializeMacroCommand () {
    this.addSubCommand(SavePlayerVOCommand)
  }
}
