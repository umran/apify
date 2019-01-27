const exists = (arr, lambda) => {
  for (var i = 0; i < arr.length; i++) {
    if (lambda(arr[i]) === true) {
      return true
    }
  }

  return false
}

module.exports = {
  exists
}
