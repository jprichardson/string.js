/**
 * Takes a string and interpolates values.
 *
 * Defaults to {{ and }} for Mustache compatible templates. However, you can
 * change the default by modifying StringJs.defaultConfig.template.open and
 * StringJs.defaultConfig.template.close.
 *
 * @param {String} string
 *   The string to use as a template.
 * @param {Object} values
 *   A key/value paired object, where key is the string that will be searched
 *   for and value is the value that will replace it.
 * @param {Object<TemplateConfig>} [config={}]
 *   Configuration override default open and close tags.
 *
 * @return {String}
 */
function template(string, values = {}, config = {}) {
  // Merge in any instance config.
  config = {
    template: {
      open: '{{',
      close: '}}',
      ...config
    },
    ...(typeof this.config === 'function' ? this.config() : null),
  };

  const open = typeof config.template.open === 'string' ? config.template.open.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$') : '{{';
  const close = typeof config.template.close === 'string' ? config.template.close.replace(/[-[\]()*\s]/g, "\\$&").replace(/\$/g, '\\$'): '}}';
  const r = new RegExp(open + '(.+?)' + close, 'g');

  //, r = /\{\{(.+?)\}\}/g
  const matches = string.match(r) || [];
  matches.forEach(function(match) {
    const key = match.substring(config.template.open.length, match.length - config.template.close.length).trim();//chop {{ and }}
    const value = values[key] === undefined ? '' : values[key];
    string = string.replace(match, value);
  });

  return string;
}

module.exports = template;
module.exports.default = module.exports;
