(function() {
  var S, clobberPrototype, methodsAdded, restorePrototype, wrap;

  S = (function() {

    function S(s) {
      this.s = s;
      if (this.s == null) this.s = this;
    }

    S.prototype.camelize = function() {
      var s;
      s = this.trim().s.replace(/(\-|_|\s)+(.)?/g, function(match, sep, c) {
        return (c ? c.toUpperCase() : '');
      });
      return new S(s);
    };

    S.prototype.capitalize = function() {
      return new S(this.s..toLowerCase().replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();}));
    };

    S.prototype.collapseWhitespace = function() {
      var s;
      s = this.s.replace(/[\s\xa0]+/g, ' ').replace(/^\s+|\s+$/g, '');
      return new S(s);
    };

    S.prototype.contains = function(ss) {
      return this.s.indexOf(ss) >= 0;
    };

    S.prototype.dasherize = function() {
      var s;
      s = this.trim().s.replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
      return new S(s);
    };

    S.prototype.decodeHtmlEntities = function(quote_style) {
      var entity, hash_map, symbol, tmp_str;
      hash_map = {};
      symbol = entity = "";
      tmp_str = this.s;
      if (false === (hash_map = get_html_translation_table("HTML_ENTITIES", quote_style))) {
        return false;
      }
      delete hash_map["&"];
      hash_map["&"] = "&amp;";
      for (symbol in hash_map) {
        entity = hash_map[symbol];
        tmp_str = tmp_str.split(entity).join(symbol);
      }
      tmp_str = tmp_str.split("&#039;").join("'");
      return new S(tmp_str);
    };

    S.prototype.endsWith = function(suffix) {
      var l;
      l = this.s.length - suffix.length;
      return l >= 0 && this.s.indexOf(suffix, l) === l;
    };

    S.prototype.isAlpha = function() {
      return !/[^a-zA-Z]/.test(this.s);
    };

    S.prototype.isAlphaNumeric = function() {
      return !/[^a-zA-Z0-9]/.test(this.s);
    };

    S.prototype.isEmpty = function() {
      return /^[\s\xa0]*$/.test(this.s);
    };

    S.prototype.isLower = function() {
      return !/[^a-z]/.test(this.s);
    };

    S.prototype.isNumeric = function() {
      return !/[^0-9]/.test(this.s);
    };

    S.prototype.isUpper = function() {
      return !/[^A-Z]/.test(this.s);
    };

    S.prototype.left = function(N) {
      var s;
      if (N >= 2) {
        s = this.s.substr(0, N);
        return new S(s);
      } else {
        return this.right(-N);
      }
    };

    S.prototype.ltrim = function() {
      var s;
      s = this.s.replace(/(^\s*)/g, '');
      return new S(s);
    };

    S.prototype.replaceAll = function(ss, r) {
      var s;
      s = this.s.replace(new RegExp(ss, 'g'), r);
      return new S(s);
    };

    S.prototype.right = function(N) {
      var s;
      if (N >= 0) {
        s = this.s.substr(this.s.length - N, N);
        return new S(s);
      } else {
        return this.left(-N);
      }
    };

    S.prototype.rtrim = function() {
      var s;
      s = this.s.replace(/\s+$/, '');
      return new S(s);
    };

    S.prototype.startsWith = function(prefix) {
      return this.s.lastIndexOf(prefix, 0) === 0;
    };

    S.prototype.times = function(n) {
      return new S(new Array(n + 1).join(this.s));
    };

    S.prototype.trim = function() {
      var s;
      if (typeof String.prototype.trim === 'undefined') {
        s = this.s.replace(/(^\s*|\s*$)/g, '');
      } else {
        s = this.s.trim();
      }
      return new S(s);
    };

    S.prototype.toString = function() {
      return this.s;
    };

    S.prototype.underscore = function() {
      var s;
      s = this.trim().s.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
      if ((new S(this.s.charAt(0))).isUpper()) s = '_' + s;
      return new S(s);
    };

    S.prototype.repeat = S.prototype.times;

    S.prototype.include = S.prototype.contains;

    return S;

  })();

  wrap = function(str) {
    return new S(str);
  };

  methodsAdded = [];

  clobberPrototype = function() {
    var func, name, newS, _results;
    newS = new S();
    _results = [];
    for (name in newS) {
      func = newS[name];
      if (!String.prototype.hasOwnProperty(name)) {
        methodsAdded.push(name);
        _results.push(String.prototype[name] = function() {
          String.prototype.s = this;
          return func.apply(this, arguments);
        });
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  };

  restorePrototype = function() {
    var name, _i, _len;
    for (_i = 0, _len = methodsAdded.length; _i < _len; _i++) {
      name = methodsAdded[_i];
      delete String.prototype[name];
    }
    return methodsAdded.length = 0;
  };

  if (typeof window !== "undefined" && window !== null) {
    window.S = wrap;
    window.S.clobberPrototype = clobberPrototype;
    window.S.restorePrototype = restorePrototype;
  } else {
    module.exports = wrap;
    module.exports.clobberPrototype = clobberPrototype;
    module.exports.restorePrototype = restorePrototype;
  }

  
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
;

}).call(this);
