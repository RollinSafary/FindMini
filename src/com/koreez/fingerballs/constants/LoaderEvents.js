export const onLoadStart = key => {
  if (!key) {
    key = ''
  }
  console.log(`${key} loading started...`)
}

export const onFileLoadComplete = (progress, key, bytesLoaded, type, src) => {
  console.log(
    ` PROGRESS - ${progress}% | KEY - ${key} | KB - ${Math.round(
      bytesLoaded / 1024,
    )} | TYPE - ${type}, | SRC - ${src}`,
  )
}

export const onLoadComplete = key => {
  if (!key) {
    key = ''
  }
  console.log(`${key} loading completed...`)
}
