import { gameConfig } from '../../constants/GameConfig'
import { SCENE_GAME, GENERAL_ASSETS_KEY } from '../../constants/Constants'
import FindMiniScene from './FindMiniScene'

export default class GameScene extends FindMiniScene {
  static NAME = 'GameScene'
  static START = `${GameScene.NAME}Start`

  constructor () {
    super(SCENE_GAME)
  }

  create () {
    this.add
      .image(0, 0, GENERAL_ASSETS_KEY, 'back')
      .setOrigin(0)
      .setScale(2)
      .setDepth(-110)

    this.add
      .image(
        gameConfig.width / 2,
        gameConfig.height * 0.873,
        GENERAL_ASSETS_KEY,
        'ground',
      )
      .setScale(2)
      .setDepth(-109)
    this.add
      .image(
        gameConfig.width / 2,
        gameConfig.height * 0.45,
        GENERAL_ASSETS_KEY,
        'wall',
      )
      .setScale(2)
      .setDepth(-108)

    this.add
      .image(
        gameConfig.width / 2,
        gameConfig.height * 0.873,
        GENERAL_ASSETS_KEY,
        'blur',
      )
      .setAlpha(0.07)
      .setScale(4, 0.6)
      .setDepth(-107)

    this.add
      .image(
        gameConfig.width / 2,
        gameConfig.height * 0.5,
        GENERAL_ASSETS_KEY,
        'square',
      )
      .setAlpha(0.1)
      .setScale(150, 0.5)
      .setDepth(100)

    this.ball = new Ball(this)
    // this.matter.world.setBounds()
    const basketsOptions = [
      {
        y: gameConfig.height / 4,
        side: Basket.LEFT,
      },
      // {
      //   y: gameConfig.height / 6,
      //   side: Basket.RIGHT,
      // },
    ]
    this.baskets = []
    this.balls = []
    for (const option of basketsOptions) {
      this.createBasket(option)
    }

    const scoreZone = this.matter.add.rectangle(
      gameConfig.width / 2,
      gameConfig.height / 2 + gameConfig.height * 0.37 / 2,
      gameConfig.width * 0.98,
      gameConfig.height * 0.37,
      { label: 'ScoreZone', isStatic: true, isSensor: true },
    )

    const ground = this.matter.add.rectangle(
      gameConfig.width / 2,
      gameConfig.height * 0.925,
      gameConfig.width * 0.98,
      gameConfig.height * 0.1,
      { label: 'Ground', isStatic: true },
    )

    // blockB.setBounce(0)
    this.startGame()
  }

  createBasket (option) {
    this.baskets.push(new Basket(this, option))
  }

  startGame () {
    this.matter.world.on('collisionstart', this.onCollisionStart, this)
    this.matter.world.on('collisionend', this.onCollisionEnd, this)
    this.tapReady = true
    this.basketStartSign = 0
    this.basketEndSign = 0
    this.ball.startGame()
  }

  endGame () {
    this.matter.world.off('collisionstart', this.onCollisionStart, this)
    this.matter.world.off('collisionend', this.onCollisionEnd, this)
    this.matter.world.off('collisionactive', this.onCollisionActive, this)
    this.tapReady = false
    this.ball.endGame()
  }

  onCollisionStart (event, bodyA, bodyB) {
    if (bodyA.label === 'Ground' || bodyB.label === 'Ground') {
      this.endGame()
      setTimeout(() => {
        this.startGame()
      }, 2000)
      return
    }
    if (
      bodyA.label === 'collider_a' ||
      bodyB.label === 'collider_a' ||
      bodyA.label === 'collider_b' ||
      bodyB.label === 'collider_b'
    ) {
      this.swish = false
      return
    }
    if (bodyA.label === 'ScoreZone' || bodyB.label === 'ScoreZone') {
      this.matter.world.off('collisionactive', this.onCollisionActive, this)
      this.tapReady = true
      return
    }
    if (bodyA.label === 'Basket' || bodyB.label === 'Basket') {
      if (bodyA.label === 'Basket') {
        this.basketStartSign = Math.sign(this.ball.circ.y - bodyA.position.y)
      } else {
        this.basketStartSign = Math.sign(this.ball.circ.y - bodyB.position.y)
      }
      this.matter.world.on('collisionactive', this.onCollisionActive, this)
    }
  }

  onCollisionEnd (event, bodyA, bodyB) {
    if (bodyA.label === 'ScoreZone' || bodyB.label === 'ScoreZone') {
      this.tapReady = false
    }
  }

