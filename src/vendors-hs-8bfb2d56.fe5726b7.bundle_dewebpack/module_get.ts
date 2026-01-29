function getIdentity(this: { _identityReadOnly?: Identity }): Identity {
  return this._identityReadOnly || (this._identityReadOnly = I.Identity()), this._identityReadOnly;
}