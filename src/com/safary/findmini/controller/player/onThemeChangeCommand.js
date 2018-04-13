import { SyncMacroCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import SavePlayerVOCommand from './SavePlayerVOCommand'

export default class onThemeChangeCommand extends SyncMacroCommand {
  async execute (notification, ...args) {
    this.proxy.setTheme(args[0])
  }

  get proxy () {
    return this.facade.retrieveProxy(PlayerVOProxy.NAME)
  }
}
