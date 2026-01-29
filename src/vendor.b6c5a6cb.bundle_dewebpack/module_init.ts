interface Config {
  extend(options: unknown): Config;
}

interface ModuleInit {
  cfg: Config;
}

function moduleInit(this: ModuleInit, options: unknown): void {
  this.cfg = this.cfg.extend(options);
}