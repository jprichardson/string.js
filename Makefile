
#requires uglifyjs v1: npm install -g uglify-js@v1.x
min:  
	cat lib/string.js | uglifyjs > lib/string.min.js

size:
	cat lib/string.min.js | gzip | wc -c

clean:
	rm -f lib/string.min.js

.PHONY: min size clean