import { SimpleCommand } from '@koreez/pure-mvc'
import FBInstantWrapper from '../../utils/FBInstantWrapper'
import FindMiniFacade from '../../FindMiniFacade'

export default class CloseFBLoadingScreen extends SimpleCommand {
  async execute (notification) {
    await FBInstantWrapper.startGameAsync()
    this.sendNotification(FindMiniFacade.FB_START_GAME_SUCCESS)
  }
}
