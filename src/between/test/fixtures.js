const { TestFixtures } = require('../../../test/helpers.js');

const fixtures = new TestFixtures();


fixtures
  .it('should return the content between `left` and `right`')
  .withValue('<a>foo</a>')
  .withArgs('<a>', '</a>')
  .expect('foo')

  .it('should stop matching when it finds the first `right` match')
  .withValue('<a>foo</a></a>')
  .withArgs('<a>', '</a>')
  .expect('foo')

  .it('should stop matching when it finds the first `left` match')
  .withValue('<a><a>foo</a></a>')
  .withArgs('<a>', '</a>')
  .expect('<a>foo')

  .it('should return and empty string if `right` does not exist')
  .withValue('<a>foo')
  .withArgs('<a>', '</a>')
  .expect('')

  .it('should only match `right` after `left` has been found')
  .withValue('Some strings } are very {weird}, dont you think?')
  .withArgs('{', '}')
  .expect('weird')

  .it('should return the end of the string if `right` was not provided')
  .withValue('This is a test string')
  .withArgs('test')
  .expect(' string')

  .it('should return the beginning of the string if `left` was not provided and `right` was')
  .withValue('This is a test string')
  .withArgs('', 'test')
  .expect('This is a ')
;

module.exports = fixtures;
module.exports.default = module.exports;
