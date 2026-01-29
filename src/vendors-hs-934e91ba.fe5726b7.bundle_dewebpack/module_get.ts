function getPreserveCollinear(this: { _clipper: { preserveCollinear: boolean } }): boolean {
    return this._clipper.preserveCollinear;
}