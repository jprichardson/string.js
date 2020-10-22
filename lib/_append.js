function append(self, ss) {
  var s = self.s + ss;
  return new self.constructor(s);
};
module.exports = append;
