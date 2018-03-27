import { SimpleCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import PlayerVO from '../../model/vo/PlayerVO'

export default class CreatePlayerVOCommand extends SimpleCommand {
  async execute (notification) {
    const proxy = new PlayerVOProxy(new PlayerVO(1, 'test'))
    this.facade.registerProxy(proxy)
    await proxy.initialize()
  }
}
