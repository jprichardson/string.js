#String::isCharBetween = (idx) -> 
#  if idx?
#    return this.charCodeAt(i)

String::isAlpha = -> !/[^a-zA-Z]/.test(this)
String::isAlphaDigit = -> !/[^a-zA-Z0-9]/.test(this)
String::isDigit = -> !/[^0-9]/.test(this) #this does not include 'Infinity' or '-Infinity'
String::isNum = -> Number(this).toString() != 'NaN' #this includes 'Infinity' and '-Infinity'


