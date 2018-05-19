import { SyncMacroCommand } from '@koreez/pure-mvc'
import GameScene from '../view/scenes/GameScene'
import onLevelCompleteCommand from './player/onLevelCompleteCommand'
import BootScene from '../view/scenes/BootScene'
import onThemeChangeCommand from './player/onThemeChangeCommand'
import FindMiniFacade from '../FindMiniFacade'
import ChangeSoundOptionsCommand from './player/ChangeSoundOptionsCommand'
import LevelCompletePopup from "../view/Components/Popups/LevelCompletePopup";

export default class RegisterPlayerCommands extends SyncMacroCommand {
  execute (notification, args) {
    this.facade.registerCommand(
      LevelCompletePopup.OKAY_CLICKED,
      onLevelCompleteCommand,
    )
    this.facade.registerCommand(
      BootScene.THEME_CHOOSE,
      onThemeChangeCommand,
    )
    this.facade.registerCommand(
      FindMiniFacade.GAME_SOUND,
      ChangeSoundOptionsCommand,
    )
    super.execute(notification, args)
  }
}
