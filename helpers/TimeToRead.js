export default text => {
  if (!text) {
    return 0
  }
  const wordsPerMinute = 200
  const textLength = text.split(' ').length
  return Math.ceil(textLength / wordsPerMinute)
}
