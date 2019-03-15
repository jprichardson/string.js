const { version } = require('./package.json');

class StringJs {

  #config = {};
  #value;
  #string;
  #prefix = '';
  #suffix = '';

  static #extendedPrototype = [];
  static #prototypeStrings = {};

  constructor(value = '') {
    this.#value = value;
  }

  static create(value = '') {
    if (value instanceof StringJs) {
      return value;
    }
    return new StringJs(value);
  }

  /**
   * Escapes a string so it can be used in a regular expression.
   *
   * @param {String} string
   *   The string to escape.
   *
   * @return {String}
   *   The escaped string.
   */
  static escapeRegExp(string) {
    // most part from https://github.com/skulpt/skulpt/blob/ecaf75e69c2e539eff124b2ab45df0b01eaf2295/src/str.js#L242
    const ret = [];
    const re = /^[A-Za-z0-9]+$/;
    let s = string == null ? '' : '' + string;
    for (let i = 0; i < s.length; ++i) {
      let c = s.charAt(i);
      if (re.test(c)) {
        ret.push(c);
        continue;
      }
      ret.push(c === '\\000' ? '\\000' : `\\${c}`);
    }
    return ret.join('');
  }

  static extendPrototype() {
    // Immediately return if already extended.
    if (this.#extendedPrototype.length) {
      return;
    }

    const proto = this.prototype;

    const applyMethod = (string, method, args) => {
      const original = string;
      if (!this.#prototypeStrings[string]) {
        this.#prototypeStrings[string] = this.create(string);
      }
      const instance = this.#prototypeStrings[string];
      const newString = method.apply(instance, args).s;
      delete this.#prototypeStrings[original];
      this.#prototypeStrings[newString] = instance;
      return newString;
    };

    // Only fill in the missing properties.
    const StringProto = Object.keys(Object.getOwnPropertyDescriptors(String.prototype));
    const StringJsProto = Object.keys(Object.getOwnPropertyDescriptors(this.prototype));
    const properties = StringJsProto.filter(p => StringProto.indexOf(p) === -1);
    properties.forEach(p => {
      const descriptor = Object.getOwnPropertyDescriptor(proto, p);
      if (descriptor && typeof descriptor.get === 'function') {
        this.#extendedPrototype.push(p);
        const originalGet = descriptor.get;
        descriptor.configurable = true;
        descriptor.get = function () {
          return applyMethod(this, originalGet, arguments);
        };
        Object.defineProperty(String.prototype, p, descriptor);
      }
      else if (typeof proto[p] === 'function') {
        this.#extendedPrototype.push(p);
        String.prototype[p] = function() {
          return applyMethod(this, proto[p], arguments);
        }
      }
    });
  }

  static restorePrototype() {
    for (let i = 0, l = this.#extendedPrototype.length; i < l; i++) {
      const prop = this.#extendedPrototype[i];
      delete String.prototype[prop];
    }
    this.#extendedPrototype = [];
  }

  /**
   * Retrieves or sets configuration.
   *
   * @param {String|StringJs.Config} [name]
   *   The name of the config object to retrieve/set. If not set, the entire
   *   config object will be returned. If an object, it will merge any
   *   key/value pair configuration passed.
   * @param {*} [value]
   *   The value of the config object to set. If not provided, the current set
   *   value will be returned.
   *
   * @return {StringJs|StringJs.Config|*}
   *   If both name and value are provided, this is in "set" mode and the
   *   StringExtra instance will be returned as a result. If name was provided,
   *   but not value, this will return whatever value is currently set for name.
   *   If neither name nor value is provided, the entire config object is
   *   returned.
   */
  config(name, value) {
    let config = {...this.constructor.defaultConfig, ...this.#config};
    delete config.default;
    if (typeof name === 'object') {
      config = {...config, ...name};
    }
    else {
      if (name === undefined) {
        return config;
      }
      if (value === undefined) {
        return config[name];
      }
      config[name] = value;
    }
    this.#config = config;
    return this.#reset();
  }

  /**
   * @return {StringJs}
   */
  prefix(value, delimiter = new this.constructor(' ')) {
    if (!value) {
      return this;
    }
    if (!(value instanceof this.constructor)) {
      value = new this.constructor(value);
    }
    if (delimiter !== null || delimiter !== undefined) {
      if (!(delimiter instanceof this.constructor)) {
        delimiter = new this.constructor(delimiter);
      }
      value.suffix(delimiter, null);
    }
    this.#prefix = value;
    return this.#reset();
  }

  #reset() {
    this.#string = null;
    return this;
  }

  /**
   * @return {StringJs}
   */
  suffix(value, delimiter = new this.constructor(' ')) {
    if (!value) {
      return this;
    }
    if (!(value instanceof this.constructor)) {
      value = new this.constructor(value);
    }
    if (delimiter !== null || delimiter !== undefined) {
      if (!(delimiter instanceof this.constructor)) {
        delimiter = new this.constructor(delimiter);
      }
      value.prefix(delimiter, null);
    }
    this.#suffix = value;
    return this.#reset();
  }

  toString() {
    // Immediately return any formatted result currently set.
    if (typeof this.#string === 'string') {
      return this.#string;
    }

    this.#string = `${this.#prefix}${this.#value}${this.#suffix}`;

    return this.#string;
  }

}

/**
 * @type {Object<StringJs.Config>}
 */
StringJs.defaultConfig = {
  nullAsEmptyString: true,
};

Object.defineProperty(StringJs, 'VERSION', {
  value: version,
  configurable: false,
  enumerable: false,
  writable: false
});

Object.defineProperty(StringJs.prototype, 'length', {
  get: function () {
    return this.toString().length;
  },
  configurable: false,
  enumerable: false,
});

Object.defineProperty(StringJs.prototype, 's', {
  get: function () {
    return this.toString();
  },
  configurable: false,
  enumerable: false,
});

const chainPackages = (obj, methods) => {
  for (let [name, fn] of methods) {
    obj[name] = function () {
      return new this.constructor.create(fn.call(this, this.toString(), ...arguments));
    };
  }
};

// To avoid requiring @babel/polyfill (which bloats everything), just do a
// simple polyfill for Object.entries.
const entries = Object.entries || (x => Object.keys(x).map(k => [k, x[k]]));
chainPackages(StringJs.prototype, new Map(entries({
  between: require('./src/between'),
  template: require('./src/template')
})));

export default StringJs;
