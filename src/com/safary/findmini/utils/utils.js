import firebase from 'firebase'
import 'firebase/firestore'
export const serialise = object => {
  return JSON.parse(JSON.stringify(object))
}
export const getFirebaseDataAsync = async docId => {
  try {
    const dataObj = await firebase
      .firestore()
      .doc(docId)
      .get()
    return dataObj
  } catch (err) {
    console.error(err)
  }
}

export const setFirebaseDataAsync = async (docId, data) => {
  try {
    await firebase
      .firestore()
      .doc(docId)
      .set(serialise(data))
  } catch (err) {
    console.error(err)
  }
}
export const deleteFirebaseDataAsync = async docId => {
  try {
    await firebase
      .firestore()
      .doc(docId)
      .delete()
  } catch (err) {
    console.error(err)
  }
}
export const urlWithParams = (url, params) => {
  const urlObject = new URL(url)
  Object.keys(params).forEach(key =>
    urlObject.searchParams.append(key, params[key]),
  )
  return urlObject
}

export const createButton = (scene, x, y, text, hook, context, ...args) => {
  const buttonContainer = scene.add.container(0, 0)
  const button = scene.add
    .sprite(x, y, 'button')
    .setInteractive()
  button.on('pointerdown', () => {
    button.setScale(-1)
  }, this)
  button.on('pointerup', () => {
    button.setScale(1)
    hook.apply(context, args)
  }, this)
  button.on('pointerout', () => {
    button.setScale(1)
  })
  const buttonText = scene.add
    .text(x, y, text, {
      fontFamily: 'Arial',
      fontSize: 36,
      color: '#feffc5',
    })
    .setOrigin(0.5)
  buttonContainer.add(button)
  buttonContainer.add(buttonText)
  return buttonContainer
}
