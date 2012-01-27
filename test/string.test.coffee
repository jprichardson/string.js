require('../lib/string')
assert = require('assert')

T = (v) -> assert(v)
F = (v) -> assert(!v)

describe 'String', ->
  describe '- isNum()', ->
    it "should return true if the string is a valid number", ->
      T "34".isNum()
      T "34.22".isNum()
      T "-22.33".isNum()
      F "NaN".isNum()
      T "Infinity".isNum()
      T "-Infinity".isNum()
      F "JP".isNum()

  describe '- isDigit()', ->
    it "should return true if the string only contains digits, this would not include Infinity or -Infinity", ->
      T "3".isDigit()
      F "34.22".isDigit()
      F "-22.33".isDigit()
      F "NaN".isDigit()
      F "Infinity".isDigit()
      F "-Infinity".isDigit()
      F "JP".isDigit()
      F "-5".isDigit()
      T "000992424242".isDigit()

  describe '- isAlpha()', ->
    it "should return true if the string contains only letters", ->
      T "afaf".isAlpha()
      T "FJslfjkasfs".isAlpha()
      F "adflj43faljsdf".isAlpha()
      F "33".isAlpha()
      F "TT....TTTafafetstYY".isAlpha()

  describe '- isAlphaDigit()', ->
    it "should return true if the string contains only letters and digits", ->
      T "afaf35353afaf".isAlphaDigit()
      T "FFFF99fff".isAlphaDigit()
      T "99".isAlphaDigit()
      T "afff".isAlphaDigit()
      T "Infinity".isAlphaDigit()
      F "-Infinity".isAlphaDigit()
      F "-33".isAlphaDigit()
      F "aaff..".isAlphaDigit()

  describe '- startsWith()', ->
    it "should return true if the string starts with the input string", ->
      T "JP bla blah".startsWith("JP")
      F "afafaf".startsWith("JP")
      T "".startsWith("")
      T "Hi".startsWith("")
      T "JP".startsWith("JP")

  describe '- endsWith()', ->
    it "should return true if the string ends with the input string", ->
      T "hello jon".endsWith('jon')
      F 'ffffaaa'.endsWith('jon')
      T "".endsWith('')
      T "hi".endsWith('')
      T "hi".endsWith('hi')

  describe '- contains()', ->
    it 'should return true if the string contains the input string (alias of includes)', ->
      T "hello jon paul".contains('jon')
      T "hello jon paul".contains('l')
      T "hello jon paul".contains('hello')
      F "hello jon paul".contains('x')
      F "hello jon paul".contains('JP')

  describe '- includes()', ->
    it 'should return true if the string includes the input string (alias of contains)', ->
      T "hello jon paul".includes('jon')
      T "hello jon paul".includes('l')
      T "hello jon paul".includes('hello')
      F "hello jon paul".includes('x')
      F "hello jon paul".includes('JP')

  describe '- trim()', ->
    it 'should return the string with leading whitespace removed', ->
      T 'hello '.trim() is 'hello'
      T ' hello '.trim() is 'hello'
      T '\nhello'.trim() is 'hello'
      T '\nhello\r\n'.trim() is 'hello'
      T '\thello\t'.trim() is 'hello'
    
