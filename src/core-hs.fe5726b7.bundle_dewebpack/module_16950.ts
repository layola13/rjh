import parseFloatPolyfill from './polyfills/parseFloat';
import exportGlobal from './utils/exportGlobal';

exportGlobal({
  global: true,
  forced: parseFloat !== parseFloatPolyfill
}, {
  parseFloat: parseFloatPolyfill
});