function delLeftMost(self, find) {
  var s = self.s;
  for (var i = 0; i < s.length; i = i + 1) {
    var f = s.indexOf(find, i);
    if (f != -1) {
       return new self.constructor(s.substr(f + find.length, s.length));
       break;
    }
  }
  return new self.constructor(s);
};

module.exports = delLeftMost;
