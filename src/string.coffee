
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

  decodeHtmlEntities: (quote_style) -> #modified from php.js
    hash_map = {}
    symbol = entity = ""
    tmp_str = @s
    return false  if false is (hash_map = get_html_translation_table("HTML_ENTITIES", quote_style))
    delete (hash_map["&"])

    hash_map["&"] = "&amp;"
    for symbol of hash_map
      entity = hash_map[symbol]
      tmp_str = tmp_str.split(entity).join(symbol)
    tmp_str = tmp_str.split("&#039;").join("'")
    new S(tmp_str)

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

#eewwwww... i like to minimize line count. TODO: convert to CoffeeScript.
# from php.js
`
function get_html_translation_table (table, quote_style) {
    var entities = {},
        hash_map = {},
        decimal;
    var constMappingTable = {},
        constMappingQuoteStyle = {};
    var useTable = {},
        useQuoteStyle = {};

    // Translate arguments
    constMappingTable[0] = 'HTML_SPECIALCHARS';
    constMappingTable[1] = 'HTML_ENTITIES';
    constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
    constMappingQuoteStyle[2] = 'ENT_COMPAT';
    constMappingQuoteStyle[3] = 'ENT_QUOTES';

    useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
    useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() : 'ENT_COMPAT';

    if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
        throw new Error("Table: " + useTable + ' not supported');
        // return false;
    }

    entities['38'] = '&amp;';
    if (useTable === 'HTML_ENTITIES') {
        entities['160'] = '&nbsp;';
        entities['161'] = '&iexcl;';
        entities['162'] = '&cent;';
        entities['163'] = '&pound;';
        entities['164'] = '&curren;';
        entities['165'] = '&yen;';
        entities['166'] = '&brvbar;';
        entities['167'] = '&sect;';
        entities['168'] = '&uml;';
        entities['169'] = '&copy;';
        entities['170'] = '&ordf;';
        entities['171'] = '&laquo;';
        entities['172'] = '&not;';
        entities['173'] = '&shy;';
        entities['174'] = '&reg;';
        entities['175'] = '&macr;';
        entities['176'] = '&deg;';
        entities['177'] = '&plusmn;';
        entities['178'] = '&sup2;';
        entities['179'] = '&sup3;';
        entities['180'] = '&acute;';
        entities['181'] = '&micro;';
        entities['182'] = '&para;';
        entities['183'] = '&middot;';
        entities['184'] = '&cedil;';
        entities['185'] = '&sup1;';
        entities['186'] = '&ordm;';
        entities['187'] = '&raquo;';
        entities['188'] = '&frac14;';
        entities['189'] = '&frac12;';
        entities['190'] = '&frac34;';
        entities['191'] = '&iquest;';
        entities['192'] = '&Agrave;';
        entities['193'] = '&Aacute;';
        entities['194'] = '&Acirc;';
        entities['195'] = '&Atilde;';
        entities['196'] = '&Auml;';
        entities['197'] = '&Aring;';
        entities['198'] = '&AElig;';
        entities['199'] = '&Ccedil;';
        entities['200'] = '&Egrave;';
        entities['201'] = '&Eacute;';
        entities['202'] = '&Ecirc;';
        entities['203'] = '&Euml;';
        entities['204'] = '&Igrave;';
        entities['205'] = '&Iacute;';
        entities['206'] = '&Icirc;';
        entities['207'] = '&Iuml;';
        entities['208'] = '&ETH;';
        entities['209'] = '&Ntilde;';
        entities['210'] = '&Ograve;';
        entities['211'] = '&Oacute;';
        entities['212'] = '&Ocirc;';
        entities['213'] = '&Otilde;';
        entities['214'] = '&Ouml;';
        entities['215'] = '&times;';
        entities['216'] = '&Oslash;';
        entities['217'] = '&Ugrave;';
        entities['218'] = '&Uacute;';
        entities['219'] = '&Ucirc;';
        entities['220'] = '&Uuml;';
        entities['221'] = '&Yacute;';
        entities['222'] = '&THORN;';
        entities['223'] = '&szlig;';
        entities['224'] = '&agrave;';
        entities['225'] = '&aacute;';
        entities['226'] = '&acirc;';
        entities['227'] = '&atilde;';
        entities['228'] = '&auml;';
        entities['229'] = '&aring;';
        entities['230'] = '&aelig;';
        entities['231'] = '&ccedil;';
        entities['232'] = '&egrave;';
        entities['233'] = '&eacute;';
        entities['234'] = '&ecirc;';
        entities['235'] = '&euml;';
        entities['236'] = '&igrave;';
        entities['237'] = '&iacute;';
        entities['238'] = '&icirc;';
        entities['239'] = '&iuml;';
        entities['240'] = '&eth;';
        entities['241'] = '&ntilde;';
        entities['242'] = '&ograve;';
        entities['243'] = '&oacute;';
        entities['244'] = '&ocirc;';
        entities['245'] = '&otilde;';
        entities['246'] = '&ouml;';
        entities['247'] = '&divide;';
        entities['248'] = '&oslash;';
        entities['249'] = '&ugrave;';
        entities['250'] = '&uacute;';
        entities['251'] = '&ucirc;';
        entities['252'] = '&uuml;';
        entities['253'] = '&yacute;';
        entities['254'] = '&thorn;';
        entities['255'] = '&yuml;';
    }

    if (useQuoteStyle !== 'ENT_NOQUOTES') {
        entities['34'] = '&quot;';
    }
    if (useQuoteStyle === 'ENT_QUOTES') {
        entities['39'] = '&#39;';
    }
    entities['60'] = '&lt;';
    entities['62'] = '&gt;';


    // ascii decimals to real symbols
    for (decimal in entities) {
        if (entities.hasOwnProperty(decimal)) {
            hash_map[String.fromCharCode(decimal)] = entities[decimal];
        }
    }

    return hash_map;
}
`