  onCollisionActive (event, bodyA, bodyB) {
    if (bodyA.label === 'Basket' || bodyB.label === 'Basket') {
      if (bodyA.label === 'Basket') {
        this.basketEndSign = Math.sign(this.ball.circ.y - bodyA.position.y)
      } else {
        this.basketEndSign = Math.sign(this.ball.circ.y - bodyB.position.y)
      }
      if (
        this.basketStartSign !== 0 &&
        this.basketEndSign !== 0 &&
        this.basketStartSign !== this.basketEndSign
      ) {
        console.log(`SHOT!!!!!!!!!!!!!!!!!!!!!`)
        const text = this.add
          .text(
            gameConfig.width / 2,
            gameConfig.height * 0.1,
            this.swish ? 'SWISH' : 'SHOT',
            {
              fontFamily: 'Arial',
              fontSize: 64,
              color: '#00ff00',
            },
          )
          .setOrigin(0.5)
        this.tweens.add({
          targets: text,
          scaleX: 5,
          scaleY: 5,
          alpha: 0,
          duration: 2000,
          delay: 1000,
        })
        this.matter.world.off('collisionactive', this.onCollisionActive, this)
        this.basketStartSign = 0
        this.basketEndSign = 0
      }
    }
  }

  update () {
    this.ball.updateShadow()
    this.ball.updateLights()
  }
}

class Basket extends Phaser.GameObjects.Group {
  static RIGHT = 1
  static LEFT = -1
  constructor (scene, options) {
    super(scene)
    const x = options.side === Basket.RIGHT ? gameConfig.width - 10 : 10
    this.createBody(x, options.y, options.side)
    this.setColliders(x, options.y, options.side)
  }

  createBody (x, y, side) {
    this.basketWall = this.scene.add
      .image(x + side * 10, y - 10, GENERAL_ASSETS_KEY, 'basket_wall')
      .setScale(side, 1)
    this.basketBack = this.scene.add.image(
      x - side * 75,
      y - 7,
      GENERAL_ASSETS_KEY,
      'basket_back',
    )
    this.basketBack.depth = -100
    this.basketFront = this.scene.add.image(
      x - side * 75,
      y + 10,
      GENERAL_ASSETS_KEY,
      'basket_front',
    )
    this.basketFront.depth = 100
  }

  setColliders (x, y, side) {
    // collider a
    this.scene.matter.add.circle(x - side * 150, y, 7, {
      label: 'collider_a',
      isStatic: true,
    })
    // collider b
    this.scene.matter.add.circle(x, y, 7, {
      label: 'collider_b',
      isStatic: true,
    })
    // collider basket
    this.scene.matter.add.rectangle(x - side * 73, y, 120, 30, {
      label: 'Basket',
      isStatic: true,
      isSensor: true,
    })
  }
}

class Ball extends Phaser.GameObjects.Group {
  constructor (scene, x, y, key) {
    super(scene)
    this.createShadow()
    this.createBody(key)
    this.createLights()
  }

  createBody (x, y, key) {
    this.circ = this.scene.matter.add
      .image(0, 0, GENERAL_ASSETS_KEY, key || 'ball')
      .setInteractive()

    //  Change the body to a Circle with a radius of 48px
    this.circ.setBody(
      {
        type: 'circle',
        radius: 60 * 0.8,
      },
      {
        label: 'Ball',
        mass: 11,
      },
    )
    this.circ.depth = 0
  }

  startGame () {
    this.circ.once('pointerdown', this.onFirstPointerDown, this)
    this.circ.x = gameConfig.width / 2
    this.circ.y = gameConfig.height * 0.606
    this.circ.setStatic(true)
  }

  endGame () {
    this.circ.off('pointerdown', this.onBallPointerDown, this)
    this.circ.off('pointerdown', this.onFirstPointerDown, this)
  }

  onFirstPointerDown (pointer) {
    console.log('once')
    this.circ.setStatic(false)
    this.circ.setBounce(0.55)
    this.circ.applyForce({ x: Phaser.Math.Between(-0.7, 0.7), y: -1 })
    this.circ.on('pointerdown', this.onBallPointerDown, this)
  }

  onBallPointerDown (pointer) {
    if (!this.scene.tapReady) {
      return
    }
    this.scene.swish = true
    const ballPosition = new Phaser.Math.Vector2(this.circ.x, this.circ.y)
    const downPosition = new Phaser.Math.Vector2(pointer.downX, pointer.downY)
    const direction = ballPosition.subtract(downPosition).normalize()
    this.circ.applyForce({
      x: direction.x * 1.1,
      y: -Phaser.Math.Clamp(Math.abs(direction.y) * 2.5, 1.8, 2),
    })
  }

  createLights () {
    this.light1 = this.scene.add.image(
      this.circ.x,
      this.circ.x,
      GENERAL_ASSETS_KEY,
      1,
    )
    this.light9 = this.scene.add.image(
      this.circ.x,
      this.circ.y,
      GENERAL_ASSETS_KEY,
      9,
    )
  }

  updateLights () {
    this.light1.x = this.circ.x
    this.light1.y = this.circ.y
    this.light9.x = this.circ.x
    this.light9.y = this.circ.y
  }

  createShadow () {
    this.shadow = this.scene.add.image(
      0,
      gameConfig.height * 0.875,
      GENERAL_ASSETS_KEY,
      'ballShadow',
    )
  }

  updateShadow () {
    this.shadow.x = this.circ.x
    const distanceRate = this.circ.y / this.shadow.y
    this.shadow.setScale(Math.min(1 / distanceRate, 1.3))
    this.shadow.setAlpha(distanceRate)
  }
}
