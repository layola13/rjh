export interface SaveProcessPlugin {
  onDeactive(): void;
}

export class SaveProcessPlugin implements SaveProcessPlugin {
  constructor() {}

  onDeactive(): void {}
}

const context = require.context('./path/to/plugins', true, /\.ts$/);
const plugins: SaveProcessPlugin[] = [];

context.keys().forEach((key: string) => {
  const module = context(key);
  plugins.push(module.default);
});

export default plugins;