
class S
  constructor: (@s) ->
    @s = @ unless @s?

  # modified slightly from https://github.com/epeli/underscore.string
  camelize: ->
      s = @.trim().s.replace /(\-|_|\s)+(.)?/g, (match, sep, c) ->
        return (if c then c.toUpperCase() else '')
      #s = s.charAt(0).toLowerCase() + s.substring(1)
      new S(s)

  capitalize: ->
    new S(@s.substr(0,1).toUpperCase() + @s.substring(1).toLowerCase())

  collapseWhitespace: ->
    s = @s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, ''); #thanks Google
    new S(s)

  contains: (ss) ->
    @s.indexOf(ss) >= 0

  dasherize: -> #modified from https://github.com/epeli/underscore.string
    s = @.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase()
    #if (new S(@s.charAt(0))).isUpper() then s = '-' + s
    new S(s)

  endsWith: (suffix) ->
    l = @s.length - suffix.length;
    l >= 0 && @s.indexOf(suffix, l) == l;

  isAlpha: -> 
    !/[^a-zA-Z]/.test(@s)

  isAlphaNumeric: -> 
    !/[^a-zA-Z0-9]/.test(@s)

  isEmpty: ->
    /^[\s\xa0]*$/.test(@s)

  isLower: ->
    !/[^a-z]/.test(@s)

  isNumeric: -> 
    !/[^0-9]/.test(@s)

  isUpper: ->
    !/[^A-Z]/.test(@s)

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

  rtrim: ->
    s = @s.replace(/\s+$/, '')
    new S(s)

  startsWith: (prefix) ->
    @s.lastIndexOf(prefix, 0) is 0 #Google says this is the fastest

  times: (n) ->
    new S(new Array(n+1).join(@s))

  trim: ->
    if typeof String::trim is 'undefined'
      s = @s.replace(/(^\s*|\s*$)/g, '')
    else
      s = @s.trim()
    new S(s)

  toString: ->
    @s

  underscore: -> #modified from https://github.com/epeli/underscore.string
    s = @.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase()
    if (new S(@s.charAt(0))).isUpper() then s = '_' + s
    new S(s)
  

  #aliases
  repeat: S::.times
  include: S::.contains



wrap = (str) ->
  new S(str)

methodsAdded = []
clobberPrototype = ->
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
  window.S.clobberPrototype = clobberPrototype
  window.S.restorePrototype = restorePrototype
else
  module.exports = wrap
  module.exports.clobberPrototype = clobberPrototype
  module.exports.restorePrototype = restorePrototype

