
class S
  constructor: (@s) ->
    @s = @ unless @s?

  collapseWhitespace: ->
    s = @s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, ''); #thanks Google
    new S(s)

  contains: (ss) ->
    @s.indexOf(ss) >= 0

  endsWith: (suffix) ->
    l = @s.length - suffix.length;
    l >= 0 && @s.indexOf(suffix, l) == l;

  includes: S::.contains

  include: S::.contains

  isAlpha: -> 
    !/[^a-zA-Z]/.test(@s)

  isAlphaNumeric: -> 
    !/[^a-zA-Z0-9]/.test(@s)

  isEmpty: ->
    /^[\s\xa0]*$/.test(@s)

  isNumeric: -> 
    !/[^0-9]/.test(@s)

  left: (N) ->
    if N >= 2
      s = @s.substr(0,N)
      new S(s)
    else
      @right(-N)

  ltrim: ->
    s = @s.replace(/(^\s*)/g, '')
    new S(s)

  replaceAll: (ss, r) ->
    s = @s.replace(new RegExp(ss, 'g'), r)
    new S(s)

  right: (N) ->
    if N >= 0
      s = @s.substr(@s.length - N, N)
      new S(s)
    else
      @left(-N)

  startsWith: (prefix) ->
    @s.lastIndexOf(prefix, 0) is 0 #Google says this is the fastest

  trim: ->
    if typeof String::trim is 'undefined'
      s = @s.replace(/(^\s*|\s*$)/g, '')
    else
      s = @s.trim()
    new S(s)

  toString: ->
    @s


wrap = (str) ->
  new S(str)

methodsAdded = []
cloberPrototype = ->
  newS = new S()
  for name,func of newS
    if !String.prototype.hasOwnProperty(name)
      methodsAdded.push(name)
      String.prototype[name] = ->
        String.prototype.s = @
        func.apply(@, arguments)

restorePrototype = ->
  for name in methodsAdded
    delete String.prototype[name]
  methodsAdded.length = 0

if window?
  window.S = wrap
  window.S.cloberPrototype = cloberPrototype
  window.S.restorePrototype = restorePrototype
else
  module.exports = wrap
  module.exports.cloberPrototype = cloberPrototype
  module.exports.restorePrototype = restorePrototype

