function rebuild(shouldRebuild?: boolean): this {
  if (typeof shouldRebuild === "boolean") {
    this._rebuild = shouldRebuild;
  }

  if (this._rebuild) {
    const self = this;
    let accumulatedOffset = 0;
    const lineHeight = this.dom.leading * new n.Number(this.attr("font-size"));

    this.lines().each(function (this: any): void {
      if (this.dom.newLined) {
        if (!self.textPath()) {
          this.attr("x", self.attr("x"));
        }

        if (this.text() === "\n") {
          accumulatedOffset += lineHeight;
        } else {
          this.attr("dy", lineHeight + accumulatedOffset);
          accumulatedOffset = 0;
        }
      }
    });

    this.fire("rebuild");
  }

  return this;
}