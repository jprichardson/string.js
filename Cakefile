{spawn} = require('child_process')
fs = require('fs')
path = require('path')
testutil = require('testutil')
growl = require('growl')

task 'build', 'build lib/ from src/', ->
  coffee = spawn 'coffee', ['-c', '-o', 'lib', 'src']
  coffee.stderr.on 'data', (data) -> process.stderr.write data.toString()
  coffee.stdout.on 'data', (data) -> process.stdout.write data.toString()
  coffee.on 'exit', (code) ->
    if code is 0 
      console.log 'Successfully built.'
    else
      console.log "Error building. Code: #{code}"

task 'test', 'test project', (options) ->
  process.env['NODE_ENV'] = 'testing'
  testutil.fetchTestFiles './test', (files) ->
    files.unshift '--colors'
    mocha = spawn 'mocha', files#, customFds: [0..2]
    mocha.stdout.pipe(process.stdout, end: false);
    mocha.stderr.pipe(process.stderr, end: false);

 task 'watch', 'Watch src/ for changes', ->
    browserTestFile = path.join(process.cwd(), 'test_browser', 'string.test.js')

    coffee = spawn 'coffee', ['-w', '-c', '-o', 'lib', 'src']
    coffee.stderr.on 'data', (data) -> 'ERR: ' + process.stderr.write data.toString()
    coffee.stdout.on 'data', (data) ->
      d = data.toString()
      if d.indexOf('compiled') > 0
        #invoke 'test'
        
        fsw = fs.createWriteStream(browserTestFile, flags: 'w', encoding: 'utf8', mode: 0666)
        coffee_test = spawn 'coffee', ['-c', '-p', 'test/string.test.coffee']
        coffee_test.stdout.pipe(fsw, end: false)

        uglify = spawn 'uglifyjs', ['lib/string.js']
        uglify.stdout.pipe(fs.createWriteStream('lib/string.min.js'))
      
      else
        growl(d, title: 'Error', image: './resources/error.png')
        
      process.stdout.write data.toString()
  