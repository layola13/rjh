interface HasherConfig {
  drop: number;
}

abstract class BaseHasher {
  protected cfg: HasherConfig;

  protected abstract _doReset(): void;
  protected abstract _doProcessBlock(): void;

  protected doReset(): void {
    this._doReset();
    const dropCount = this.cfg.drop;
    for (let i = 0; i < dropCount; i++) {
      this._doProcessBlock();
    }
  }
}