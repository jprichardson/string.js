const assert = require('assert');
const { describe, it } = require('mocha');

assert.instanceOf = (actual, expected) => {
  assert.strictEqual(actual instanceof expected, true);
};

assert.true = function (actual) {
  this.strictEqual(actual, true);
};

assert.false = function (actual) {
  this.strictEqual(actual, false);
};


class TestFixture {

  constructor(fixtures, args, expected, assertFn = assert.strictEqual) {
    this.fixtures = fixtures;
    this.defaultConfig = null;
    this.args = args;
    this.expected = expected;
    this.assertFn = assertFn;
  }

  /**
   * @return {TestFixture}
   */
  expect(expected) {
    this.expected = expected;
    return this;
  }

  /**
   * @return {TestFixture}
   */
  it(label) {
    return this.fixtures.it(label);
  }

  /**
   * @return {TestFixture}
   */
  withArgs(...args) {
    this.args = args;
    return this;
  }

  /**
   * @return {TestFixture}
   */
  withDefaultConfig(config = {}) {
    this.defaultConfig = config;
    return this;
  }

  /**
   * @return {TestFixture}
   */
  withValue(value) {
    this.value = value;
    return this;
  }

  test(ctor, method = null) {
    let actual;

    // Passed ctor is a class.
    if (typeof ctor === 'function' && typeof method === 'string') {
      if (this.defaultConfig) {
        ctor.defaultConfig = Object.assign({}, ctor.defaultConfig, this.defaultConfig);
      }
      const instance = new ctor(this.value);
      const value = instance[method].apply(instance, this.args);
      assert.instanceOf(value, instance.constructor);
      this.assertFn(value.toString(), this.expected);
    }
    // Passed ctor is a procedural function.
    else if (typeof ctor === 'function' && !method) {
      actual = ctor.apply(ctor, [this.value].concat(this.args));
      this.assertFn(actual, this.expected);
    }
    else {
      throw new TypeError('You must either set a constructor or a function to test.');
    }
  }
}

class TestFixtures {

  constructor() {
    this.assertFn = assert.strictEqual;
    this.fn = null;
    this.fnName = null;
    this.ctor = null;
    this.ctorName = null;
    this.fixtures = new Map();
  }

  /**
   * @return {TestFixture}
   */
  it(label) {
    const fixture = new TestFixture(this);
    this.fixtures.set(label, fixture);
    return fixture;
  }

  /**
   * @return {TestFixtures}
   */
  add(label, args, expected) {
    this.fixtures.set(label, new TestFixture(this, args, expected, this.assertFn));
    return this;
  }

  setAssertFn(fn) {
    this.assertFn = fn;
    return this;
  }

  /**
   * @return {TestFixtures}
   */
  setFunction(fn, name = null) {
    this.fn = fn;
    this.fnName = name || fn.name || 'unknown';
    return this;
  }

  setMethod(name) {
    this.fnName = name;
    return this;
  }

  /**
   * @return {TestFixtures}
   */
  setConstructor(ctor, name = null) {
    this.ctor = ctor;
    this.ctorName = name || ctor.name || 'StringJs';
    return this;
  }

  /**
   * @return {TestFixtures}
   */
  test() {
    describe(this.ctor ? `- ${this.ctorName}#${this.fnName}()` : `+ ${this.fnName}()`, () => {
      for (let [label, fixture] of this.fixtures.entries()) {
        if (this.ctor) {
          it(label, () => fixture.test(this.ctor, this.fnName));
        }
        // Skip if there is no defaultConfig set as procedural functions are
        // standalone and cannot use "global" config like the instance version.
        else if (fixture.defaultConfig === null) {
          it(label, () => fixture.test(this.fn));
        }
      }
    });
    return this;
  }
}

module.exports = {
  assert,
  TestFixture,
  TestFixtures,
};
module.exports.default = module.exports;
