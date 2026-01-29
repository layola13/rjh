function detach(this: { _owner: Owner | null }): boolean {
  if (this._owner !== null) {
    this._owner.detach(this);
    return true;
  }
  return false;
}

interface Owner {
  detach(item: unknown): void;
}