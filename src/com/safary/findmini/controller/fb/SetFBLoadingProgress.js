import { SimpleCommand } from '@koreez/pure-mvc'
import FBInstantWrapper from '../../utils/FBInstantWrapper'

export default class SetFBLoadingProgress extends SimpleCommand {
  execute (notification) {
    FBInstantWrapper.setLoadingProgress(100)
  }
}
