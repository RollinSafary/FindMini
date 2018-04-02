import { SimpleCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'

export default class SavePlayerVOCommand extends SimpleCommand {
  async execute (notification) {
    const proxy = this.facade.retrieveProxy(PlayerVOProxy.NAME)
    await proxy.save()
  }
}
