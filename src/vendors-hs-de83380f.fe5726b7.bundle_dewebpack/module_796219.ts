import regeneratorRuntime from 'regenerator-runtime';

export default regeneratorRuntime;

try {
  (globalThis as any).regeneratorRuntime = regeneratorRuntime;
} catch {
  Function('r', 'regeneratorRuntime = r')(regeneratorRuntime);
}