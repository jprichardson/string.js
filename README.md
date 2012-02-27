[string.js](http://stringjs.com)
=========

`string.js`, simply `S` is a lightweight (< 2k Gzipped) JavaScript library for the browser or for Node.js that provides extra String methods. Originally, it would modify your String prototype. But I quickly learned that in JavaScript this is considered bad practice.



Motivation
----------

Personally, I prefer the cleanliness of the way code looks when you modify native Javascript prototypes. However, if any app dependency required `string.js` then the app's string prototype would modified as well. This could be troublesome.

Here's a list of alternative frameworks:

* [Prototype Framework's String library](http://prototypejs.org/api/string)
* [Uize.String](http://www.uize.com/reference/Uize.String.html)
* [Google Closure's String](http://closure-library.googlecode.com/svn/docs/namespace_goog_string.html)
* [Underscore.string](http://epeli.github.com/underscore.string/)

Why wasn't I happy with any of them? They are all static methods that don't seem to support chaining in a clean way. 



Installation
------------

	npm install --production string




Usage 
-----

### Node.js

```javascript
var S = require('string');
```

Originally, I was using `$s` but glancing over the code, it was easy to confuse `$s` for string.js with `$` for jQuery. Feel free to use the most convenient variable for you.

### Browsers (IE/Chrome/Safari/Firefox)

```html
<!-- HTML5 -->
<script src="https://raw.github.com/jprichardson/string.js/master/lib/string.min.js"></script>

<!-- Note that in the mime type for Javascript is now officially 'application/javascript'. If you
set the type to application/javascript in IE browsers, your Javscript will fail. Just don't set a 
type via the script tag and set the mime type from your server. Most browsers look at the server mime
type anyway -->

<!-- For HTML4/IE -->
<script type="text/javascript" src="https://raw.github.com/jprichardson/lib/string.js/master/string.min.js"></script>
```

A global variable `window.S` or simply `S` is created.

### Both

```javascript
var doesIt = S('my cool string').left(2).endsWith('y'); //true
```

Access the wrapped string using `s` variable or `toString()`

```javascript
var name = S('Your name is JP').right(2).s; //'JP'
```

is the same as…

```javascript
var name = S('Your name is JP').right(2).toString(); //'JP'
```

Still like the clean look of calling these methods directly on native Strings? No problem. Call `cloberPrototype()`. Make sure to not call this at the module level, at it'll effect the entire application lifecycle. You should really only use this at the method level. The one exception being if your application will not be a dependency of another application.

```javascript
S.cloberPrototype();
var name = 'Your name is JP'.right(2); //'JP'
S.restorePrototype(); //be a good citizen and clean up
```


Methods
-------

See [test file][1] for more details. 

I use the same nomenclature as Objective-C regarding methods. **+** means `static` or `class` method. **-** means `non-static` or `instance` method. 


### + cloberPrototype()
Modifies `String.prototype` to have all of the methods found in string.js.

Example:

```javascript
S.cloberPrototype();
```


### - collapseWhitespace()

Converts all adjacent whitespace characters to a single space.

Example:

```javascript
var str = S('  String   \t libraries are   \n\n\t fun\n!  ').collapseWhitespace().s; //'String libraries are fun !'
```


### - contains(substring) Aliases: include/includes

Returns true if the string contains the substring.

Example:

```javascript
S('JavaScript is one of the best languages!').contains('one'); //true
```


### - endsWith(substring)

Returns true if the string ends with the substring.

Example:

```javascript
S("hello jon").endsWith('jon'); //true
```


### - isAlpha()

Return true if the string contains only letters.

Example:

```javascript
S("afaf").isAlpha(); //true
S('fdafaf3').isAlpha(); //false
S('dfdf--dfd').isAlpha(); //false
```


### - isAlphaNumeric()

Return true if the string contains only letters and numbers

Example:

```javascript
S("afaf35353afaf").isAlphaNumeric(); //true
S("FFFF99fff").isAlphaNumeric(); //true
S("99").isAlphaNumeric(); //true
S("afff").isAlphaNumeric(); //true
S("Infinity").isAlphaNumeric(); //true
S("-Infinity").isAlphaNumeric(); //false
S("-33").isAlphaNumeric(); //false
S("aaff..").isAlphaNumeric(); //false
```


### - isEmpty()

Return true if the string is solely composed of whitespace

Example:

```javascript
S(' ').isEmpty(); //true
S('\t\t\t    ').isEmpty(); //true
S('\n\n ').isEmpty(); //true
```


### - isNumeric()

Return true if the string only contains digits

Example:

```javascript
S("3").isNumeric(); //true
S("34.22").isNumeric(); //false
S("-22.33").isNumeric(); //false
S("NaN").isNumeric(); //false
S("Infinity").isNumeric(); //false
S("-Infinity").isNumeric(); //false
S("JP").isNumeric(); //false
S("-5").isNumeric(); //false
S("000992424242").isNumeric(); //false
```


### - ltrim()

Return the string with leading and trailing whitespace removed

Example:

```javascript
S('  How are you?').ltrim().s; //'How are you?'; 
```


### - left(N)

Return the substring denoted by N positive left-most characters.

Example:

```javascript
S('My name is JP').left(2).s; //'My'
S('Hi').left(0).s; //''
S('My name is JP').left(-2).s; //'JP', same as right(2)
```


### - replaceAll(substring, replacement)

Return the new string with all occurrences of substring replaced with the replacement string

Example:

```javascript
S(' does IT work? ').replaceAll(' ', '_').s; //'_does_IT_work?_'
S('Yes it does!').replaceAll(' ', '').s; //'Yesitdoes!'
```


### + restorePrototype()

Restore the original String prototype.

Example:

```javascript
S.restorePrototype();
```


### - right(N)

Return the substring denoted by N positive right-most characters

Example:

```javascript
S('I AM CRAZY').right(2).s; //'ZY'
S('Does it work?  ').right(4).s; //'k?  '
S('Hi').right(0).s; //''
S('My name is JP').right(-2).s; //'My', same as left(2)
```


### - startsWith(prefix)

Return true if the string starts with the input string

Example:

```javascript
S("JP is a software engineer").startsWith("JP"); //true
S('wants to change the world').startsWith("politicians"); //false
```

### - trim()

Return the string with leading and trailing whitespace removed. Reverts to native `trim()` if it exists.

Example:

```javascript
S('hello ').trim().s; //'hello'
S(' hello ').trim().s; //'hello'
S('\nhello').trim().s; //'hello'
S('\nhello\r\n').trim().s; //'hello'
S('\thello\t').trim().s; //'hello'
```

I will definitely add more methods, I'll be adding them on as-needed basis.



Testing
-------

### Node.js

Install the dev dependencies:

    $ npm install string

Then navigate to the installed directory:

    $ cd node_modules/string/

Run test package:

    $ cake test



### Browser

[Click Here](browser.test.html)




License
-------

Triple licensed under MIT/X11, Apache v2, and LGPL. If you use this, pick which one works for you and your software. Attribution is always nice.

As noted, some of these methods were plucked from Google.

Copyright (c) 2012 JP Richardson

[1]: https://github.com/jprichardson/string.js/blob/master/test/string.test.coffee


