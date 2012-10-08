
(function() {
  'use strict';

  var S = null;

  if (typeof module !== 'undefined'  && typeof module.exports !== 'undefined')
    S = require('../lib/string');
  else {
    S = window.S;
  }

  function T(v) { if (!v) { throw new Error('Should be true.'); } };
  function F(v) { if (v) { throw new Error('Should be false.'); } };

  function ARY_EQ(a1, a2) {
    T (a1.length === a2.length)
    for (var i = 0; i < a1.length; ++i)
      T (a1[i] === a2[i])
  }
    

  /*if (typeof window !== "undefined" && window !== null) {
    S = window.S;
  } else {
    S = require('../lib/string');
  }*/

  describe('string.js', function() {
    
    describe('- constructor', function() {
      it('should should set the internal "s" property', function() {
        T (S('helo').s === 'helo')
        T (S(5).s === '5')
        T (S(new Date(2012, 1, 1)).s.indexOf('2012') != -1)
        T (S(new RegExp()).s.substr(0,1) === '/') 
        T (S({}).s === '[object Object]')
        T (S(null).s === null)
        T (S(undefined).s === undefined)
      })
    })

    describe('- camelize()', function() {
      it('should remove any underscores or dashes and convert a string into camel casing', function() {
        T (S('data_rate').camelize().s === 'dataRate');
        T (S('background-color').camelize().s === 'backgroundColor');
        T (S('-moz-something').camelize().s === 'MozSomething');
        T (S('_car_speed_').camelize().s === 'CarSpeed');
        T (S('yes_we_can').camelize().s === 'yesWeCan');
      })
    })
    
    describe('- capitalize()', function() {
      it('should capitalize the string', function() {
        T (S('jon').capitalize().s === 'Jon');
        T (S('JP').capitalize().s === 'Jp');
      })
    })

    describe('- charAt(index)', function() {
      it('should return a native JavaScript string with the character at the specified position', function() {
        T (S('hi').charAt(1) === 'i')
      })
    })

    describe('- collapseWhitespace()', function() {
      it('should convert all adjacent whitespace characters to a single space and trim the ends', function() {
        T (S('  Strings   \t are   \n\n\t fun\n!  ').collapseWhitespace().s === 'Strings are fun !');
      })
    })

    describe('- contains(substring)', function() {
      it('should return true if the string contains the specified input string', function() {
        T (S('JavaScript is one of the best languages!').contains('one'));
        F (S('What do you think?').contains('YES!'));
      })
    })

    describe('- dasherize()', function() {
      it('should convert a camel cased string into a string delimited by dashes', function() {
        T (S('dataRate').dasherize().s === 'data-rate');
        T (S('CarSpeed').dasherize().s === '-car-speed');
        T (S('yesWeCan').dasherize().s === 'yes-we-can');
        T (S('backgroundColor').dasherize().s === 'background-color');
      })
    })

    describe('- decodeHtmlEntities()', function() {
      it('should decode HTML entities into their proper string representation', function() {
        T (S('Ken Thompson &amp; Dennis Ritchie').decodeHtmlEntities().s === 'Ken Thompson & Dennis Ritchie');
        T (S('3 &lt; 4').decodeHtmlEntities().s === '3 < 4');
      })
    })

    describe('- endsWith(suffix)', function() {
      it("should return true if the string ends with the input string", function() {
        T (S("hello jon").endsWith('jon'));
        F (S('ffffaaa').endsWith('jon'));
        T (S("").endsWith(''));
        T (S("hi").endsWith(''));
        T (S("hi").endsWith('hi'));
      })
    })

    describe('- escapeHTML()', function() {
      it('should escape the html', function() {
        T (S('<div>Blah & "blah" & \'blah\'</div>').escapeHTML().s ===
             '&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;');
        T (S('&lt;').escapeHTML().s === '&amp;lt;');
      })
    })

     describe('+ extendPrototype()', function() {
      it('should extend the String prototype with the extra methods', function() {
        S.extendPrototype();
        T (" hello!".endsWith('!'));
        S.restorePrototype();
      })
    })

    describe('- include(substring)', function() {
      it('should return true if the string contains the specified input string', function() {
        T (S('JavaScript is one of the best languages!').include('one'));
        F (S('What do you think?').include('YES!'));
      })
    })

    describe('- isAlpha()', function() {
      it("should return true if the string contains only letters", function() {
        T (S("afaf").isAlpha());
        T (S("FJslfjkasfs").isAlpha());
        F (S("adflj43faljsdf").isAlpha());
        F (S("33").isAlpha());
        F (S("TT....TTTafafetstYY").isAlpha());
      })
    })

    describe('- isAlphaNumeric()', function() {
      it("should return true if the string contains only letters and digits", function() {
        T (S("afaf35353afaf").isAlphaNumeric());
        T (S("FFFF99fff").isAlphaNumeric());
        T (S("99").isAlphaNumeric());
        T (S("afff").isAlphaNumeric());
        T (S("Infinity").isAlphaNumeric());
        F (S("-Infinity").isAlphaNumeric());
        F (S("-33").isAlphaNumeric());
        F (S("aaff..").isAlphaNumeric());
      })
    })

    describe('- isEmpty()', function() {
     it('should return true if the string is solely composed of whitespace or is null', function() {
        T (S(' ').isEmpty());
        T (S('\t\t\t    ').isEmpty());
        T (S('\n\n ').isEmpty());
        F (S('hey').isEmpty())
        T (S(null).isEmpty())
        T (S(null).isEmpty())
      })
    })

    describe('- isLower()', function() {
     it('should return true if the character or string is lowercase', function() {
        T (S('a').isLower());
        T (S('z').isLower());
        F (S('B').isLower());
        T (S('hijp').isLower());
        F (S('hi jp').isLower());
        F (S('HelLO').isLower());
      })
    })

    describe('- isNumeric()', function() {
      it("should return true if the string only contains digits, this would not include Infinity or -Infinity", function() {
        T (S("3").isNumeric());
        F (S("34.22").isNumeric());
        F (S("-22.33").isNumeric());
        F (S("NaN").isNumeric());
        F (S("Infinity").isNumeric());
        F (S("-Infinity").isNumeric());
        F (S("JP").isNumeric());
        F (S("-5").isNumeric());
        T (S("000992424242").isNumeric());
      })
    })

    describe('- isUpper()', function() {
      it('should return true if the character or string is uppercase', function() {
        F (S('a').isUpper());
        F (S('z').isUpper());
        T (S('B').isUpper());
        T (S('HIJP').isUpper());
        F (S('HI JP').isUpper());
        F (S('HelLO').isUpper());
      })
    })

    describe('- length', function() {
      it('should return the length of the string', function() {
        T (S('hello').length === 5);
        T (S('').length === 0);
        T (S(null).length === -1);
        T (S(undefined).length === -1);
      })
    })

    describe('- left(N)', function() {
      it('should return the substring denoted by N positive left-most characters', function() {
        T (S('My name is JP').left(2).s === 'My');
        T (S('Hi').left(0).s === '');
        T (S('Hello').left(1).s === 'H');
      })
      it('should return the substring denoted by N negative left-most characters, equivalent to calling right(-N)', function() {
        T (S('My name is JP').left(-2).s === 'JP');
      })
    })

    describe('- lines()', function() {
      it('should return an array of native strings representing lines with whitespace trimmed', function() {
        var lines = S('1 Infinite Loop\r\nCupertino, CA').lines();
        T (lines[0] === '1 Infinite Loop')
        T (lines[1] === 'Cupertino, CA')
      })
    })

    describe('- pad(len, [char])', function() {
      it('should pad the string in the center with specified character', function() {
        T (S('hello').pad(5).s === 'hello');
        T (S('hello').pad(10).s === '   hello  ');
        T (S('hey').pad(7).s === '  hey  ');
        T (S('hey').pad(5).s === ' hey ');
        T (S('hey').pad(4).s === ' hey');
        T (S('hey').pad(7, '-').s === '--hey--');
      })
    })

    describe('- padLeft(len, [char])', function() {
      it('should left pad the string', function() {
        T (S('hello').padLeft(5).s === 'hello');
        T (S('hello').padLeft(10).s === '     hello');
        T (S('hello').padLeft(7).s === '  hello');
        T (S('hello').padLeft(6).s === ' hello');
        T (S('hello').padLeft(10, '.').s === '.....hello');
      })
    })

    describe('- padRight(len, [char])', function() {
      it('should right pad the string', function() {
        T (S('hello').padRight(5).s === 'hello');
        T (S('hello').padRight(10).s === 'hello     ');
        T (S('hello').padRight(7).s === 'hello  ');
        T (S('hello').padRight(6).s === 'hello ');
        T (S('hello').padRight(10, '.').s === 'hello.....');
      })
    })

    describe('- parseCSV([delim],[qualifier])', function() {
      it('should parse a CSV line into an array', function() {
        ARY_EQ (S("'a','b','c'").parseCSV(',', "'"), ['a', 'b', 'c'])
        ARY_EQ (S('"a","b","c"').parseCSV(), ['a', 'b', 'c'])
        ARY_EQ (S('a,b,c').parseCSV(',', null), ['a', 'b', 'c']) 
        ARY_EQ (S("'a,','b','c'").parseCSV(',', "'"), ['a,', 'b', 'c'])
        ARY_EQ (S('"a","b",4,"c"').parseCSV(',', null), ['"a"', '"b"', '4', '"c"'])
        ARY_EQ (S('"a","b","4","c"').parseCSV(), ['a', 'b', '4', 'c'])
        ARY_EQ (S('"a","b",       "4","c"').parseCSV(), ['a', 'b', '4', 'c'])
        ARY_EQ (S('"a","b",       4,"c"').parseCSV(",", null), [ '"a"', '"b"', '       4', '"c"' ])
        ARY_EQ (S('"a","b\\"","d","c"').parseCSV(), ['a', 'b"', 'd', 'c'])
      })
    })

    describe('- repeat(n)', function() {
      it('should return the string concatenated with itself n times', function() {
        T (S(' ').repeat(5).s === '     ');
        T (S('*').repeat(3).s === '***');
      })
    })

    describe('- replaceAll(substring, replacement)', function() {
      it('should return the new string with all occurrences of substring replaced with the replacment string', function() {
        T (S(' does IT work? ').replaceAll(' ', '_').s === '_does_IT_work?_');
        T (S('Yes it does!').replaceAll(' ', '').s === 'Yesitdoes!');

        var e = '\\', q = '"';
        var r = e + q;
        T (S('a').replaceAll(q, r).s === 'a');
      })
    })

    describe('+ restorePrototype()', function() {
      it('should restore the original String prototype', function() {
        T (typeof ' hi'.endsWith === 'undefined');
        S.extendPrototype();
        T (' hi'.endsWith('hi'));
        S.restorePrototype();
        T (typeof ' hi'.endsWith === 'undefined');
      })
    })

    describe('- right(N)', function() {
      it('should return the substring denoted by N positive right-most characters', function() {
        T (S('I AM CRAZY').right(2).s === 'ZY');
        T (S('Does it work?  ').right(4).s === 'k?  ');
        T (S('Hi').right(0).s === '');
      })
      it('should return the substring denoted by N negative right-most characters, equivalent to calling left(-N)', function() {
        T (S('My name is JP').right(-2).s === 'My');
      })
    })
    
    describe('- s', function() {
      it('should return the native string', function() {
        T (S('hi').s === 'hi');
        T (S('hi').toString() === S('hi').s);
      })
    })

    describe('- slugify', function() {
      it('should convert the text to url slug', function() {
        T (S('Global Thermonuclear Warfare').slugify().s === 'global-thermonuclear-warfare')
      })
    })
    
    describe('- startsWith(prefix)', function() {
      it("should return true if the string starts with the input string", function() {
        T (S("JP is a software engineer").startsWith("JP"));
        F (S('wants to change the world').startsWith("politicians"));
        T (S("").startsWith(""));
        T (S("Hi").startsWith(""));
        T (S("JP").startsWith("JP"));
      })
    })

    describe('- stripPunctuation()', function() {
      it('should strip all of the punctuation', function() {
        T (S('My, st[ring] *full* of %punct)').stripPunctuation().s === 'My string full of punct')
      })
    })

    describe('- stripTags([tag1],[tag2],...)', function() {
      it('should strip all of the html tags or tags specified by the parameters', function() {
        T (S('<p>just <b>some</b> text</p>').stripTags().s === 'just some text')
        T (S('<p>just <b>some</b> text</p>').stripTags('p').s === 'just <b>some</b> text')
      })
    })

    describe('- times(n)', function() {
      it('should return the string concatenated with itself n times', function() {
        T (S(' ').times(5).s === '     ');
        T (S('*').times(3).s === '***');
      })
    })

    describe('- toFloat([precision])', function() {
      it('should return the float value, wraps parseFloat', function() {
        T (S('5').toFloat() === 5);
        T (S('5.3').toFloat() === 5.3);
        T (S(5.3).toFloat() === 5.3);
        T (S('-10').toFloat() === -10);
        T (S('55.3 adfafaf').toFloat() === 55.3)
        T (S('afff 44').toFloat().toString() === 'NaN')
        T (S(3.45522222333232).toFloat(2) === 3.46)
      })
    })

    describe('- toBoolean', function() {
      it('should convert a logical truth string to boolean', function() {
        T (S('true').toBoolean());
        F (S('false').toBoolean());
        F (S('hello').toBoolean());
        T (S(true).toBoolean());
        T (S('on').toBoolean());
        T (S('yes').toBoolean());
        T (S('TRUE').toBoolean());
        T (S('TrUe').toBoolean());
        T (S('YES').toBoolean());
        T (S('ON').toBoolean());
        F (S('').toBoolean());
        F (S(undefined).toBoolean())
        F (S('undefined').toBoolean())
        F (S(null).toBoolean())
        F (S(false).toBoolean())
        F (S({}).toBoolean())
        T (S(1).toBoolean())
        F (S(-1).toBoolean())
        F (S(0).toBoolean())
      })
    })

    describe('- toCSV(options)', function() {
      it('should convert the array to csv', function() {
        T (S(['a', 'b', 'c']).toCSV().s === '"a","b","c"');
        T (S(['a', 'b', 'c']).toCSV(':').s === '"a":"b":"c"');
        T (S(['a', 'b', 'c']).toCSV(':', null).s === 'a:b:c');
        T (S(['a', 'b', 'c']).toCSV('*', "'").s === "'a'*'b'*'c'");
        T (S(['a"', 'b', 4, 'c']).toCSV({delimiter: ',', qualifier: '"', escape: '\\',  encloseNumbers: false}).s === '"a\\"","b",4,"c"');
        T (S({firstName: 'JP', lastName: 'Richardson'}).toCSV({keys: true}).s === '"firstName","lastName"');
        T (S({firstName: 'JP', lastName: 'Richardson'}).toCSV().s === '"JP","Richardson"');
      })
    })

    describe('- toInt()', function() {
      it('should return the integer value, wraps parseInt', function() {
        T (S('5').toInt() === 5);
        T (S('5.3').toInt() === 5);
        T (S(5.3).toInt() === 5);
        T (S('-10').toInt() === -10);
        T (S('55 adfafaf').toInt() === 55)
        T (S('afff 44').toInt().toString() === 'NaN')
        T (S('0xff').toInt() == 255)
      })
    })

    describe('- toString()', function() {
      it('should return the native string', function() {
        T (S('hi').toString() === 'hi');
        T (S('hi').toString() === S('hi').s);
      })
    })

    describe('- trim()', function() {
      it('should return the string with leading and trailing whitespace removed', function() {
        T (S('hello ').trim().s === 'hello');
        T (S(' hello ').trim().s === 'hello');
        T (S('\nhello').trim().s === 'hello');
        T (S('\nhello\r\n').trim().s === 'hello');
        T (S('\thello\t').trim().s === 'hello');
      })
    })

    describe('- trimLeft()', function() {
      it('should return the string with leading whitespace removed', function() {
        T (S('  How are you?').trimLeft().s === 'How are you?');
        T (S(' JP ').trimLeft().s === 'JP ');
      })
    })

    describe('- trimRight()', function() {
      it('should return the string with trailing whitespace removed', function() {
        T (S('How are you?  ').trimRight().s === 'How are you?');
        T (S(' JP ').trimRight().s === ' JP');
      })
    })

    describe('- truncate(length, [chars])', function() {
      it('should truncate the string, accounting for word placement and chars count', function() {
        T (S('this is some long text').truncate(3).s === '...')
        T (S('this is some long text').truncate(7).s === 'this is...')
        T (S('this is some long text').truncate(11).s === 'this is...')
        T (S('this is some long text').truncate(12).s === 'this is some...')
        T (S('this is some long text').truncate(11).s === 'this is...')
        T (S('this is some long text').truncate(14, ' read more').s === 'this is some read more')
      })
    })

    describe('- underscore()', function() {
      it('should convert a camel cased string into a string separated by underscores', function() {
        T (S('dataRate').underscore().s === 'data_rate');
        T (S('CarSpeed').underscore().s === '_car_speed');
        T (S('yesWeCan').underscore().s === 'yes_we_can');
      })
    })

    describe('- unescapeHTML', function() {
      it('should unescape the HTML', function() {
        T (S('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;').unescapeHTML().s ===
             '<div>Blah & "blah" & \'blah\'</div>');
        T (S('&amp;lt;').unescapeHTML().s === '&lt;');
      })
    })

    describe('- valueOf()', function() {
      it('should return the primitive value of the string, wraps native valueOf()', function() {
        T (S('hi').valueOf() === 'hi')
      })
    })

    describe('+ VERSION', function() {
      it('should exist', function() {
        T (S.VERSION)
      })
    })

    it('should import native JavaScript string methods', function() {
      T (S('hi    ').substr(0,1).trimRight().startsWith('h'));
      T (S('hello ').concat('jp').indexOf('jp') === 6);
      T (S('this is so cool').substr(0, 4).s === 'this');
    })

  })
}).call(this);
