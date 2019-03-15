/**
 * Extracts a string between start and stop strings.
 *
 * @param {String} string
 *   The string that should be used to extract content from.
 * @param {String} [left]
 *   The string value from where to start extraction. If not provided, the
 *   entire beginning of the contents will be returned until it has reached
 *   the following "right" string.
 * @param {String} [right]
 *   The string value from where to stop extraction. If not provided, the
 *   entire ending of the contents will be returned.
 *
 * @return {String}
 *   The extracted content.
 */
function between(string, left, right) {
  if (left === null || left === undefined) {
    left = '';
  }

  // Immediately return if neither start or stop were provided.
  if (!left && !right) {
    return string;
  }

  const startPos = string.indexOf(left);
  const endPos = string.indexOf(right, startPos + left.length);

  if (endPos === -1 && right) {
    return '';
  }

  if (endPos === -1 && !right) {
    return string.substring(startPos + left.length);
  }

  return string.slice(startPos + left.length, endPos);
}

module.exports = between;
module.exports.default = module.exports;
