# string.js

This module modifies the String prototype. Yes, it modifies the prototype, get over it.


## Installation

	npm install string


Make sure that you run the test script to verify that it works on your system.

	make test


## Usage 

### Node.js

```coffeescript
require('string')
```

### Browsers (IE/Chrome/Safari/Firefox)

```html
<!-- HTML5 -->
<script src="https://raw.github.com/jprichardson/string.js/master/string.min.js"></script>

<!-- Note that in the mime type for Javascript is now officially 'application/javascript'. If you
set the type to application/javascript in IE browsers, your Javscript will fail. Just don't set a 
type via the script tag and set the mime type from your server. Most browsers look at the server mime
type anyway -->

<!-- For HTML4/IE -->
<script type="text/javascript" src="https://raw.github.com/jprichardson/string.js/master/string.min.js"></script>
```

### Methods

See [test file][1] for more details.

```coffeescript
#searching
includes(needle) or contains(needle) #true if string contains needle
endsWith(suffix) #true if string ends with suffix
startsWith(prefix) #true if string starts with prefix

#types
isAlpha() #true if string is only letters
isDigit() #true if the string only contains digits
isNumber() #true if the string can be converted to a valid Number object
isAlphaDigit() #true if the string only contains letters or numbers

#cleansing
trim() #removes trailing or leading whitespace, only necessary for IE
```

## License

(The Apache License)

Some methods as noted, are from Google.

(The MIT License)

Copyright (c) 2012 JP Richardson

[1]: https://github.com/jprichardson/string.js/blob/master/test/string.test.coffee


