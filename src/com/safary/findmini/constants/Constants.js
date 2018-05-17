import SimpleSphere from '../view/Components/Spheres/SimpleSphere'
import DoubleTapSimpleSphere from '../view/Components/Spheres/DoubleTapSimpleSphere'
import DoubleTapDangerButton from '../view/Components/Spheres/DoubleTapDangerButton'
import GiftSphere from '../view/Components/Spheres/GiftSphere'
import BubbleSphere from "../view/Components/Spheres/BubbleSphere";

export const SCENE_BOOT = 'boot'
export const SCENE_LOADING = 'loading'
export const SCENE_GAME = 'game'
export const SCENE_HARDCORE = 'hardcore'
export const SCENE_LEVEL = 'level'
export const SCENE_NAVIGATION = 'navigation'
export const SCENE_SETTINGS = 'settings'
export const SCENE_POPUP = 'popup'
export const GENERAL_ASSETS_KEY = 'general'
export const A_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000
export const OBJECT_TYPES = {
  SimpleSphere: SimpleSphere,
  DoubleTapSimpleSphere: DoubleTapSimpleSphere,
  DoubleTapDangerButton: DoubleTapDangerButton,
  BubbleSphere: BubbleSphere,
}
export const BOMB_NAME = 'bomb'
export const BUBBLE_NAME = 'bubble'
export const BASE_URI = 'https://us-central1-find-mini.cloudfunctions.net'
// export const BASE_URI = 'http://localhost:5000/find-mini/us-central1' // Local
