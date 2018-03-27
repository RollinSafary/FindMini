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
