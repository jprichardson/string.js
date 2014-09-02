2.0.0 / 2014-09-02
------------------
- bugfix `isAlpha()` for empty strings [#107](https://github.com/jprichardson/string.js/pull/107)
- added .npmignore. Closes #71
- `slugify()` behavior changed, added method `latinise()`. [#112](https://github.com/jprichardson/string.js/pull/112)

1.9.1  / 2014-08-05
-------------------
* bugfix `parseCSV()` [Sergio-Muriel / #97](https://github.com/jprichardson/string.js/pull/97)
* bugfix `wrapHTML()` [Sergio-Muriel / #100](https://github.com/jprichardson/string.js/pull/100)
* optimize `isAlpha()` and `isAlphaNumeric()` [Sergio-Muriel / #101](https://github.com/jprichardson/string.js/pull/101)

1.9.0 / 2014-06-23
------------------
* added `wrapHTML()` method, (#90) 

1.8.1 / 2014-04-23
------------------
* bugfix: `toBoolean()`/`toBool()` treat `1` as `true`. (arowla / #78)

1.8.0 / 2014-01-13
------------------
* Changed behavior of 'between()'. Closes #62

1.7.0 / 2013-11-19
------------------
* `padLeft`, `padRight`, and `pad` support numbers as input now (nfriedly / #70)

1.6.1 / 2013-11-07
------------------
* fixes to `template()` (jprincipe / #69)
* added stringjs-rails to docs. Closes #48
* added Bower support. Closes #61

1.6.0 / 2013-09-16
------------------
* modified string.js to make it more extensible (jeffgran / [#57][57])
* fix browser tests, closes #45, #56

1.5.1 / 2013-08-20
------------------
* Fixes bug in `template()` for falsey values. Closes #29
* added Makefile

1.5.0 / 2013-07-11
------------------
* added correct `lines()` implementation. (daxxog/#47) Closes #52

1.4.0 / 2013-
------------------
* updated homepage in `package.json`
* The configurable option "Escape character" is documented as "escape" but was implemented as "escapeChar" (Reggino #44)
* removed `lines()`, better to not have it, then to do it incorrectly (#40)
* added `humanize()` method, (#34)
* added `count()` method, (#41) 

1.3.1 / 2013-04-03
------------------
* fixed CSV / undefined (Reggino / #37)
* fixed CSV parsing bug with escape. See #32, #35, #37 (Reggino / #37)
* added multi-line CSV parse (Reggino / #37)

1.3.0 / 2013-03-18
------------------
* Added methods `between()`, `chompLeft()`, `chompRight()`, `ensureLeft()`, `ensureRight()`. (mgutz / #31)
* Removed support for Node v0.6. Added support for v0.10
* Modified `parseCSV` to allow for escape input. (seanodell #32)
* Allow `toCSV()` to have `null`.
* Fix `decodeHTMLEntities()` bug. #30

1.2.1 / 2013-02-09
------------------
* Fixed truncate bug. #27
* Added `template()`.

1.2.0 / 2013-01-15
------------------
* Added AMD support.
* Fixed replaceAll bug. #21
* Changed `slugify` behavior. #17
* Renamed `decodeHtmlEntities` to `decodeHTMLEntities` for consistency. `decodeHtmlEntities` is deprecated. #23
 

1.1.0 / 2012-10-08
------------------
* Added `toBoolean()` and `toBool()` method.
* Added `stripPunctuation()` method.
* Renamed `clobberPrototype()` to `extendPrototype()`.
* Added `padLeft()`, `padRight()`, and `pad()`.


1.0.0 / 2012-09-25
------------------
* Translated from CoffeeScript to JavaScript.
* Added native JavaScript string functions such as `substr()`, `substring()`, `match()`, `indexOf()`, etc.
* Added `length` property.
* Renamed `ltrim()` to `trimLeft()` and `rtrim()` to `trimRight()`.
* Added `valueOf()` method.
* Added `toInt()`\`toInteger()` and `toFloat()` methods.
* Modified behavior of `isEmpty()` to return true on `undefined` or `null`.
* Constructor will now cast the parameter to a string via its `toString()` method.
* Added `VERSION` value. Useful for browser dependency checking.
* Added `lines()` method.
* Added `slugify()` method. 
* Added `escapeHTML()` and `unescapeHTML()` methods.
* Added `truncate()` method.
* Added `stripTags()` method.
* Added `toCSV()` and `parseCSV()` methods.

0.2.2 / 2012-09-20
------------------
* Fixed bug in `left()` closes #6
* Upgraded to CoffeeScript 1.3.*. Last CoffeeScript release of `string.js`.

0.2.1 / 2012-03-09
------------------
* Updated README to include Quirks/Credits.
* Added method `decodeHtmlEntities()`.

0.2.0 / 2012-03-02
------------------
* Fixed method type `cloberPrototype()` to `clobberPrototype()`.
* Fixed Node.js testing bug that caused `T` and `F` to be undefined functions.
* Moved browser tests to its own directory.
* Updated README.
* Added `captialize()`.
* Added `repeat()`/`times()`.
* Added `isUpper()`/`isLower()`.
* Added `dasherize()`, `camelize()`, and `underscore()`.

0.1.2 / 2012-02-27
------------------
* Package.json updates.

0.1.1 / 2012-02-27
------------------
* Package.json updates.

0.1.0 / 2012-02-27
------------------
* Added a few more methods.
* Removed default behavior of modifying `String.prototype`
* Updated README to be a bit more detailed.
* Ditched Makefiles for Cakefiles.

0.0.4 / 2012-01-27
----------------------
* Added trim() method for IE browsers
* Moved string.coffee to lib/string.coffee
* Now included a minified `string.js` named `string.min.js`
* Updated README that now includes Browser usage instructions.

0.0.3 / 2012-01-20
------------------
* Cleaned package.json file
* Removed development dependency on CoffeeScript and Jasmine
* Changed testing from Jasmine to Mocha
* Added `includes` and `contains` methods

[57]: https://github.com/jprichardson/string.js/pull/57
