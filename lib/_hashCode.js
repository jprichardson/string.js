function hashCode(self) {
  if (self === null || self === undefined)
    return 0

  var hashCode = 0

  for (var i = 0; i < self.length; i++) {
    // Discard anything higher than 32-bits
    hashCode = (31 * hashCode + self.charCodeAt(i)) & 0xFFFFFFFF
  }

  return hashCode
}

module.exports = hashCode
