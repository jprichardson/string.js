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
  function EQ(v1, v2) {
    if (typeof require != 'undefined' && typeof process != 'undefined') //node
      require('assert').equal(v1, v2)
    else
      T (v1 === v2)
  }

  function ARY_EQ(a1, a2) {
    EQ (a1.length, a2.length)
    for (var i = 0; i < a1.length; ++i)
      EQ (a1[i], a2[i])
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

    describe('- between(left, right)', function() {
      it('should extract string between `left` and `right`', function() {
        T (S('<a>foo</a>').between('<a>', '</a>').s === 'foo')
        T (S('<a>foo</a></a>').between('<a>', '</a>').s === 'foo')
        T (S('<a><a>foo</a></a>').between('<a>', '</a>').s === '<a>foo')
        T (S('<a>foo').between('<a>', '</a>').s === '')
      })
      it("should support cyrillic letters", function() {
        T (S('<a>привет</a>').between('<a>', '</a>').s === 'привет')
        T (S('<a>как дела</a>').between('<a>', '</a>').s === 'как дела')
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

      it("should support cyrillic letters", function() {
        T (S('день_рождения').camelize().s === 'деньРождения');
        T (S('день-рождения').camelize().s === 'деньРождения');
        T (S('-день-рождения').camelize().s === 'ДеньРождения');
      })
    })

    describe('- capitalize()', function() {
      it('should capitalize the string', function() {
        T (S('jon').capitalize().s === 'Jon');
        T (S('JP').capitalize().s === 'Jp');
      })

      it("should support cyrillic letters", function() {
        T (S('день рождения').capitalize().s === 'День рождения');
        T (S('ДЕНЬ').capitalize().s === 'День');
      })
    })

    describe('- charAt(index)', function() {
      it('should return a native JavaScript string with the character at the specified position', function() {
        T (S('hi').charAt(1) === 'i')
        T (S('хай').charAt(2) === 'й')
      })
    })

    describe('- chompLeft(prefix)', function() {
      it('should remove `prefix` from start of string', function() {
        T (S('foobar').chompLeft('foo').s === 'bar')
        T (S('foobar').chompLeft('bar').s === 'foobar')
        T (S('').chompLeft('foo').s === '')
        T (S('').chompLeft('').s === '')
      })

      it("should support cyrillic letters", function() {
        T (S('крестчерепгроб').chompLeft('крест').s === 'черепгроб')
        T (S('крестчерепгроб').chompLeft('гроб').s === 'крестчерепгроб')
      })
    })

    describe('- chompRight(suffix)', function() {
      it('should remove `suffix` from end of string', function() {
        T (S('foobar').chompRight('foo').s === 'foobar')
        T (S('foobar').chompRight('bar').s === 'foo')
        T (S('').chompRight('foo').s === '')
        T (S('').chompRight('').s === '')
      })

      it("should support cyrillic letters", function() {
        T (S('крестчерепгроб').chompRight('крест').s === 'крестчерепгроб')
        T (S('крестчерепгроб').chompRight('гроб').s === 'крестчереп')
      })
    })

    describe('- collapseWhitespace()', function() {
      it('should convert all adjacent whitespace characters to a single space and trim the ends', function() {
        T (S('  Strings   \t are   \n\n\t fun\n!  ').collapseWhitespace().s === 'Strings are fun !');
      })

      it("should support cyrillic words", function() {
        T (S('  Прошло \t только \n\n\t 5 месяцев с \r\n начала года   ').collapseWhitespace().s === 'Прошло только 5 месяцев с начала года');
      })
    })

    describe('- contains(substring)', function() {
      it('should return true if the string contains the specified input string', function() {
        T (S('JavaScript is one of the best languages!').contains('one'));
        F (S('What do you think?').contains('YES!'));
      })

      it("should support cyrillic words", function() {
        T (S('Прошло только 5 месяцев с начала года').contains('только'));
        T (S('Прошло только 5 месяцев с начала года').contains('год'));
        F (S('Прошло только 5 месяцев с начала года').contains('месяца'));
      })
    })

    describe('- count(substring)', function() {
      it('should return the count of all substrings', function() {
        EQ (S('JP likes to program. JP does not play in the NBA.').count("JP"), 2)
        EQ (S('Does not exist.').count("Flying Spaghetti Monster"), 0)
        EQ (S('Does not exist.').count("Bigfoot"), 0)
        EQ (S('JavaScript is fun, therefore Node.js is fun').count("fun"), 2)
        EQ (S('funfunfun').count("fun"), 3)
      })

      it("should support cyrillic words", function() {
        EQ (S('Прошло только 5 месяцев с начала года').count("JP"), 0)
        EQ (S('Прошло только-только 5 месяцев с начала года').count("только"), 2)
      })
    })

    describe('- dasherize()', function() {
      it('should convert a camel cased string into a string delimited by dashes', function() {
        T (S('dataRate').dasherize().s === 'data-rate');
        T (S('CarSpeed').dasherize().s === '-car-speed');
        T (S('yesWeCan').dasherize().s === 'yes-we-can');
        T (S('backgroundColor').dasherize().s === 'background-color');
      });

      it('should support cyrillic words', function() {
        T (S('потестируем с русским').dasherize().s === 'потестируем-с-русским');
        T (S('ПотестируемСРусским').dasherize().s === '-потестируем-с-русским');
      })
    })

    describe('- decodeHTMLEntities()', function() {
      it('should decode HTML entities into their proper string representation', function() {
        EQ (S('Ken Thompson &amp; Dennis Ritchie').decodeHTMLEntities().s, 'Ken Thompson & Dennis Ritchie');
        EQ (S('3 &lt; 4').decodeHTMLEntities().s, '3 < 4');
        EQ (S('http:&#47;&#47;').decodeHTMLEntities().s, 'http://')
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

      it('should support cyrillic words', function() {
        T (S('потестируем с русским').endsWith('русским'));
        F (S('потестируем с русским').endsWith('jon'));
      })
    })

    describe('- ensureLeft(prefix)', function() {
      it('should prepend `prefix` if string does not start with prefix', function() {
        T (S('foobar').ensureLeft('foo').s === 'foobar')
        T (S('bar').ensureLeft('foo').s === 'foobar')
        T (S('').ensureLeft('foo').s === 'foo')
        T (S('').ensureLeft('').s === '')
      })

      it('should support cyrillic words', function() {
        T (S('как дела').ensureLeft('как').s === 'как дела')
        T (S('дела').ensureLeft('как ').s === 'как дела')
        T (S('').ensureLeft('как ').s === 'как ')
      })
    })

    describe('- ensureRight(suffix)', function() {
      it('should append `suffix` if string does not end with suffix', function() {
        T (S('foobar').ensureRight('bar').s === 'foobar')
        T (S('foo').ensureRight('bar').s === 'foobar')
        T (S('').ensureRight('foo').s === 'foo')
        T (S('').ensureRight('').s === '')
      })

      it('should support cyrillic words', function() {
        T (S('дела').ensureRight(' как').s === 'дела как')
        T (S('дела как').ensureRight('как').s === 'дела как')
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

    describe('- humanize()', function() {
      it('should humanize the string', function() {
        EQ (S('the_humanize_string_method').humanize().s, 'The humanize string method')
        EQ (S('ThehumanizeStringMethod').humanize().s, 'Thehumanize string method')
        EQ (S('the humanize string method').humanize().s, 'The humanize string method')
        EQ (S('the humanize_id string method_id').humanize().s, 'The humanize id string method')
        EQ (S('the  humanize string method  ').humanize().s, 'The humanize string method')
        EQ (S('   capitalize dash-CamelCase_underscore trim  ').humanize().s, 'Capitalize dash camel case underscore trim')
        EQ (S(123).humanize().s, '123')
        EQ (S('').humanize().s, '')
        EQ (S(null).humanize().s, '')
        EQ (S(undefined).humanize().s, '')
      })

      it('should support cyrillic words', function() {
        EQ (S('как_твои_дела').humanize().s, 'Как твои дела')
        EQ (S('какТвоиДела').humanize().s, 'Как твои дела')
        EQ (S('Как твои дела').humanize().s, 'Как твои дела')
      })
    })

    describe('- include(substring)', function() {
      it('should return true if the string contains the specified input string', function() {
        T (S('JavaScript is one of the best languages!').include('one'));
        F (S('What do you think?').include('YES!'));
      })

      it('should support cyrillic words', function() {
        T (S('Как твои дела').include('твои'));
        F (S('Как твои дела').include('как'));
        T (S('Как твои дела').include('Как'));
      })
    })

    describe('- isAlpha()', function() {
      it("should return true if the string contains only letters", function() {
        T (S("afaf").isAlpha());
        T (S("FJslfjkasfs").isAlpha());
        T (S("áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ").isAlpha());
        F (S("adflj43faljsdf").isAlpha());
        F (S("33").isAlpha());
        F (S("TT....TTTafafetstYY").isAlpha());
        F (S("-áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ").isAlpha());
      });

      it("should support cyrillic letters", function() {
        T (S("ябыдабы").isAlpha());
        T (S("Сбольшойбуквы").isAlpha());
        T (S("аё").isAlpha());
        T (S("Ёёёёё").isAlpha());
        F (S("бкбк43").isAlpha());
        F (S("33").isAlpha());
        F (S("TT....TTTafafetstYY").isAlpha());
        F (S("-áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ").isAlpha());
      });
    })

    describe('- isAlphaNumeric()', function() {
      it("should return true if the string contains only letters and digits", function() {
        T (S("afaf35353afaf").isAlphaNumeric());
        T (S("FFFF99fff").isAlphaNumeric());
        T (S("99").isAlphaNumeric());
        T (S("afff").isAlphaNumeric());
        T (S("Infinity").isAlphaNumeric());
        T (S("áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ1234567890").isAlphaNumeric());
        F (S("-Infinity").isAlphaNumeric());
        F (S("-33").isAlphaNumeric());
        F (S("aaff..").isAlphaNumeric());
        F (S(".áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ1234567890").isAlphaNumeric());
      });

      it("should support cyrillic letters", function() {
        T (S("ябыдабы3242").isAlphaNumeric());
        T (S("С777большойбуквы").isAlphaNumeric());
        T (S("аё").isAlphaNumeric());
        T (S("Ёёёёё555").isAlphaNumeric());
        F (S("бкбк 43").isAlphaNumeric());
        F (S("-33").isAlphaNumeric());
        F (S("TT....TTTafafetstYY").isAlphaNumeric());
        F (S("-áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ").isAlphaNumeric());
      });
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
        T (S('áéúóúãõàèìòùâêîôûäëïöüç').isLower());
        T (S('áéúóúãõàèìòùâêîôûäëïöüça').isLower());
        F (S('hi jp').isLower());
        F (S('HelLO').isLower());
        F (S('ÁÉÍÓÚÃÕÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÇ').isLower());
        F (S('áéúóúãõàèìòùâêîôûäëïöüçÁ').isLower());
        F (S('áéúóúãõàèìòùâêîôû äëïöüç').isLower());
      });

     it("should support cyrillic letters", function() {
        T (S("ябыдабы").isLower());
        T (S("эгегей").isLower());
        F (S("БкБк").isLower());
        F (S("эюЯ").isLower());
      });
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
        T (S('ÁÉÍÓÚÃÕÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÇ').isUpper());
        F (S('HI JP').isUpper());
        F (S('HelLO').isUpper());
        F (S('áéúóúãõàèìòùâêîôûäëïöüç').isUpper());
        F (S('áéúóúãõàèìòùâêîôûäëïöüçÁ').isUpper());
        F (S('ÁÉÍÓÚÃÕÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÇá').isUpper());
      });

      it("should support cyrillic letters", function() {
        T (S("ЯБЫДАБЫ").isUpper());
        F (S("эгегей").isUpper());
        F (S("БкБк").isUpper());
        T (S("ЭЮЯ").isUpper());
      });
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
      it("should support cyrillic letters", function() {
        T (S('привет').left(2).s === 'пр');
        T (S('как дела').left(-4).s === 'дела');
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
      it("should support cyrillic letters", function() {
        T (S('привет').pad(6).s === 'привет');
        T (S('привет').pad(8).s === ' привет ');
        T (S('привет').pad(10).s === '  привет  ');
        T (S('привет').pad(10, '*').s === '**привет**');
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
      it("should support cyrillic letters", function() {
        T (S('привет').padLeft(6).s === 'привет');
        T (S('привет').padLeft(8).s === '  привет');
        T (S('привет').padLeft(10, '@').s === '@@@@привет');
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
      it("should support cyrillic letters", function() {
        T (S('привет').padRight(6).s === 'привет');
        T (S('привет').padRight(8).s === 'привет  ');
        T (S('привет').padRight(10, '@').s === 'привет@@@@');
      })
    })

    describe('- parseCSV([delim],[qualifier],[escape],[lineDelimiter])', function() {
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
        ARY_EQ (S('"jp","really\tlikes to code"').parseCSV(), ['jp', 'really\tlikes to code'])
        ARY_EQ (S('"a","b+"","d","c"').parseCSV(",", "\"", "+"), ['a', 'b"', 'd', 'c'])
        ARY_EQ (S('"a","b""","d","c"').parseCSV(",", "\"", "\""), ['a', 'b"', 'd', 'c'])
        ARY_EQ (S('"a","","c"').parseCSV(), ['a', '', 'c'])
        ARY_EQ (S('"","b","c"').parseCSV(), ['', 'b', 'c'])

        var lines = (S('"a\na","b","c"\n"a", """b\nb", "a"').parseCSV(',', '"', '"', '\n'));
        ARY_EQ(lines[0], [ 'a\na', 'b', 'c' ]);
        ARY_EQ(lines[1], [ 'a', '"b\nb', 'a' ]);
      })
    })

    describe('- repeat(n)', function() {
      it('should return the string concatenated with itself n times', function() {
        T (S(' ').repeat(5).s === '     ');
        T (S('*').repeat(3).s === '***');
      })

      it("should support cyrillic letters", function() {
        T (S('я').repeat(5).s === 'яяяяя');
      })
    })

    describe('- replaceAll(substring, replacement)', function() {
      it('should return the new string with all occurrences of substring replaced with the replacment string', function() {
        T (S(' does IT work? ').replaceAll(' ', '_').s === '_does_IT_work?_');
        T (S('Yes it does!').replaceAll(' ', '').s === 'Yesitdoes!')
        T (S('lalala.blabla').replaceAll('.', '_').s === 'lalala_blabla')

        var e = '\\', q = '"';
        var r = e + q;
        T (S('a').replaceAll(q, r).s === 'a');
      })

      it("should support cyrillic letters", function() {
        T (S('Я не верю').replaceAll(' ', '').s === 'Яневерю')
        T (S('-я-не-верю').replaceAll('-', ' ').s === ' я не верю')
        F (S('-я-не-верю').replaceAll(/-/, ' ').s === 'я не верю')
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

      it("should support cyrillic letters", function() {
        T (S('Меня зовут колобок').right(2).s === 'ок');
        T (S('Меня зовут колобок').right(7).s === 'колобок');
        T (S('Меня зовут колобок').right(-4).s === 'Меня');
      })
    })

    describe('- s', function() {
      it('should return the native string', function() {
        T (S('hi').s === 'hi');
        T (S('hi').toString() === S('hi').s);
      })

      it("should support cyrillic letters", function() {
        T (S('хай').s === 'хай');
        T (S('хай').toString() === S('хай').s);
      })
    })

    describe('- slugify', function() {
      it('should convert the text to url slug', function() {
        T (S('Global Thermonuclear Warfare').slugify().s === 'global-thermonuclear-warfare')
        T (S('Fast JSON Parsing').slugify().s === 'fast-json-parsing')
      })

      it("should support cyrillic letters", function() {
        T (S('Меня зовут колобок').slugify().s === 'меня-зовут-колобок');
        T (S('Меня Зовут Колобок').slugify().s === 'меня-зовут-колобок');
        T (S('меня Зовут колобок').slugify().s === 'меня-зовут-колобок');
        T (S('Меня_зовут_колобок').slugify().s === 'меня-зовут-колобок');
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

      it("should support cyrillic letters", function() {
        T (S('Меня зовут колобок').startsWith("Меня"));
        T (S(' зовут колобок').startsWith(" "));
        F (S('Меня зовут колобок').startsWith("меня"));
        F (S('Меня зовут колобок').startsWith("зовут"));
      })
    })

    describe('- stripPunctuation()', function() {
      it('should strip all of the punctuation', function() {
        T (S('My, st[ring] *full* of %punct)').stripPunctuation().s === 'My string full of punct')
      })

      it("should support cyrillic letters", function() {
        T (S('Мой к[од] %полон% #тудумарков _которым_ *не* **все** `равно`').stripPunctuation().s === 'Мой код полон тудумарков которым не все равно')
      })
    })

    describe('- stripTags([tag1],[tag2],...)', function() {
      it('should strip all of the html tags or tags specified by the parameters', function() {
        T (S('<p>just <b>some</b> text</p>').stripTags().s === 'just some text')
        T (S('<p>just <b>some</b> text</p>').stripTags('p').s === 'just <b>some</b> text')
      })

      it("should support cyrillic letters", function() {
        T (S('<p>Параграф <b>жырно</b> текст</p>').stripTags().s === 'Параграф жырно текст')
        T (S('<p>Параграф <b>жырно</b> текст</p>').stripTags('p').s === 'Параграф <b>жырно</b> текст')
      })
    })

    describe('- template(values, [open], [close])', function() {
      it('should return the string replaced with template values', function() {
        var str = "Hello {{name}}! How are you doing during the year of {{date-year}}?"
        var values = {name: 'JP', 'date-year': 2013}
        EQ (S(str).template(values).s, 'Hello JP! How are you doing during the year of 2013?')

        str = "Hello #{name}! How are you doing during the year of #{date-year}?"
        EQ (S(str).template(values, '#{', '}').s, 'Hello JP! How are you doing during the year of 2013?')

        str = "Hello {name}! How are you doing during the year of {date-year}?"
        EQ (S(str).template(values, '{', '}').s, 'Hello JP! How are you doing during the year of 2013?')
      })

      it("should support cyrillic letters", function() {
        var tpl, replacements, checkText, _$;

        _$ = [ 'Только {{firstAction}}, {{secondAction}} и {{leFinale}} радио "Радонеж"', {firstAction: 'молиться', secondAction: 'поститься', leFinale: 'слушать'}, 'Только молиться, поститься и слушать радио "Радонеж"' ], tpl = _$[0], replacements = _$[1], checkText = _$[2];

        EQ (S(tpl).template(replacements).s, checkText)
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

      it("should support cyrillic letters", function() {
        T (S('да').toBoolean())
        T (S('дА').toBoolean())
        T (S('Да').toBoolean())
        T (S('ДА').toBoolean())
        F (S('нет').toBoolean())
      })
    })

    describe('- toCSV(options)', function() {
      it('should convert the array to csv', function() {
        EQ (S(['a', 'b', 'c']).toCSV().s, '"a","b","c"');
        EQ (S(['a', 'b', 'c']).toCSV(':').s, '"a":"b":"c"');
        EQ (S(['a', 'b', 'c']).toCSV(':', null).s, 'a:b:c');
        EQ (S(['a', 'b', 'c']).toCSV('*', "'").s, "'a'*'b'*'c'");
        EQ (S(['a"', 'b', 4, 'c']).toCSV({delimiter: ',', qualifier: '"', escape: '\\',  encloseNumbers: false}).s, '"a\\"","b",4,"c"');
        EQ (S({firstName: 'JP', lastName: 'Richardson'}).toCSV({keys: true}).s, '"firstName","lastName"');
        EQ (S({firstName: 'JP', lastName: 'Richardson'}).toCSV().s, '"JP","Richardson"');
        EQ (S(['a', null, undefined, 'c']).toCSV().s, '"a","","","c"');
        EQ (S(['my "foo" bar', 'barf']).toCSV({delimiter: ';', qualifier: '"', escape: '"'}).s, '"my ""foo"" bar";"barf"');
      })

      it("should support cyrillic letters", function() {
        EQ (S(['а', 'б', 'в']).toCSV().s, '"а","б","в"');
        EQ (S(['а', 'б', 'в']).toCSV(':').s, '"а":"б":"в"');
        EQ (S(['а', 'б', 'в']).toCSV(':', null).s, 'а:б:в');
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

      it("should support cyrillic letters", function() {
        T (S('привет ').trim().s === 'привет');
        T (S(' привет ').trim().s === 'привет');
        T (S('\nпривет\n').trim().s === 'привет');
        T (S('\r\n\tпривет\n').trim().s === 'привет');
      })
    })

    describe('- trimLeft()', function() {
      it('should return the string with leading whitespace removed', function() {
        T (S('  How are you?').trimLeft().s === 'How are you?');
        T (S(' JP ').trimLeft().s === 'JP ');
      })

      it("should support cyrillic letters", function() {
        T (S(' привет').trimLeft().s === 'привет');
        T (S(' привет ').trimLeft().s === 'привет ');
      })
    })

    describe('- trimRight()', function() {
      it('should return the string with trailing whitespace removed', function() {
        T (S('How are you?  ').trimRight().s === 'How are you?');
        T (S(' JP ').trimRight().s === ' JP');
      })

      it("should support cyrillic letters", function() {
        T (S(' привет').trimRight().s === ' привет');
        T (S(' привет ').trimRight().s === ' привет');
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
        EQ (S('some string').truncate(200).s, 'some string')
      })

      it("should support cyrillic letters", function() {
        T (S('Привет всем').truncate(6).s === 'Привет...')
        T (S('Привет всем').truncate(9).s === 'Привет...')
        EQ (S('Привет всем').truncate(11).s, 'Привет всем')
        EQ (S('Привет всем').truncate(20).s, 'Привет всем')
        EQ (S('Я, правда, не до конца понимаю, как это работает').truncate(11).s, 'Я, правда...')
        EQ (S('Я, правда, не до конца понимаю, как это работает').truncate(13).s, 'Я, правда, не...')
        EQ (S('Я, правда, не до конца понимаю, как это работает').truncate(16).s, 'Я, правда, не до...')
      })
    })

    describe('- underscore()', function() {
      it('should convert a camel cased string into a string separated by underscores', function() {
        T (S('dataRate').underscore().s === 'data_rate');
        T (S('CarSpeed').underscore().s === '_car_speed');
        T (S('yesWeCan').underscore().s === 'yes_we_can');
      })

      it("should support cyrillic letters", function() {
        T (S('приветПривет').underscore().s === 'привет_привет');
        T (S('ПриветПривет').underscore().s === '_привет_привет');
        T (S('приветПриветПривет').underscore().s === 'привет_привет_привет');
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
