(function() {

  String.prototype.contains = function(needle) {
    return this.indexOf(needle) >= 0;
  };

  String.prototype.endsWith = function(suffix) {
    var l;
    l = this.length - suffix.length;
    return l >= 0 && this.indexOf(suffix, l) === l;
  };

  String.prototype.includes = function(needle) {
    return this.contains(needle);
  };

  String.prototype.isAlpha = function() {
    return !/[^a-zA-Z]/.test(this);
  };

  String.prototype.isAlphaDigit = function() {
    return !/[^a-zA-Z0-9]/.test(this);
  };

  String.prototype.isDigit = function() {
    return !/[^0-9]/.test(this);
  };

  String.prototype.isNum = function() {
    return Number(this).toString() !== 'NaN';
  };

  String.prototype.startsWith = function(prefix) {
    return this.lastIndexOf(prefix, 0) === 0;
  };

}).call(this);
