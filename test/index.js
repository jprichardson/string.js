const S = require('../dist/string.js').default;

const submodules = [
  'between',
  'template',
];

for (let i = 0, l = submodules.length; i < l; i++) {
  const name = submodules[i];
  try {
    const fn = require(`../src/${name}`);
    /** @type {TestFixtures} */
    const fixtures = require(`../src/${name}/test/fixtures`);
    fixtures.setFunction(fn, name).test();
    fixtures.setConstructor(S).setMethod(name).test();
  }
  catch (e) {
    // Intentionally empty.
  }
}

//
// describe('string.js', function() {
//
//   describe('- constructor', function() {
//     it('should set the internal "s" property', function() {
//       assert.true(S('helo').s === 'helo')
//       assert.true(S(5).s === '5')
//       assert.true(S(new Date(2012, 1, 1)).s.indexOf('2012') != -1)
//       assert.true(S(new RegExp()).s.substr(0,1) === '/')
//       assert.true(S({}).s === '[object Object]')
//       assert.true(S(null).s === null)
//       assert.true(S(undefined).s === undefined)
//     })
//   })
//
//   describe('- camelize()', function() {
//     it('should remove any underscores or dashes and convert a string into camel casing', function() {
//       assert.true(S('data_rate').camelize().s === 'dataRate');
//       assert.true(S('background-color').camelize().s === 'backgroundColor');
//       assert.true(S('-moz-something').camelize().s === 'MozSomething');
//       assert.true(S('_car_speed_').camelize().s === 'CarSpeed');
//       assert.true(S('yes_we_can').camelize().s === 'yesWeCan');
//     })
//   })
//
//   describe('- capitalize()', function() {
//     it('should capitalize the string', function() {
//       assert.true(S('jon').capitalize().s === 'Jon');
//       assert.true(S('JP').capitalize().s === 'Jp');
//     })
//   })
//
//   describe('- charAt(index)', function() {
//     it('should return a native JavaScript string with the character at the specified position', function() {
//       assert.true(S('hi').charAt(1) === 'i')
//     })
//   })
//
//   describe('- chompLeft(prefix)', function() {
//     it('should remove `prefix` from start of string', function() {
//       assert.true(S('foobar').chompLeft('foo').s === 'bar')
//       assert.true(S('foobar').chompLeft('bar').s === 'foobar')
//       assert.true(S('').chompLeft('foo').s === '')
//       assert.true(S('').chompLeft('').s === '')
//     })
//   })
//
//   describe('- chompRight(suffix)', function() {
//     it('should remove `suffix` from end of string', function() {
//       assert.true(S('foobar').chompRight('foo').s === 'foobar')
//       assert.true(S('foobar').chompRight('bar').s === 'foo')
//       assert.true(S('').chompRight('foo').s === '')
//       assert.true(S('').chompRight('').s === '')
//     })
//   })
//
//   describe('- collapseWhitespace()', function() {
//     it('should convert all adjacent whitespace characters to a single space and trim the ends', function() {
//       assert.true(S('  Strings   \t are   \n\n\t fun\n!  ').collapseWhitespace().s === 'Strings are fun !');
//     })
//   })
//
//   describe('- contains(substring)', function() {
//     it('should return true if the string contains the specified input string', function() {
//       assert.true(S('JavaScript is one of the best languages!').contains('one'));
//       assert.false(S('What do you think?').contains('YES!'));
//     })
//   })
//
//   describe('- count(substring)', function() {
//     it('should return the count of all substrings', function() {
//       assert.strictEqual(S('JP likes to program. JP does not play in the NBA.').count("JP"), 2)
//       assert.strictEqual(S('Does not exist.').count("Flying Spaghetti Monster"), 0)
//       assert.strictEqual(S('Does not exist.').count("Bigfoot"), 0)
//       assert.strictEqual(S('JavaScript is fun, therefore Node.js is fun').count("fun"), 2)
//       assert.strictEqual(S('funfunfun').count("fun"), 3)
//     })
//   })
//
//   describe('- equalsIgnoreCase()', function() {
//     it('should be equal', function() {
//       assert.true(S('jon').equalsIgnoreCase('Jon'));
//       assert.true(S('Jon').equalsIgnoreCase('jon'));
//       assert.true(S('jon').equalsIgnoreCase('jon'));
//       assert.true(S('Jon').equalsIgnoreCase('Jon'));
//     })
//     it('should not be equal', function() {
//       assert.false(S('John').equalsIgnoreCase('Jon'));
//     })
//   })
//
//   describe('- dasherize()', function() {
//     it('should convert a camel cased string into a string delimited by dashes', function() {
//       assert.true(S('dataRate').dasherize().s === 'data-rate');
//       assert.true(S('CarSpeed').dasherize().s === '-car-speed');
//       assert.true(S('yesWeCan').dasherize().s === 'yes-we-can');
//       assert.true(S('backgroundColor').dasherize().s === 'background-color');
//     })
//   })
//
//   describe('- decodeHTMLEntities()', function() {
//     it('should decode HTML entities into their proper string representation', function() {
//       assert.strictEqual(S('Ken Thompson &amp; Dennis Ritchie').decodeHTMLEntities().s, 'Ken Thompson & Dennis Ritchie');
//       assert.strictEqual(S('3 &lt; 4').decodeHTMLEntities().s, '3 < 4');
//       assert.strictEqual(S('http:&#47;&#47;').decodeHTMLEntities().s, 'http://')
//     })
//   })
//
//   describe('- endsWith(suffixe1[, suffix2, ..])', function() {
//     it("should return true if the string ends with the input string", function() {
//       assert.true(S("hello jon").endsWith('jon'));
//       assert.false(S('ffffaaa').endsWith('jon'));
//       assert.true(S("").endsWith(''));
//       assert.true(S("hi").endsWith(''));
//       assert.true(S("hi").endsWith('hi'));
//       assert.true(S("test.jpeg").endsWith('png', 'jpg', 'jpeg'));
//       assert.true(S("Chunky Bacon").endsWith(''));
//       assert.false(S("Chunky Bacon").endsWith("nk", "aco"));
//     })
//   })
//
//   describe('- ensureLeft(prefix)', function() {
//     it('should prepend `prefix` if string does not start with prefix', function() {
//       assert.true(S('foobar').ensureLeft('foo').s === 'foobar')
//       assert.true(S('bar').ensureLeft('foo').s === 'foobar')
//       assert.true(S('').ensureLeft('foo').s === 'foo')
//       assert.true(S('').ensureLeft('').s === '')
//     })
//   })
//
//   describe('- ensureRight(suffix)', function() {
//     it('should append `suffix` if string does not end with suffix', function() {
//       assert.true(S('foobar').ensureRight('bar').s === 'foobar')
//       assert.true(S('foo').ensureRight('bar').s === 'foobar')
//       assert.true(S('').ensureRight('foo').s === 'foo')
//       assert.true(S('').ensureRight('').s === '')
//     })
//   })
//
//   describe('- escapeHTML()', function() {
//     it('should escape the html', function() {
//       assert.true(S('<div>Blah & "blah" & \'blah\'</div>').escapeHTML().s ===
//         '&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;');
//       assert.true(S('&lt;').escapeHTML().s === '&amp;lt;');
//     })
//   })
//
//   describe('+ extendPrototype()', function() {
//     it('should extend the String prototype with the extra methods', function() {
//       S.extendPrototype();
//       assert.true(" hello!".include('!'));
//       S.restorePrototype();
//     })
//   });
//
//   describe('- humanize()', function() {
//     it('should humanize the string', function() {
//       assert.strictEqual(S('the_humanize_string_method').humanize().s, 'The humanize string method')
//       assert.strictEqual(S('ThehumanizeStringMethod').humanize().s, 'Thehumanize string method')
//       assert.strictEqual(S('the humanize string method').humanize().s, 'The humanize string method')
//       assert.strictEqual(S('the humanize_id string method_id').humanize().s, 'The humanize id string method')
//       assert.strictEqual(S('the  humanize string method  ').humanize().s, 'The humanize string method')
//       assert.strictEqual(S('   capitalize dash-CamelCase_underscore trim  ').humanize().s, 'Capitalize dash camel case underscore trim')
//       assert.strictEqual(S(123).humanize().s, '123')
//       assert.strictEqual(S('').humanize().s, '')
//       assert.strictEqual(S(null).humanize().s, '')
//       assert.strictEqual(S(undefined).humanize().s, '')
//     })
//   })
//
//   describe('- include(substring)', function() {
//     it('should return true if the string contains the specified input string', function() {
//       assert.true(S('JavaScript is one of the best languages!').include('one'));
//       assert.false(S('What do you think?').include('YES!'));
//     })
//   })
//
//   describe('- isAlpha()', function() {
//     it("should return true if the string contains only letters", function() {
//       assert.true(S("afaf").isAlpha());
//       assert.true(S("FJslfjkasfs").isAlpha());
//       assert.true(S("áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ").isAlpha());
//       assert.false(S("adflj43faljsdf").isAlpha());
//       assert.false(S("33").isAlpha());
//       assert.false(S("TT....TTTafafetstYY").isAlpha());
//       assert.false(S("-áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ").isAlpha());
//       assert.false(S("").isAlpha());
//     })
//   })
//
//   describe('- isAlphaNumeric()', function() {
//     it("should return true if the string contains only letters and digits", function() {
//       assert.true(S("afaf35353afaf").isAlphaNumeric());
//       assert.true(S("FFFF99fff").isAlphaNumeric());
//       assert.true(S("99").isAlphaNumeric());
//       assert.true(S("afff").isAlphaNumeric());
//       assert.true(S("Infinity").isAlphaNumeric());
//       assert.true(S("áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ1234567890").isAlphaNumeric());
//       assert.false(S("-Infinity").isAlphaNumeric());
//       assert.false(S("-33").isAlphaNumeric());
//       assert.false(S("aaff..").isAlphaNumeric());
//       assert.false(S(".áéúóúÁÉÍÓÚãõÃÕàèìòùÀÈÌÒÙâêîôûÂÊÎÔÛäëïöüÄËÏÖÜçÇ1234567890").isAlphaNumeric());
//     })
//   })
//
//   describe('- isEmpty()', function() {
//     it('should return true if the string is solely composed of whitespace or is null', function() {
//       assert.true(S(' ').isEmpty());
//       assert.true(S('\t\t\t    ').isEmpty());
//       assert.true(S('\n\n ').isEmpty());
//       assert.false(S('hey').isEmpty())
//       assert.true(S(null).isEmpty())
//       assert.true(S(null).isEmpty())
//     })
//   })
//
//   describe('- isLower()', function() {
//     it('should return true if the character or string is lowercase', function() {
//       assert.true(S('a').isLower());
//       assert.true(S('z').isLower());
//       assert.false(S('B').isLower());
//       assert.true(S('hijp').isLower());
//       assert.true(S('áéúóúãõàèìòùâêîôûäëïöüç').isLower());
//       assert.true(S('áéúóúãõàèìòùâêîôûäëïöüça').isLower());
//       assert.false(S('hi jp').isLower());
//       assert.false(S('HelLO').isLower());
//       assert.false(S('ÁÉÍÓÚÃÕÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÇ').isLower());
//       assert.false(S('áéúóúãõàèìòùâêîôûäëïöüçÁ').isLower());
//       assert.false(S('áéúóúãõàèìòùâêîôû äëïöüç').isLower());
//     })
//   })
//
//   describe('- isNumeric()', function() {
//     it("should return true if the string only contains digits, this would not include Infinity or -Infinity", function() {
//       assert.true(S("3").isNumeric());
//       assert.false(S("34.22").isNumeric());
//       assert.false(S("-22.33").isNumeric());
//       assert.false(S("NaN").isNumeric());
//       assert.false(S("Infinity").isNumeric());
//       assert.false(S("-Infinity").isNumeric());
//       assert.false(S("JP").isNumeric());
//       assert.false(S("-5").isNumeric());
//       assert.true(S("000992424242").isNumeric());
//     })
//   })
//
//   describe('- isUpper()', function() {
//     it('should return true if the character or string is uppercase', function() {
//       assert.false(S('a').isUpper());
//       assert.false(S('z').isUpper());
//       assert.true(S('B').isUpper());
//       assert.true(S('HIJP').isUpper());
//       assert.true(S('ÁÉÍÓÚÃÕÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÇ').isUpper());
//       assert.false(S('HI JP').isUpper());
//       assert.false(S('HelLO').isUpper());
//       assert.false(S('áéúóúãõàèìòùâêîôûäëïöüç').isUpper());
//       assert.false(S('áéúóúãõàèìòùâêîôûäëïöüçÁ').isUpper());
//       assert.false(S('ÁÉÍÓÚÃÕÀÈÌÒÙÂÊÎÔÛÄËÏÖÜÇá').isUpper());
//     })
//   })
//
//   describe('- latinise', function() {
//     it('should remove diacritics from Latin characters', function() {
//       assert.true(S('crème brûlée').latinise().s === 'creme brulee')
//       assert.true(S('CRÈME BRÛLÉE').latinise().s === 'CREME BRULEE')
//     })
//   })
//
//   describe('- length', function() {
//     it('should return the length of the string', function() {
//       assert.true(S('hello').length === 5);
//       assert.true(S('').length === 0);
//       assert.true(S(null).length === -1);
//       assert.true(S(undefined).length === -1);
//     })
//   })
//
//   describe('- left(N)', function() {
//     it('should return the substring denoted by N positive left-most characters', function() {
//       assert.true(S('My name is JP').left(2).s === 'My');
//       assert.true(S('Hi').left(0).s === '');
//       assert.true(S('Hello').left(1).s === 'H');
//     })
//     it('should return the substring denoted by N negative left-most characters, equivalent to calling right(-N)', function() {
//       assert.true(S('My name is JP').left(-2).s === 'JP');
//     })
//   })
//
//   describe('- pad(len, [char])', function() {
//     it('should pad the string in the center with specified character', function() {
//       assert.true(S('hello').pad(5).s === 'hello');
//       assert.true(S('hello').pad(10).s === '   hello  ');
//       assert.true(S('hey').pad(7).s === '  hey  ');
//       assert.true(S('hey').pad(5).s === ' hey ');
//       assert.true(S('hey').pad(4).s === ' hey');
//       assert.true(S('hey').pad(7, '-').s === '--hey--');
//     })
//     it('should work on numbers', function() {
//       assert.true(S(1234).pad(4, 0).s === '1234');
//       assert.true(S(1234).pad(7, 0).s === '0012340');
//       assert.true(S(1234).pad(7, 1).s === '1112341');
//     })
//     it('should use the default padding character when given null', function() {
//       assert.true(S('hello').pad(5, null).s === 'hello');
//       assert.true(S('hello').pad(10, null).s === '   hello  ');
//     })
//   })
//
//   describe('- padLeft(len, [char])', function() {
//     it('should left pad the string', function() {
//       assert.true(S('hello').padLeft(5).s === 'hello');
//       assert.true(S('hello').padLeft(10).s === '     hello');
//       assert.true(S('hello').padLeft(7).s === '  hello');
//       assert.true(S('hello').padLeft(6).s === ' hello');
//       assert.true(S('hello').padLeft(10, '.').s === '.....hello');
//     })
//     it('should work on numbers', function() {
//       assert.true(S(1234).padLeft(4, 0).s === '1234');
//       assert.true(S(1234).padLeft(7, 0).s === '0001234');
//       assert.true(S(1234).padLeft(7, 1).s === '1111234');
//     })
//     it('should use the default padding character when given null', function() {
//       assert.true(S('hello').padLeft(5, null).s === 'hello');
//       assert.true(S('hello').padLeft(10, null).s === '     hello');
//     })
//   })
//
//   describe('- padRight(len, [char])', function() {
//     it('should right pad the string', function() {
//       assert.true(S('hello').padRight(5).s === 'hello');
//       assert.true(S('hello').padRight(10).s === 'hello     ');
//       assert.true(S('hello').padRight(7).s === 'hello  ');
//       assert.true(S('hello').padRight(6).s === 'hello ');
//       assert.true(S('hello').padRight(10, '.').s === 'hello.....');
//     })
//     it('should work on numbers', function() {
//       assert.true(S(1234).padRight(4, 0).s === '1234');
//       assert.true(S(1234).padRight(7, 0).s === '1234000');
//       assert.true(S(1234).padRight(7, 1).s === '1234111');
//     })
//     it('should use the default padding character when given null', function() {
//       assert.true(S('hello').padRight(5, null).s === 'hello');
//       assert.true(S('hello').padRight(10, null).s === 'hello     ');
//     })
//   })
//
//
//   describe('- parseCSV([delim],[qualifier],[escape],[lineDelimiter])', function() {
//     it('should parse a CSV line into an array', function() {
//       assert.deepStrictEqual(S("'a','b','c'").parseCSV(',', "'"), ['a', 'b', 'c'])
//       assert.deepStrictEqual(S('"a","b","c"').parseCSV(), ['a', 'b', 'c'])
//       assert.deepStrictEqual(S('a,b,c').parseCSV(',', null), ['a', 'b', 'c'])
//       assert.deepStrictEqual(S("'a,','b','c'").parseCSV(',', "'"), ['a,', 'b', 'c'])
//       assert.deepStrictEqual(S('"a","b",4,"c"').parseCSV(',', null), ['"a"', '"b"', '4', '"c"'])
//       assert.deepStrictEqual(S('"a","b","4","c"').parseCSV(), ['a', 'b', '4', 'c'])
//       assert.deepStrictEqual(S('"a","b",       "4","c"').parseCSV(), ['a', 'b', '4', 'c'])
//       assert.deepStrictEqual(S('"a","b",       4,"c"').parseCSV(",", null), [ '"a"', '"b"', '       4', '"c"' ])
//       assert.deepStrictEqual(S('"a","b\\"","d","c"').parseCSV(), ['a', 'b"', 'd', 'c'])
//       assert.deepStrictEqual(S('"jp","really\tlikes to code"').parseCSV(), ['jp', 'really\tlikes to code'])
//       assert.deepStrictEqual(S('"a","b+"","d","c"').parseCSV(",", "\"", "+"), ['a', 'b"', 'd', 'c'])
//       assert.deepStrictEqual(S('"a","b""","d","c"').parseCSV(",", "\"", "\""), ['a', 'b"', 'd', 'c'])
//       assert.deepStrictEqual(S('"a","","c"').parseCSV(), ['a', '', 'c'])
//       assert.deepStrictEqual(S('"","b","c"').parseCSV(), ['', 'b', 'c'])
//       assert.deepStrictEqual(S("'a,',b,'c'").parseCSV(',', "'"), ['a,', 'b', 'c'])
//
//       var lines = (S('"a\na","b","c"\n"a", """b\nb", "a"').parseCSV(',', '"', '"', '\n'));
//       assert.deepStrictEqual(lines[0], [ 'a\na', 'b', 'c' ]);
//       assert.deepStrictEqual(lines[1], [ 'a', '"b\nb', 'a' ]);
//     })
//   })
//
//   describe('- repeat(n)', function() {
//     it('should return the string concatenated with itself n times', function() {
//       assert.true(S(' ').repeat(5).s === '     ');
//       assert.true(S('*').repeat(3).s === '***');
//     })
//   })
//
//   describe('- replaceAll(substring, replacement)', function() {
//     it('should return the new string with all occurrences of substring replaced with the replacment string', function() {
//       assert.true(S(' does IT work? ').replaceAll(' ', '_').s === '_does_IT_work?_');
//       assert.true(S('Yes it does!').replaceAll(' ', '').s === 'Yesitdoes!')
//       assert.true(S('lalala.blabla').replaceAll('.', '_').s === 'lalala_blabla')
//
//       var e = '\\', q = '"';
//       var r = e + q;
//       assert.true(S('a').replaceAll(q, r).s === 'a');
//     })
//   })
//
//   describe('- splitLeft(sep, [maxSplit, [limit]])', function() {
//     it('should return an array of strings, split from the left at sep, at most maxSplit splits, at most limit elements', function() {
//       // by a char
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|'))
//       assert.deepStrictEqual(['a', 'b|c|d'], S('a|b|c|d').splitLeft('|', 1))
//       assert.deepStrictEqual(['a', 'b', 'c|d'], S('a|b|c|d').splitLeft('|', 2))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 4))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 1000))
//       assert.deepStrictEqual(['a|b|c|d'], S('a|b|c|d').splitLeft('|', 0))
//       assert.deepStrictEqual(['a', '', 'b||c||d'], S('a||b||c||d').splitLeft('|', 2))
//       assert.deepStrictEqual(['', ' begincase'], S('| begincase').splitLeft('|'))
//       assert.deepStrictEqual(['endcase ', ''], S('endcase |').splitLeft('|'))
//       assert.deepStrictEqual(['', 'bothcase', ''], S('|bothcase|').splitLeft('|'))
//
//       assert.deepStrictEqual(['a', 'b', 'c\x00\x00d'], S('a\x00b\x00c\x00\x00d').splitLeft('\x00', 2))
//
//       // by string
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a//b//c//d').splitLeft('//'))
//       assert.deepStrictEqual(['a', 'b//c//d'], S('a//b//c//d').splitLeft('//', 1))
//       assert.deepStrictEqual(['a', 'b', 'c//d'], S('a//b//c//d').splitLeft('//', 2))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a//b//c//d').splitLeft('//', 3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a//b//c//d').splitLeft('//', 4))
//       assert.deepStrictEqual(['a//b//c//d'], S('a//b//c//d').splitLeft('//', 0))
//       assert.deepStrictEqual(['a', '', 'b////c////d'], S('a////b////c////d').splitLeft('//', 2)) // overlap
//       assert.deepStrictEqual(['', ' begincase'], S('test begincase').splitLeft('test'))
//       assert.deepStrictEqual(['endcase ', ''], S('endcase test').splitLeft('test'))
//       assert.deepStrictEqual(['', ' bothcase ', ''], S('test bothcase test').splitLeft('test'))
//       assert.deepStrictEqual(['a', 'bc'], S('abbbc').splitLeft('bb'))
//       assert.deepStrictEqual(['', ''], S('aaa').splitLeft('aaa'))
//       assert.deepStrictEqual(['aaa'], S('aaa').splitLeft('aaa', 0))
//       assert.deepStrictEqual(['ab', 'ab'], S('abbaab').splitLeft('ba'))
//       assert.deepStrictEqual(['aaaa'], S('aaaa').splitLeft('aab'))
//       assert.deepStrictEqual([''], S('').splitLeft('aaa'))
//       assert.deepStrictEqual(['aa'], S('aa').splitLeft('aaa'))
//       assert.deepStrictEqual(['A', 'bobb'], S('Abbobbbobb').splitLeft('bbobb'))
//       assert.deepStrictEqual(['', 'B', 'A'], S('bbobbBbbobbA').splitLeft('bbobb'))
//
//       // with limit
//       assert.deepStrictEqual(['a'], S('a|b|c|d').splitLeft('|', 3, 1))
//       assert.deepStrictEqual(['a', 'b', 'c'], S('a|b|c|d').splitLeft('|', 3, 3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 3, 4))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 3, 5))
//
//       assert.deepStrictEqual(['d'], S('a|b|c|d').splitLeft('|', 3, -1))
//       assert.deepStrictEqual(['b', 'c|d'], S('a|b|c|d').splitLeft('|', 2, -2))
//       assert.deepStrictEqual(['b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 3, -3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 3, -4))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitLeft('|', 3, -5))
//
//     })
//   })
//
//   describe('- splitRight(sep, [maxSplit, [limit]])', function() {
//     it('should return an array of strings, split from the right at sep, at most maxSplit splits, at most limit elements', function() {
//       // by a char
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|'))
//       assert.deepStrictEqual(['a|b|c', 'd'], S('a|b|c|d').splitRight('|', 1))
//       assert.deepStrictEqual(['a|b', 'c', 'd'], S('a|b|c|d').splitRight('|', 2))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 4))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 1000))
//       assert.deepStrictEqual(['a|b|c|d'], S('a|b|c|d').splitRight('|', 0))
//       assert.deepStrictEqual(['a||b||c', '', 'd'], S('a||b||c||d').splitRight('|', 2))
//       assert.deepStrictEqual(['', ' begincase'], S('| begincase').splitRight('|'))
//       assert.deepStrictEqual(['endcase ', ''], S('endcase |').splitRight('|'))
//       assert.deepStrictEqual(['', 'bothcase', ''], S('|bothcase|').splitRight('|'))
//
//       assert.deepStrictEqual(['a\x00\x00b', 'c', 'd'], S('a\x00\x00b\x00c\x00d').splitRight('\x00', 2))
//
//       // by string
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a//b//c//d').splitRight('//'))
//       assert.deepStrictEqual(['a//b//c', 'd'], S('a//b//c//d').splitRight('//', 1))
//       assert.deepStrictEqual(['a//b', 'c', 'd'], S('a//b//c//d').splitRight('//', 2))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a//b//c//d').splitRight('//', 3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a//b//c//d').splitRight('//', 4))
//       assert.deepStrictEqual(['a//b//c//d'], S('a//b//c//d').splitRight('//', 0))
//       assert.deepStrictEqual(['a////b////c', '', 'd'], S('a////b////c////d').splitRight('//', 2)) // overlap
//       assert.deepStrictEqual(['', ' begincase'], S('test begincase').splitRight('test'))
//       assert.deepStrictEqual(['endcase ', ''], S('endcase test').splitRight('test'))
//       assert.deepStrictEqual(['', ' bothcase ', ''], S('test bothcase test').splitRight('test'))
//       assert.deepStrictEqual(['ab', 'c'], S('abbbc').splitRight('bb'))
//       assert.deepStrictEqual(['', ''], S('aaa').splitRight('aaa'))
//       assert.deepStrictEqual(['aaa'], S('aaa').splitRight('aaa', 0))
//       assert.deepStrictEqual(['ab', 'ab'], S('abbaab').splitRight('ba'))
//       assert.deepStrictEqual(['aaaa'], S('aaaa').splitRight('aab'))
//       assert.deepStrictEqual([''], S('').splitRight('aaa'))
//       assert.deepStrictEqual(['aa'], S('aa').splitRight('aaa'))
//       assert.deepStrictEqual(['bbob', 'A'], S('bbobbbobbA').splitRight('bbobb'))
//       assert.deepStrictEqual(['', 'B', 'A'], S('bbobbBbbobbA').splitRight('bbobb'))
//
//       // with limit
//       assert.deepStrictEqual(['d'], S('a|b|c|d').splitRight('|', 3, 1))
//       assert.deepStrictEqual(['b', 'c', 'd'], S('a|b|c|d').splitRight('|', 3, 3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 3, 4))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 3, 5))
//
//       assert.deepStrictEqual(['a'], S('a|b|c|d').splitRight('|', 3, -1))
//       assert.deepStrictEqual(['a|b', 'c'], S('a|b|c|d').splitRight('|', 2, -2))
//       assert.deepStrictEqual(['a', 'b', 'c'], S('a|b|c|d').splitRight('|', 3, -3))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 3, -4))
//       assert.deepStrictEqual(['a', 'b', 'c', 'd'], S('a|b|c|d').splitRight('|', 3, -5))
//
//     })
//   })
//
//   describe('- strip([string1],[string2],...)', function() {
//     it('should return the new string with all occurrences of [string1],[string2],... removed', function() {
//       assert.true(S('which ones will it take out one wonders').strip('on', 'er').s === 'which es will it take out e wds');
//       assert.true(S(' -- 1 2 - 3 4 5 - -- 6 7 _-- 8  9  0 ').strip('-', '_', ' ').s === '1234567890');
//     })
//   })
//
//   describe('- stripLeft(chars)', function () {
//
//     it('should return the new string with all occurences of `chars` removed from left', function () {
//       assert.true(S('hello').stripLeft().s === 'hello');
//       assert.true(S('hello').stripLeft('').s === 'hello');
//       assert.true(S('  hello  ').stripLeft().s === 'hello  ');
//       assert.true(S('foo ').stripLeft().s === 'foo ');
//       assert.true(S('').stripLeft().s === '');
//       assert.true(S(null).stripLeft().s === '');
//       assert.true(S(undefined).stripLeft().s === '');
//       assert.true(S('aazz').stripLeft('a').s === 'zz');
//       assert.true(S('yytest').stripLeft('t').s === 'yytest');
//       assert.true(S('xxxyyxx').stripLeft('x').s === 'yyxx');
//       assert.true(S('abcz').stripLeft('a-z').s === 'bcz');
//       assert.true(S('z alpha z').stripLeft('a-z').s === ' alpha z');
//       assert.true(S('_-foobar-_').stripLeft('_-').s === 'foobar-_');
//
//       assert.true(S('_.foo-_').stripLeft('_.').s === 'foo-_');
//       assert.true(S('?foo ').stripLeft('?').s === 'foo ');
//       assert.true(S('[$]hello-^').stripLeft('^[a-z]$').s === 'hello-^');
//
//       assert.true(S(123).stripLeft(1).s === '23');
//     });
//   });
//
//   describe('- stripRight(chars)', function () {
//
//     it('should return the new string with all occurences of `chars` removed from right', function () {
//       assert.true(S('hello').stripRight().s === 'hello');
//       assert.true(S('hello').stripRight('').s === 'hello');
//       assert.true(S('  hello  ').stripRight().s === '  hello');
//       assert.true(S('  foo').stripRight().s === '  foo');
//       assert.true(S('').stripRight().s === '');
//       assert.true(S(null).stripRight().s === '');
//       assert.true(S(undefined).stripRight().s === '');
//       assert.true(S('aazz').stripRight('z').s === 'aa');
//       assert.true(S('xxxyyxx').stripRight('x').s === 'xxxyy');
//       assert.true(S('abcz').stripRight('a-z').s === 'abc');
//       assert.true(S('z alpha z').stripRight('a-z').s === 'z alpha ');
//       assert.true(S('_-foobar-_').stripRight('_-').s === '_-foobar');
//
//       assert.true(S('_.foo_.').stripRight('_.').s === '_.foo');
//       assert.true(S(' foo?').stripRight('?').s === ' foo');
//       assert.true(S('[$]hello-^').stripRight('^[a-z]$').s === '[$]hello');
//
//       assert.true(S(123).stripRight(3).s === '12');
//     });
//   });
//
//   describe('+ restorePrototype()', function() {
//     it('should restore the original String prototype', function() {
//       assert.true(typeof 'hello world'.include === 'undefined');
//       S.extendPrototype();
//       assert.true('hello world'.include('world'));
//       S.restorePrototype();
//       assert.true(typeof ' hello world'.include === 'undefined');
//     })
//   })
//
//   describe('- right(N)', function() {
//     it('should return the substring denoted by N positive right-most characters', function() {
//       assert.true(S('I AM CRAZY').right(2).s === 'ZY');
//       assert.true(S('Does it work?  ').right(4).s === 'k?  ');
//       assert.true(S('Hi').right(0).s === '');
//     })
//     it('should return the substring denoted by N negative right-most characters, equivalent to calling left(-N)', function() {
//       assert.true(S('My name is JP').right(-2).s === 'My');
//     })
//   })
//
//   describe('- s', function() {
//     it('should return the native string', function() {
//       assert.true(S('hi').s === 'hi');
//       assert.true(S('hi').toString() === S('hi').s);
//     })
//   })
//
//   describe('- slugify', function() {
//     it('should convert the text to url slug', function() {
//       assert.true(S('Global Thermonuclear Warfare').slugify().s === 'global-thermonuclear-warfare')
//       assert.true(S('Fast JSON Parsing').slugify().s === 'fast-json-parsing')
//       assert.true(S('Crème brûlée').slugify().s === 'creme-brulee')
//     })
//   })
//
//   describe('- startsWith(prefix1 [, prefix2, ...])', function() {
//     it("should return true if the string starts with the input string", function() {
//       assert.true(S("JP is a software engineer").startsWith("JP"));
//       assert.false(S('wants to change the world').startsWith("politicians"));
//       assert.true(S("").startsWith(""));
//       assert.true(S("Hi").startsWith(""));
//       assert.true(S("JP").startsWith("JP"));
//       assert.true(S("Chunky Bacon").startsWith("JP", "Chunk"));
//       assert.false(S("Lorem Ipsum").startsWith("Ip", "Sum"));
//     });
//   })
//
//   describe('- stripPunctuation()', function() {
//     it('should strip all of the punctuation', function() {
//       assert.true(S('My, st[ring] *full* of %punct)').stripPunctuation().s === 'My string full of punct')
//     })
//   })
//
//   describe('- stripTags([tag1],[tag2],...)', function() {
//     it('should strip all of the html tags or tags specified by the parameters', function() {
//       assert.true(S('<p>just <b>some</b> text</p>').stripTags().s === 'just some text')
//       assert.true(S('<p>just <b>some</b> text</p>').stripTags('p').s === 'just <b>some</b> text')
//     })
//   })
//
//   describe('- times(n)', function() {
//     it('should return the string concatenated with itself n times', function() {
//       assert.true(S(' ').times(5).s === '     ');
//       assert.true(S('*').times(3).s === '***');
//     })
//   })
//
//   describe('- titleCase()', function() {
//     it('should upperCase all words in a camel cased string', function() {
//       assert.strictEqual(S('dataRate').titleCase().s, 'DataRate')
//       assert.strictEqual(S('CarSpeed').titleCase().s, 'CarSpeed')
//       assert.strictEqual(S('yesWeCan').titleCase().s, 'YesWeCan')
//       assert.strictEqual(S('backgroundColor').titleCase().s, 'BackgroundColor')
//     })
//     it('should upperCase all words in a string with spaces, underscores, or dashes', function() {
//       assert.strictEqual(S('Like ice in the sunshine').titleCase().s, 'Like Ice In The Sunshine')
//       assert.strictEqual(S('data_rate').titleCase().s, 'Data_Rate')
//       assert.strictEqual(S('background-color').titleCase().s, 'Background-Color')
//       assert.strictEqual(S('-moz-something').titleCase().s, '-Moz-Something')
//       assert.strictEqual(S('_car_speed_').titleCase().s, '_Car_Speed_')
//       assert.strictEqual(S('yes_we_can').titleCase().s, 'Yes_We_Can')
//     })
//     it('can be combined with humanize to create nice titles out of ugly developer strings', function() {
//       assert.strictEqual(S('   capitalize dash-CamelCase_underscore trim  ').humanize().titleCase().s, 'Capitalize Dash Camel Case Underscore Trim')
//     })
//     it('does not fail on edge cases', function () {
//       assert.strictEqual(S('').titleCase().s,'')
//       assert.strictEqual(S(null).titleCase().s,null)
//       assert.strictEqual(S(undefined).titleCase().s,undefined)
//     })
//   })
//
//   describe('- toFloat([precision])', function() {
//     it('should return the float value, wraps parseFloat', function() {
//       assert.true(S('5').toFloat() === 5);
//       assert.true(S('5.3').toFloat() === 5.3);
//       assert.true(S(5.3).toFloat() === 5.3);
//       assert.true(S('-10').toFloat() === -10);
//       assert.true(S('55.3 adfafaf').toFloat() === 55.3)
//       assert.true(S('afff 44').toFloat().toString() === 'NaN')
//       assert.true(S(3.45522222333232).toFloat(2) === 3.46)
//     })
//   })
//
//   describe('- toBoolean', function() {
//     it('should convert a logical truth string to boolean', function() {
//       assert.true(S('true').toBoolean());
//       assert.false(S('false').toBoolean());
//       assert.false(S('hello').toBoolean());
//       assert.true(S(true).toBoolean());
//       assert.true(S('on').toBoolean());
//       assert.true(S('yes').toBoolean());
//       assert.true(S('TRUE').toBoolean());
//       assert.true(S('TrUe').toBoolean());
//       assert.true(S('YES').toBoolean());
//       assert.true(S('ON').toBoolean());
//       assert.false(S('').toBoolean());
//       assert.false(S(undefined).toBoolean())
//       assert.false(S('undefined').toBoolean())
//       assert.false(S(null).toBoolean())
//       assert.false(S(false).toBoolean())
//       assert.false(S({}).toBoolean())
//       assert.true(S(1).toBoolean())
//       assert.false(S(-1).toBoolean())
//       assert.false(S(0).toBoolean())
//       assert.true(S('1').toBoolean())
//       assert.false(S('0').toBoolean())
//     })
//   })
//
//   describe('- toCSV(options)', function() {
//     it('should convert the array to csv', function() {
//       assert.strictEqual(S(['a', 'b', 'c']).toCSV().s, '"a","b","c"');
//       assert.strictEqual(S(['a', 'b', 'c']).toCSV(':').s, '"a":"b":"c"');
//       assert.strictEqual(S(['a', 'b', 'c']).toCSV(':', null).s, 'a:b:c');
//       assert.strictEqual(S(['a', 'b', 'c']).toCSV('*', "'").s, "'a'*'b'*'c'");
//       assert.strictEqual(S(['a"', 'b', 4, 'c']).toCSV({delimiter: ',', qualifier: '"', escape: '\\',  encloseNumbers: false}).s, '"a\\"","b",4,"c"');
//       assert.strictEqual(S({firstName: 'JP', lastName: 'Richardson'}).toCSV({keys: true}).s, '"firstName","lastName"');
//       assert.strictEqual(S({firstName: 'JP', lastName: 'Richardson'}).toCSV().s, '"JP","Richardson"');
//       assert.strictEqual(S(['a', null, undefined, 'c']).toCSV().s, '"a","","","c"');
//       assert.strictEqual(S(['my "foo" bar', 'barf']).toCSV({delimiter: ';', qualifier: '"', escape: '"'}).s, '"my ""foo"" bar";"barf"');
//     })
//   })
//
//   describe('- toInt()', function() {
//     it('should return the integer value, wraps parseInt', function() {
//       assert.true(S('5').toInt() === 5);
//       assert.true(S('5.3').toInt() === 5);
//       assert.true(S(5.3).toInt() === 5);
//       assert.true(S('-10').toInt() === -10);
//       assert.true(S('55 adfafaf').toInt() === 55)
//       assert.true(S('afff 44').toInt().toString() === 'NaN')
//       assert.true(S('0xff').toInt() == 255)
//     })
//   })
//
//   describe('- toString()', function() {
//     it('should return the native string', function() {
//       assert.true(S('hi').toString() === 'hi');
//       assert.true(S('hi').toString() === S('hi').s);
//     })
//   })
//
//   describe('- trim()', function() {
//     it('should return the string with leading and trailing whitespace removed', function() {
//       assert.true(S('hello ').trim().s === 'hello');
//       assert.true(S(' hello ').trim().s === 'hello');
//       assert.true(S('\nhello').trim().s === 'hello');
//       assert.true(S('\nhello\r\n').trim().s === 'hello');
//       assert.true(S('\thello\t').trim().s === 'hello');
//     })
//   })
//
//   describe('- trimLeft()', function() {
//     it('should return the string with leading whitespace removed', function() {
//       assert.true(S('  How are you?').trimLeft().s === 'How are you?');
//       assert.true(S(' JP ').trimLeft().s === 'JP ');
//     })
//   })
//
//   describe('- trimRight()', function() {
//     it('should return the string with trailing whitespace removed', function() {
//       assert.true(S('How are you?  ').trimRight().s === 'How are you?');
//       assert.true(S(' JP ').trimRight().s === ' JP');
//     })
//   })
//
//   describe('- truncate(length, [chars])', function() {
//     it('should truncate the string, accounting for word placement and chars count', function() {
//       assert.true(S('this is some long text').truncate(3).s === '...')
//       assert.true(S('this is some long text').truncate(7).s === 'this is...')
//       assert.true(S('this is some long text').truncate(11).s === 'this is...')
//       assert.true(S('this is some long text').truncate(12).s === 'this is some...')
//       assert.true(S('this is some long text').truncate(11).s === 'this is...')
//       assert.true(S('this is some long text').truncate(14, ' read more').s === 'this is some read more')
//       assert.strictEqual(S('some string').truncate(200).s, 'some string')
//     })
//   })
//
//   describe('- underscore()', function() {
//     it('should convert a camel cased string into a string separated by underscores', function() {
//       assert.true(S('dataRate').underscore().s === 'data_rate');
//       assert.true(S('CarSpeed').underscore().s === 'car_speed');
//       assert.false(S('CarSpeed').underscore().s === '_car_speed');
//       assert.true(S('_CarSpeed').underscore().s === '_car_speed');
//       assert.true(S('yesWeCan').underscore().s === 'yes_we_can');
//       assert.true(S('oneAtATime').underscore().s === 'one_at_a_time');
//       assert.true(S('oneAtATime AnotherWordAtATime').underscore().s === 'one_at_a_time_another_word_at_a_time');
//     })
//   })
//
//   describe('- unescapeHTML', function() {
//     it('should unescape the HTML', function() {
//       assert.true(S('&lt;div&gt;Blah &amp; &quot;blah&quot; &amp; &apos;blah&apos;&lt;/div&gt;').unescapeHTML().s ===
//         '<div>Blah & "blah" & \'blah\'</div>');
//       assert.true(S('&amp;lt;').unescapeHTML().s === '&lt;');
//     })
//   })
//
//   describe('- valueOf()', function() {
//     it('should return the primitive value of the string, wraps native valueOf()', function() {
//       assert.true(S('hi').valueOf() === 'hi')
//     })
//   })
//
//   describe('- wrapHTML()', function () {
//     it('should return the string with wrapped HTML Element and their attributes', function () {
//       assert.true(S('Venkat').wrapHTML().s === '<span>Venkat</span>')
//       assert.true(S('Venkat').wrapHTML('div').s === '<div>Venkat</div>')
//       assert.true(S('Venkat').wrapHTML('div', {
//         "class": "left bullet"
//       }).s === '<div class="left bullet">Venkat</div>')
//       assert.true(S('Venkat').wrapHTML('div', {
//         "data-content": "my \"encoded\" content"
//       }).s === '<div data-content="my &quot;encoded&quot; content">Venkat</div>')
//       assert.true(S('Venkat').wrapHTML('div', {
//         "id": "content",
//         "class": "left bullet"
//       }).s === '<div id="content" class="left bullet">Venkat</div>')
//     })
//   })
//
//   describe('+ VERSION', function() {
//     it('should exist', function() {
//       assert.true(S.VERSION)
//     })
//   })
//
//   it('should import native JavaScript string methods', function() {
//     assert.true(S('hi    ').substr(0,1).trimRight().startsWith('h'));
//     assert.true(S('hello ').concat('jp').indexOf('jp') === 6);
//     assert.true(S('this is so cool').substr(0, 4).s === 'this');
//   })
//
// })
