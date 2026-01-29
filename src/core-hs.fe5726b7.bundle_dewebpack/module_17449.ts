import globalThis from './79227';
import parseIntImpl from './36178';

globalThis({
  global: true,
  forced: parseInt !== parseIntImpl
}, {
  parseInt: parseIntImpl
});