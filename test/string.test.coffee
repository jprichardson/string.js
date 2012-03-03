T = (v) -> if !v then throw new Error('Should be true.')
F = (v) -> if v then throw new Error('Should be false.')

if window?
  S = window.S
else
  S = require('../lib/string')


describe 'string.js', ->
  describe '- camelize()', ->
    it 'should remove any underscores or dashes and convert a string into camel casing', ->
      T S('data_rate').camelize().s is 'dataRate'
      T S('background-color').camelize().s is 'backgroundColor'
      T S('-moz-something').camelize().s is 'MozSomething'
      T S('_car_speed_').camelize().s is 'CarSpeed'
      T S('yes_we_can').camelize().s is 'yesWeCan'

  describe '- capitalize()', ->
    it 'should capitalize the string', ->
      T S('jon').capitalize().s is 'Jon'
      T S('JP').capitalize().s is 'Jp'

  describe '+ clobberPrototype()', ->
    it 'should extend the String prototype with the extra methods', ->
      S.clobberPrototype()
      T " hello!".endsWith('!')
      S.restorePrototype()

  describe '- collapseWhitespace()', ->
    it 'should convert all adjacent whitespace characters to a single space and trim the ends', ->
      T S('  String   \t libraries are   \n\n\t fun\n!  ').collapseWhitespace().s is 'String libraries are fun !'

  describe '- contains(substring)', ->
    it 'should return true if the string contains the specified input string', ->
      T S('JavaScript is one of the best languages!').contains('one')
      F S('What do you think?').contains('YES!')

  describe '- dasherize()', ->
    it 'should convert a camel cased string into a string delimited by dashes', ->
      T S('dataRate').dasherize().s is 'data-rate'
      T S('CarSpeed').dasherize().s is '-car-speed'
      T S('yesWeCan').dasherize().s is 'yes-we-can'
      T S('backgroundColor').dasherize().s is 'background-color'

  describe '- endsWith(suffix)', ->
    it "should return true if the string ends with the input string", ->
      console.log 'SE: ' + S
      console.log 'T: ' + T
      T S("hello jon").endsWith('jon')
      F S('ffffaaa').endsWith('jon')
      T S("").endsWith('')
      T S("hi").endsWith('')
      T S("hi").endsWith('hi')

  describe '- include(substring)', ->
    it 'should return true if the string contains the specified input string', ->
      T S('JavaScript is one of the best languages!').include('one')
      F S('What do you think?').include('YES!')

  describe '- isAlpha()', ->
    it "should return true if the string contains only letters", ->
      T S("afaf").isAlpha()
      T S("FJslfjkasfs").isAlpha()
      F S("adflj43faljsdf").isAlpha()
      F S("33").isAlpha()
      F S("TT....TTTafafetstYY").isAlpha()

  describe '- isAlphaNumeric()', ->
    it "should return true if the string contains only letters and digits", ->
      T S("afaf35353afaf").isAlphaNumeric()
      T S("FFFF99fff").isAlphaNumeric()
      T S("99").isAlphaNumeric()
      T S("afff").isAlphaNumeric()
      T S("Infinity").isAlphaNumeric()
      F S("-Infinity").isAlphaNumeric()
      F S("-33").isAlphaNumeric()
      F S("aaff..").isAlphaNumeric()

  describe '- isEmpty()', ->
    it 'should return true if the string is solely composed of whitespace', ->
      T S(' ').isEmpty()
      T S('\t\t\t    ').isEmpty()
      T S('\n\n ').isEmpty()

  describe '- isLower()', ->
    it 'should return true if the character or string is lowercase', ->
      T S('a').isLower()
      T S('z').isLower()
      F S('B').isLower()
      T S('hijp').isLower()
      F S('hi jp').isLower()
      F S('HelLO').isLower()

  describe '- isNumeric()', ->
    it "should return true if the string only contains digits, this would not include Infinity or -Infinity", ->
      T S("3").isNumeric()
      F S("34.22").isNumeric()
      F S("-22.33").isNumeric()
      F S("NaN").isNumeric()
      F S("Infinity").isNumeric()
      F S("-Infinity").isNumeric()
      F S("JP").isNumeric()
      F S("-5").isNumeric()
      T S("000992424242").isNumeric()

  describe '- isUpper()', ->
    it 'should return true if the character or string is uppercase', ->
      F S('a').isUpper()
      F S('z').isUpper()
      T S('B').isUpper()
      T S('HIJP').isUpper()
      F S('HI JP').isUpper()
      F S('HelLO').isUpper()

  describe '- ltrim()', ->
    it 'should return the string with leading whitespace removed', ->
      T S('  How are you?').ltrim().s is 'How are you?'
      T S(' JP ').ltrim().s is 'JP '

  describe '- left(N)', ->
    it 'should return the substring denoted by N positive left-most characters', ->
      T S('My name is JP').left(2).s is 'My'
      T S('Hi').left(0).s is ''

    it 'should return the substring denoted by N negative left-most characters, equivalent to calling right(-N)', ->
      T S('My name is JP').left(-2).s is 'JP' #same as right(-(-2))

  describe '- repeat(n)', ->
    it 'should return a string with that is concatenated n times', ->
      T S(' ').repeat(5).s is '     '
      T S('*').repeat(3).s is '***'

  describe '- replaceAll(substring, replacement)', ->
    it 'should return the new string with all occurrences of substring replaced with the replacment string', ->
      T S(' does IT work? ').replaceAll(' ', '_').s is '_does_IT_work?_'
      T S('Yes it does!').replaceAll(' ', '').s is 'Yesitdoes!'

  describe '+ restorePrototype()', ->
    it 'should restore the original String prototype', ->
      T typeof ' hi'.endsWith is 'undefined'
      S.clobberPrototype()
      T ' hi'.endsWith('hi')
      S.restorePrototype()
      T typeof ' hi'.endsWith is 'undefined'

  describe '- right(N)', ->
    it 'should return the substring denoted by N positive right-most characters', ->
      T S('I AM CRAZY').right(2).s is 'ZY'
      T S('Does it work?  ').right(4).s is 'k?  '
      T S('Hi').right(0).s is ''

    it 'should return the substring denoted by N negative right-most characters, equivalent to calling left(-N)', ->
      T S('My name is JP').right(-2).s is 'My' #same as left(-(-2))

  describe '- rtrim()', ->
    it 'should return the string with trailing whitespace removed', ->
      T S('How are you?  ').rtrim().s is 'How are you?'
      T S(' JP ').rtrim().s is ' JP'

  describe '- s', ->
    it 'should return the native string', ->
      T S('hi').s is 'hi'
      T S('hi').toString() is S('hi').s

  describe '- startsWith(prefix)', ->
    it "should return true if the string starts with the input string", ->
      T S("JP is a software engineer").startsWith("JP")
      F S('wants to change the world').startsWith("politicians")
      T S("").startsWith("")
      T S("Hi").startsWith("")
      T S("JP").startsWith("JP")

  describe '- times(n)', ->
    it 'should return a string with that is concatenated n times', ->
      T S(' ').times(5).s is '     '
      T S('*').times(3).s is '***'

  describe '- toString()', ->
    it 'should return the native string', ->
      T S('hi').toString() is 'hi'
      T S('hi').toString() is S('hi').s

  describe '- trim()', ->
    it 'should return the string with leading and trailing whitespace removed', ->
      T S('hello ').trim().s is 'hello'
      T S(' hello ').trim().s is 'hello'
      T S('\nhello').trim().s is 'hello'
      T S('\nhello\r\n').trim().s is 'hello'
      T S('\thello\t').trim().s is 'hello'

  describe '- underscore()', ->
    it 'should convert a camel cased string into a string separated by underscores', ->
      T S('dataRate').underscore().s is 'data_rate'
      T S('CarSpeed').underscore().s is '_car_speed'
      T S('yesWeCan').underscore().s is 'yes_we_can'
  
    