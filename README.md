# string.js

This module modifies the String prototype. Yes, it modifies the prototype, get over it.


## Installation

	npm install string


Make sure that you run the test script to verify that it works on your system.

	make test


## Usage

```coffeescript
require('string')
```

### Methods

See [test file][1] for more details.

```coffeescript
includes(needle) or contains(needle) #true if string contains needle
endsWith(suffix) #true if string ends with suffix
startsWith(prefix) #true if string starts with prefix

isAlpha() #true if string is only letters
isDigit() #true if the string only contains digits
isNumber() #true if the string can be converted to a valid Number object
isAlphaDigit() #true if the string only contains letters or numbers

```

## License

(The Apache License)

Some methods as noted, are from Google.

(The MIT License)

Copyright (c) 2012 JP Richardson

[1]: https://github.com/jprichardson/string.js/blob/master/test/string.test.coffee


