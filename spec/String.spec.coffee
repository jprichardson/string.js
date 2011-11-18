require('string')

T = (v) -> expect(v).toBeTruthy()
F = (v) -> expect(v).toBeFalsy()

describe "String", ->

  it "should be a number", ->
    T "34".isNum()
    T "34.22".isNum()
    T "-22.33".isNum()
    F "NaN".isNum()
    T "Infinity".isNum()
    T "-Infinity".isNum()
    F "JP".isNum()

  it "should be a digit", ->
    T "3".isDigit()
    F "34.22".isDigit()
    F "-22.33".isDigit()
    F "NaN".isDigit()
    F "Infinity".isDigit()
    F "-Infinity".isDigit()
    F "JP".isDigit()
    F "-5".isDigit()
    T "000992424242".isDigit()

  it "should be an alpha character", ->
    T "afaf".isAlpha()
    T "FJslfjkasfs".isAlpha()
    F "adflj43faljsdf".isAlpha()
    F "33".isAlpha()
    F "TT....TTTafafetstYY".isAlpha()

  it "should be alpha characters or digits", ->
    T "afaf35353afaf".isAlphaDigit()
    T "FFFF99fff".isAlphaDigit()
    T "99".isAlphaDigit()
    T "afff".isAlphaDigit()
    F "-33".isAlphaDigit()
    F "aaff..".isAlphaDigit()

  
    
