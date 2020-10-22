function getLeftMost(self, find) {
  var s = self.s;
  for (var i = 0; i < s.length; i = i + 1) {
    var f = s.indexOf(find, i);
    if (f != -1) {
       return new self.constructor(s.substr(0, f));
       break;
    }
  }
  return new self.constructor(s);
};

module.exports = getLeftMost;
