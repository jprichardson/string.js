[string.js](http://stringjs.com)
=========

`string.js`, or simply `S` is a lightweight (< 2k Gzipped) JavaScript library for the browser or for Node.js that provides extra String methods. Originally, it modified the String prototype. But I quickly learned that in JavaScript, this is considered poor practice.



Motivation
----------

Personally, I prefer the cleanliness of the way code looks when it appears to be native methods. i.e. when you modify native Javascript prototypes. However, if any app dependency required `string.js`, then the app's string prototype in every module would be modified as well. This could be troublesome. So I settled on creating a wrapper a la jQuery style. For those of you prototype hatin' fools, such as myself, there is the method `clobberPrototype()`.

Here's a list of alternative frameworks:

* [Prototype Framework's String library](http://prototypejs.org/api/string)
* [Uize.String](http://www.uize.com/reference/Uize.String.html)
* [Google Closure's String](http://closure-library.googlecode.com/svn/docs/namespace_goog_string.html)
* [Underscore.string](http://epeli.github.com/underscore.string/)
* [Sugar.js](http://sugarjs.com)
* [php.js](http://phpjs.org/pages/home)

Why wasn't I happy with any of them? They are all static methods that don't seem to support chaining in a clean way 'OR' they have an odd dependency. Sugar is the notable exception.



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

### Browsers

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

Still like the clean look of calling these methods directly on native Strings? No problem. Call `clobberPrototype()`. Make sure to not call this at the module level, at it'll effect the entire application lifecycle. You should really only use this at the method level. The one exception being if your application will not be a dependency of another application.

```javascript
S.clobberPrototype();
var name = 'Your name is JP'.right(2); //'JP'
S.restorePrototype(); //be a good citizen and clean up
```


Methods
-------

See [test file][1] for more details. 

I use the same nomenclature as Objective-C regarding methods. **+** means `static` or `class` method. **-** means `non-static` or `instance` method. 


### - camelize()

Remove any underscores or dashes and convert a string into camel casing.

Example:

```javascript
S('data_rate').camelize().s; //'dataRate'
S('background-color').camelize().s; //'backgroundColor'
S('-moz-something').camelize().s; //'mozSomething'
S('_car_speed_').camelize().s; //'carSpeed'
S('yes_we_can').camelize().s; //'yesWeCan'
```


### - capitalize() ###

Capitalizes the first character of a string.

Example:

```javascript
S('jon').capitalize().s; //'Jon'
S('JP').capitalize().s; //'Jp'
```


### + clobberPrototype() ###

Modifies `String.prototype` to have all of the methods found in string.js.

Example:

```javascript
S.clobberPrototype();
```


### - collapseWhitespace() ###

Converts all adjacent whitespace characters to a single space.

Example:

```javascript
var str = S('  String   \t libraries are   \n\n\t fun\n!  ').collapseWhitespace().s; //'String libraries are fun !'
```


### - contains(ss) ###

Returns true if the string contains `ss`.

Alias: `include()`

Example:

```javascript
S('JavaScript is one of the best languages!').contains('one'); //true
```


### - dasherize() ###

Returns a converted camel cased string into a string delimited by dashes.

Examples:

```javascript
S('dataRate').dasherize().s; //'data-rate'
S('CarSpeed').dasherize().s; //'-car-speed'
S('yesWeCan').dasherize().s; //'yes-we-can'
S('backgroundColor').dasherize().s; //'background-color'
```


### - decodeHtmlEntities() ###

Decodes HTML entities into their string representation.

```javascript
S('Ken Thompson &amp; Dennis Ritchie').decodeHtmlEntities().s; //'Ken Thompson & Dennis Ritchie'
S('3 &lt; 4').decodeHtmlEntities().s; //'3 < 4'
```


### - endsWith(ss) ###

Returns true if the string ends with `ss`.

Example:

```javascript
S("hello jon").endsWith('jon'); //true
```


### - include(ss) ###

Returns true if the string contains the `ss`.

Alias: `contains()`

Example:

```javascript
S('JavaScript is one of the best languages!').include('one'); //true
```


### - isAlpha() ###

Return true if the string contains only letters.

Example:

```javascript
S("afaf").isAlpha(); //true
S('fdafaf3').isAlpha(); //false
S('dfdf--dfd').isAlpha(); //false
```


### - isAlphaNumeric() ###

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


### - isEmpty() ###

Return true if the string is solely composed of whitespace or is `null`/`undefined`.

Example:

```javascript
S(' ').isEmpty(); //true
S('\t\t\t    ').isEmpty(); //true
S('\n\n ').isEmpty(); //true
S('helo').isEmpty(); //false
S(null).isEmpty(); //true
S(undefined).isEmpty(); //true
```


### - isLower() ###

Return true if the character or string is lowercase

Example:

```javascript      
S('a').isLower(); //true
S('z').isLower(); //true
S('B').isLower(); //false
S('hijp').isLower(); //true
S('hi jp').isLower(); //false
S('HelLO').isLower(); //false
```


### - isNumeric() ###

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
S("000992424242").isNumeric(); //true
```


### - isUpper() ###

Returns true if the character or string is uppercase

Example:

```javascript
S('a').isUpper() //false
S('z').isUpper()  //false
S('B').isUpper() //true
S('HIJP').isUpper() //true
S('HI JP').isUpper() //false
S('HelLO').isUpper() //true
```


### - ltrim() ###

Return the string with leading and whitespace removed

Example:

```javascript
S('  How are you?').ltrim().s; //'How are you?'; 
```


### - left(n) ###

Return the substring denoted by `n` positive left-most characters.

Example:

```javascript
S('My name is JP').left(2).s; //'My'
S('Hi').left(0).s; //''
S('My name is JP').left(-2).s; //'JP', same as right(2)
```


### - repeat(n) ###

Returns a string repeated `n` times.

Alias: `times()`

Example:

```javascript
S(' ').repeat(5).s; //'     '
S('*').repeat(3).s; //'***'
```


### - replaceAll(ss, newstr) ###

Return the new string with all occurrences of `ss` replaced with `newstr`.

Example:

```javascript
S(' does IT work? ').replaceAll(' ', '_').s; //'_does_IT_work?_'
S('Yes it does!').replaceAll(' ', '').s; //'Yesitdoes!'
```


### + restorePrototype() ###

Restore the original String prototype. Typically used in conjunction with `clobberPrototype()`.

Example:

```javascript
S.restorePrototype();
```


### - right(n) ###

Return the substring denoted by `n` positive right-most characters.

Example:

```javascript
S('I AM CRAZY').right(2).s; //'ZY'
S('Does it work?  ').right(4).s; //'k?  '
S('Hi').right(0).s; //''
S('My name is JP').right(-2).s; //'My', same as left(2)
```


### - rtrim() ###

Return the string with trailing whitespace removed.

Example:

```javascript
S('How are you?   ').rtrim().s; //'How are you?'; 
```


### - s ###

Alias: `toString()`

The encapsulated native string representation of an `S` object. 

Example:

```javascript
S('my name is JP.').capitalize().s; //My name is JP.
var a = "Hello " + S('joe!'); //a = "Hello joe!"
S("Hello").toString() === S("Hello").s; //true
```


### - startsWith(prefix)   ###

Return true if the string starts with `prefix`.

Example:

```javascript
S("JP is a software engineer").startsWith("JP"); //true
S('wants to change the world').startsWith("politicians"); //false
```


### - times(n) ###

Returns a string repeated `n` times.

Alias: `repeat()`

Example:

```javascript
S(' ').times(5).s //'     '
S('*').times(3).s //'***'
```


### - trim() ###

Return the string with leading and trailing whitespace removed. Reverts to native `trim()` if it exists.

Example:

```javascript
S('hello ').trim().s; //'hello'
S(' hello ').trim().s; //'hello'
S('\nhello').trim().s; //'hello'
S('\nhello\r\n').trim().s; //'hello'
S('\thello\t').trim().s; //'hello'
```


### - toString() ###

Alias: `s`

Return the string representation of an `S` object. Not really necessary to use. However, JS engines will look at an object and display its `toString()` result.

Example:

```javascript
S('my name is JP.').capitalize().toString(); //My name is JP.
var a = "Hello " + S('joe!'); //a = "Hello joe!"
S("Hello").toString() === S("Hello").s; //true
```


### - underscore()

Returns converted camel cased string into a string delimited by underscores.

Example:

```javascript
S('dataRate').underscore().s; //'data_rate'
S('CarSpeed').underscore().s; //'_car_speed'
S('yesWeCan').underscore().s; //'yes_we_can'
```



I will definitely add more methods, I'll be adding them on as-needed basis.



Quirks
------

`decodeHtmlEntities()` converts `&nbsp;` to **0xa0** (160) and not **0x10** (20). Most browsers consider 0xa0 to be whitespace characters, Internet Explorer does not despite it being part of the ECMA standard. Google Closure does a good job of normalizing this behavior. This may need to fixed in `string.js` at some point in time.



Testing
-------

### Node.js

Install the dev dependencies:

    $ npm install string --development

Then navigate to the installed directory:

    $ cd node_modules/string/

Run test package:

    $ mocha test



### Browser ###

[Click here to run the tests in your web browser.](http://stringjs.com/browser.test.html)



Credits
-------

I have looked at the code by the creators in the libraries mentioned in **Motivation**. As noted in the source code, I've specifically used code from Google Closure (Google Inc), Underscore String [Esa-Matti Suuronen](http://esa-matti.suuronen.org/), and php.js (http://phpjs.org/authors/index).  



License
-------

Licensed under MIT.

Copyright (C) 2012 JP Richardson <jprichardson@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.




[1]: https://github.com/jprichardson/string.js/blob/master/test/string.test.coffee


