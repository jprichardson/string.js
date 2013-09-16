#!/usr/bin/env bash

rm -f mocha.js
rm -f string.js
rm -f string.test.js

wget https://raw.github.com/visionmedia/mocha/master/mocha.js
wget https://raw.github.com/jprichardson/string.js/master/lib/string.js
wget https://raw.github.com/jprichardson/string.js/master/test/string.test.js