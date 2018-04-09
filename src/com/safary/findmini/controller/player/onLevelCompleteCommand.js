import { SimpleCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'

export default class onLevelCompleteCommand extends SimpleCommand {
  async execute (notification, args) {
    const proxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    proxy.levelComplete(args)
  }
}
