export default class FBInstantWrapper {
  static _startGameAsyncHasResolved = false

  static async playerGetDataAsync (keys) {
    const data = await FBInstant.player.getDataAsync(keys)
    return data
  }

  static async initializeAsync () {
    await FBInstant.initializeAsync()
  }

  static setLoadingProgress (progress) {
    FBInstant.setLoadingProgress(progress)
  }

  static getSupportedAPIs () {
    return FBInstant.getSupportedAPIs()
  }

  static getSDKVersion () {
    return FBInstant.getSDKVersion()
  }

  static playerGetID () {
    return FBInstant.player.getID()
  }

  static async getSignedPlayerInfoAsync (requestPayload) {
    const result = await FBInstant.player.getSignedPlayerInfoAsync(
      requestPayload,
    )
    return result
  }

  static async startGameAsync () {
    await FBInstant.startGameAsync()
    this._startGameAsyncHasResolved = true
  }

  /* here goes methods to call after startGameAsync has resolved */
  static async playerSetDataAsync (data) {
    this.checkForStartGameAsyncHasResolved(`FBInstant.player.setDataAsync`)
    await FBInstant.player.setDataAsync(data)
  }

  static async shareAsync (shareData) {
    this.checkForStartGameAsyncHasResolved(`FBInstant.shareAsync`)
    await FBInstant.shareAsync(shareData)
  }

  static async updateAsync (payload) {
    this.checkForStartGameAsyncHasResolved(`FBInstant.updateAsync`)
    await FBInstant.updateAsync(payload)
  }

  static getLocale () {
    this.checkForStartGameAsyncHasResolved(`FBInstant.getLocale`)
    return FBInstant.getLocale()
  }

  static playerGetName () {
    this.checkForStartGameAsyncHasResolved(`FBInstant.player.getName`)
    return FBInstant.player.getName()
  }

  static playerGetPhoto () {
    this.checkForStartGameAsyncHasResolved(`FBInstant.player.getPhoto`)
    return FBInstant.player.getPhoto()
  }

  static async playerGetConnectedPlayersAsync () {
    this.checkForStartGameAsyncHasResolved(
      `FBInstant.player.getConnectedPlayersAsync`,
    )
    const players = await FBInstant.player.getConnectedPlayersAsync()
    return players
  }

  static contextGetID () {
    this.checkForStartGameAsyncHasResolved(`FBInstant.context.getID`)
    return FBInstant.context.getID()
  }

  static async contextChooseAsync (options) {
    this.checkForStartGameAsyncHasResolved(`FBInstant.context.chooseAsync`)
    await FBInstant.context.chooseAsync(options)
  }

  static async contextSwitchAsync (id) {
    this.checkForStartGameAsyncHasResolved(`FBInstant.context.switchAsync`)
    await FBInstant.context.switchAsync(id)
  }

  static async contextCreateAsync (playerID) {
    this.checkForStartGameAsyncHasResolved(`FBInstant.context.createAsync`)
    await FBInstant.context.createAsync(playerID)
  }

  static checkForStartGameAsyncHasResolved (methodName) {
    if (!this._startGameAsyncHasResolved) {
      throw new Error(
        `Call to ${methodName} forbidden before FBInstant.startGameAsync() has resolved`,
      )
    }
  }
}
