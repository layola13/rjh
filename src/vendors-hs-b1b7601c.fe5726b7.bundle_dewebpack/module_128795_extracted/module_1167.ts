const processUtil = typeof process !== 'undefined' && process.binding ? process.binding('util') : null;
const nodeUtil = (() => {
  try {
    return require('util').types;
  } catch {
    return null;
  }
})();

export const util = nodeUtil || processUtil || null;