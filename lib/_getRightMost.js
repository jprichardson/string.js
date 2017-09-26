function getRightMost(self, find) {
  var s = self.s;
  for (var i = s.length; i >= 0; i = i - 1) {
    var f = s.indexOf(find, i);
    if (f != -1) {
       return new self.constructor(s.substr(f + find.length, s.length));
    }
  }
  return new self.constructor(s);
};

module.exports = getRightMost;
