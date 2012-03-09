(function() {
  var F, S, T;

  T = function(v) {
    if (!v) throw new Error('Should be true.');
  };

  F = function(v) {
    if (v) throw new Error('Should be false.');
  };

  if (typeof window !== "undefined" && window !== null) {
    S = window.S;
  } else {
    S = require('../lib/string');
  }

  describe('string.js', function() {
    describe('- camelize()', function() {
      return it('should remove any underscores or dashes and convert a string into camel casing', function() {
        T(S('data_rate').camelize().s === 'dataRate');
        T(S('background-color').camelize().s === 'backgroundColor');
        T(S('-moz-something').camelize().s === 'MozSomething');
        T(S('_car_speed_').camelize().s === 'CarSpeed');
        return T(S('yes_we_can').camelize().s === 'yesWeCan');
      });
    });
    describe('- capitalize()', function() {
      return it('should capitalize the string', function() {
        T(S('jon').capitalize().s === 'Jon');
        return T(S('JP').capitalize().s === 'Jp');
      });
    });
    describe('+ clobberPrototype()', function() {
      return it('should extend the String prototype with the extra methods', function() {
        S.clobberPrototype();
        T(" hello!".endsWith('!'));
        return S.restorePrototype();
      });
    });
    describe('- collapseWhitespace()', function() {
      return it('should convert all adjacent whitespace characters to a single space and trim the ends', function() {
        return T(S('  String   \t libraries are   \n\n\t fun\n!  ').collapseWhitespace().s === 'String libraries are fun !');
      });
    });
    describe('- contains(substring)', function() {
      return it('should return true if the string contains the specified input string', function() {
        T(S('JavaScript is one of the best languages!').contains('one'));
        return F(S('What do you think?').contains('YES!'));
      });
    });
    describe('- dasherize()', function() {
      return it('should convert a camel cased string into a string delimited by dashes', function() {
        T(S('dataRate').dasherize().s === 'data-rate');
        T(S('CarSpeed').dasherize().s === '-car-speed');
        T(S('yesWeCan').dasherize().s === 'yes-we-can');
        return T(S('backgroundColor').dasherize().s === 'background-color');
      });
    });
    describe('- decodeHtmlEntities', function() {
      return it('should decode HTML entities into their proper string representation', function() {
        return console.log(S('Ken Thompson &amp; Dennis Ritchie').decodeHtmlEntities().s);
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
    describe('- include(substring)', function() {
      return it('should return true if the string contains the specified input string', function() {
        T(S('JavaScript is one of the best languages!').include('one'));
        return F(S('What do you think?').include('YES!'));
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
    describe('- isLower()', function() {
      return it('should return true if the character or string is lowercase', function() {
        T(S('a').isLower());
        T(S('z').isLower());
        F(S('B').isLower());
        T(S('hijp').isLower());
        F(S('hi jp').isLower());
        return F(S('HelLO').isLower());
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
    describe('- isUpper()', function() {
      return it('should return true if the character or string is uppercase', function() {
        F(S('a').isUpper());
        F(S('z').isUpper());
        T(S('B').isUpper());
        T(S('HIJP').isUpper());
        F(S('HI JP').isUpper());
        return F(S('HelLO').isUpper());
      });
    });
    describe('- ltrim()', function() {
      return it('should return the string with leading whitespace removed', function() {
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
    describe('- repeat(n)', function() {
      return it('should return a string with that is concatenated n times', function() {
        T(S(' ').repeat(5).s === '     ');
        return T(S('*').repeat(3).s === '***');
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
        S.clobberPrototype();
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
    describe('- rtrim()', function() {
      return it('should return the string with trailing whitespace removed', function() {
        T(S('How are you?  ').rtrim().s === 'How are you?');
        return T(S(' JP ').rtrim().s === ' JP');
      });
    });
    describe('- s', function() {
      return it('should return the native string', function() {
        T(S('hi').s === 'hi');
        return T(S('hi').toString() === S('hi').s);
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
    describe('- times(n)', function() {
      return it('should return a string with that is concatenated n times', function() {
        T(S(' ').times(5).s === '     ');
        return T(S('*').times(3).s === '***');
      });
    });
    describe('- toString()', function() {
      return it('should return the native string', function() {
        T(S('hi').toString() === 'hi');
        return T(S('hi').toString() === S('hi').s);
      });
    });
    describe('- trim()', function() {
      return it('should return the string with leading and trailing whitespace removed', function() {
        T(S('hello ').trim().s === 'hello');
        T(S(' hello ').trim().s === 'hello');
        T(S('\nhello').trim().s === 'hello');
        T(S('\nhello\r\n').trim().s === 'hello');
        return T(S('\thello\t').trim().s === 'hello');
      });
    });
    return describe('- underscore()', function() {
      return it('should convert a camel cased string into a string separated by underscores', function() {
        T(S('dataRate').underscore().s === 'data_rate');
        T(S('CarSpeed').underscore().s === '_car_speed');
        return T(S('yesWeCan').underscore().s === 'yes_we_can');
      });
    });
  });

}).call(this);
