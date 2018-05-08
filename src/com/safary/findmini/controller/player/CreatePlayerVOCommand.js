import { SimpleCommand } from '@koreez/pure-mvc'
import PlayerVOProxy from '../../model/PlayerVOProxy'
import PlayerVO from '../../model/vo/PlayerVO'
import FBInstantWrapper from '../../utils/FBInstantWrapper'

export default class CreatePlayerVOCommand extends SimpleCommand {
  async execute (notification) {
    const playerID = await FBInstantWrapper.playerGetID()
    const playerName = await FBInstantWrapper.playerGetName()
    const playerPhoto = await FBInstantWrapper.playerGetPhoto()
    const proxy = new PlayerVOProxy(
      new PlayerVO(playerID, playerName, playerPhoto),
    )
    this.facade.registerProxy(proxy)
    await proxy.initialize()
  }
}
