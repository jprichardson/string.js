(function() {
  var F, S, T, testutil;

  if (typeof window !== "undefined" && window !== null) {
    T = function(v) {
      if (!v) throw new Exception('False, should be true.');
    };
    F = function(v) {
      if (v) throw new Exception('True, should be false.');
    };
    S = window.S;
  } else {
    testutil = require('testutil');
    S = require('../lib/string');
  }

  describe('string.js', function() {
    describe('+ cloberPrototype()', function() {
      return it('should extend the String prototype with the extra methods', function() {
        S.cloberPrototype();
        T(" hello!".endsWith('!'));
        return S.restorePrototype();
      });
    });
    describe('- collapseWhitespace()', function() {
      return it('should convert all adjacent whitespace characters to a single space and trim the ends', function() {
        return console.log(S('  String   \t libraries are   \n\n\t fun\n!  ').collapseWhitespace().s === 'String libraries are fun !');
      });
    });
    describe('- contains(substring) ALIAS: include/includes', function() {
      return it('should return true if the string contains the specified input string', function() {
        T(S('JavaScript is one of the best languages!').contains('one'));
        return F(S('What do you think?').contains('YES!'));
      });
    });
    describe('- endsWith(suffix)', function() {
      return it("should return true if the string ends with the input string", function() {
        T(S("hello jon").endsWith('jon'));
        F(S('ffffaaa').endsWith('jon'));
        T(S("").endsWith(''));
        T(S("hi").endsWith(''));
        return T(S("hi").endsWith('hi'));
      });
    });
    describe('- isAlpha()', function() {
      return it("should return true if the string contains only letters", function() {
        T(S("afaf").isAlpha());
        T(S("FJslfjkasfs").isAlpha());
        F(S("adflj43faljsdf").isAlpha());
        F(S("33").isAlpha());
        return F(S("TT....TTTafafetstYY").isAlpha());
      });
    });
    describe('- isAlphaNumeric()', function() {
      return it("should return true if the string contains only letters and digits", function() {
        T(S("afaf35353afaf").isAlphaNumeric());
        T(S("FFFF99fff").isAlphaNumeric());
        T(S("99").isAlphaNumeric());
        T(S("afff").isAlphaNumeric());
        T(S("Infinity").isAlphaNumeric());
        F(S("-Infinity").isAlphaNumeric());
        F(S("-33").isAlphaNumeric());
        return F(S("aaff..").isAlphaNumeric());
      });
    });
    describe('- isEmpty()', function() {
      return it('should return true if the string is solely composed of whitespace', function() {
        T(S(' ').isEmpty());
        T(S('\t\t\t    ').isEmpty());
        return T(S('\n\n ').isEmpty());
      });
    });
    describe('- isNumeric()', function() {
      return it("should return true if the string only contains digits, this would not include Infinity or -Infinity", function() {
        T(S("3").isNumeric());
        F(S("34.22").isNumeric());
        F(S("-22.33").isNumeric());
        F(S("NaN").isNumeric());
        F(S("Infinity").isNumeric());
        F(S("-Infinity").isNumeric());
        F(S("JP").isNumeric());
        F(S("-5").isNumeric());
        return T(S("000992424242").isNumeric());
      });
    });
    describe('- ltrim()', function() {
      return it('should return the string with leading and trailing whitespace removed', function() {
        T(S('  How are you?').ltrim().s === 'How are you?');
        return T(S(' JP ').ltrim().s === 'JP ');
      });
    });
    describe('- left(N)', function() {
      it('should return the substring denoted by N positive left-most characters', function() {
        T(S('My name is JP').left(2).s === 'My');
        return T(S('Hi').left(0).s === '');
      });
      return it('should return the substring denoted by N negative left-most characters, equivalent to calling right(-N)', function() {
        return T(S('My name is JP').left(-2).s === 'JP');
      });
    });
    describe('- replaceAll(substring, replacement)', function() {
      return it('should return the new string with all occurrences of substring replaced with the replacment string', function() {
        T(S(' does IT work? ').replaceAll(' ', '_').s === '_does_IT_work?_');
        return T(S('Yes it does!').replaceAll(' ', '').s === 'Yesitdoes!');
      });
    });
    describe('+ restorePrototype()', function() {
      return it('should restore the original String prototype', function() {
        T(typeof ' hi'.endsWith === 'undefined');
        S.cloberPrototype();
        T(' hi'.endsWith('hi'));
        S.restorePrototype();
        return T(typeof ' hi'.endsWith === 'undefined');
      });
    });
    describe('- right(N)', function() {
      it('should return the substring denoted by N positive right-most characters', function() {
        T(S('I AM CRAZY').right(2).s === 'ZY');
        T(S('Does it work?  ').right(4).s === 'k?  ');
        return T(S('Hi').right(0).s === '');
      });
      return it('should return the substring denoted by N negative right-most characters, equivalent to calling left(-N)', function() {
        return T(S('My name is JP').right(-2).s === 'My');
      });
    });
    describe('- startsWith(prefix)', function() {
      return it("should return true if the string starts with the input string", function() {
        T(S("JP is a software engineer").startsWith("JP"));
        F(S('wants to change the world').startsWith("politicians"));
        T(S("").startsWith(""));
        T(S("Hi").startsWith(""));
        return T(S("JP").startsWith("JP"));
      });
    });
    return describe('- trim()', function() {
      return it('should return the string with leading and trailing whitespace removed', function() {
        T(S('hello ').trim().s === 'hello');
        T(S(' hello ').trim().s === 'hello');
        T(S('\nhello').trim().s === 'hello');
        T(S('\nhello\r\n').trim().s === 'hello');
        return T(S('\thello\t').trim().s === 'hello');
      });
    });
  });

}).call(this);
