import Phaser from 'phaser'
import BootScene from '../view/scenes/BootScene'

export const gameConfig = {
  type: Phaser.AUTO,
  width: 540,
  height: 960,
  backgroundColor: '#626262',
  parent: 'gameContainer',
  scene: [BootScene],
  physics: {
    default: 'matter',
    matter: {
      setBounds: {
        x: 0,
        y: -200,
        width: 540,
        height: 960 + 200,
        thickness: 64,
      },
      debug: false,
      enableSleeping: true,
      debugBodyColor: 0x00ffff,
      gravity: {
        x: 0,
        y: 2.5,
      },
    },
  },
}
