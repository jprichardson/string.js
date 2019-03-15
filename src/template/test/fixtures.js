const { TestFixtures } = require('../../../test/helpers.js');

const data = {greet: 'Hello', name: 'JP', 'date-year': 2013};

const fixtures = new TestFixtures();

fixtures
  .it('should still replace with an empty value')
  .withValue('Hello {{name}}')
  .withArgs({name: ''})
  .expect('Hello ')

  .it('should still replace when a key does not exist')
  .withValue('Hello {{name}}')
  .withArgs({})
  .expect('Hello ')

  .it('should return the string replaced with template values')
  .withValue('Hello {{name}}! How are you doing during the year of {{date-year}}?')
  .withArgs(data)
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values, regardless of spacing')
  .withValue('{{greet }} {{ name}}! How are you doing during the year of {{  date-year }}?')
  .withArgs(data)
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values and with custom options')
  .withValue('Hello #{name}! How are you doing during the year of #{date-year}?')
  .withArgs(data, { open: '#{', close: '}' })
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values and open set as ( and close set as )')
  .withValue('Hello (name)! How are you doing during the year of (date-year)?')
  .withArgs(data, { open: '(', close: ')' })
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values and open set as [ and close set as ]')
  .withValue('Hello [name]! How are you doing during the year of [date-year]?')
  .withArgs(data, { open: '[', close: ']' })
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values and open set as * and close set as *')
  .withValue('Hello *name*! How are you doing during the year of *date-year*?')
  .withArgs(data, { open: '*', close: '*' })
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values and open set as $ and close set as $')
  .withValue('Hello $name$! How are you doing during the year of $date-year$?')
  .withArgs(data, { open: '$', close: '$' })
  .expect('Hello JP! How are you doing during the year of 2013?')

  .it('should return the string replaced with template values by overriding default config')
  .withDefaultConfig({ template: { open: '{', close: '}' } })
  .withValue('Hello {name}! How are you doing during the year of {date-year}?')
  .withArgs(data)
  .expect('Hello JP! How are you doing during the year of 2013?')

;

module.exports = fixtures;
module.exports.default = module.exports;
