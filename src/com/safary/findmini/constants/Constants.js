import SimpleSphere from '../view/Components/SimpleSphere'
import DoubleTapSimpleSphere from '../view/Components/DoubleTapSimpleSphere'

export const SCENE_BOOT = 'boot'
export const SCENE_GAME = 'game'
export const SCENE_NAVIGATION = 'navigation'
export const GENERAL_ASSETS_KEY = 'general'
export const A_DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000
export const OBJECT_TYPES = {
  SimpleSphere: SimpleSphere,
  DoubleTapSimpleSphere: DoubleTapSimpleSphere,
}
export const BASE_URI = 'https://us-central1-find-mini.cloudfunctions.net'
// export const BASE_URI = 'http://localhost:5000/find-mini/us-central1' // Local
