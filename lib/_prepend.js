function prepend(self, ss) {
  var s = ss + self.s;
  return new self.constructor(s);
};
module.exports = prepend;
