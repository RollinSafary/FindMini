import { AsyncMacroCommand } from '@koreez/pure-mvc'
import FindMiniFacade from '../../FindMiniFacade'
import FBInstantWrapper from '../../utils/FBInstantWrapper'
import CreatePlayerVOCommand from '../player/CreatePlayerVOCommand'

export default class InitializeFBInstantCommand extends AsyncMacroCommand {
  async execute (notification) {
    try {
      await FBInstantWrapper.initializeAsync()
      this.sendNotification(FindMiniFacade.FB_INITIALIZE_SUCCESS)
    } catch (error) {
      console.warn(error)
      this.sendNotification(FindMiniFacade.FB_INITIALIZE_FAIL, error)
    }
  }
}
