interface RebuildableElement {
  _rebuild: boolean;
  dom: {
    leading: number;
    newLined?: boolean;
  };
  attr(name: string): any;
  attr(name: string, value: any): this;
  textPath(): any;
  lines(): LineCollection;
  fire(event: string): this;
  text(): string;
}

interface LineCollection {
  each(callback: (this: RebuildableElement) => void): void;
}

interface NumberConstructor {
  new (value: number): number;
}

declare const n: {
  Number: NumberConstructor;
};

function rebuild(this: RebuildableElement, enable?: boolean): RebuildableElement {
  if (typeof enable === 'boolean') {
    this._rebuild = enable;
  }

  if (this._rebuild) {
    const element = this;
    let accumulatedOffset = 0;
    const lineHeight = this.dom.leading * new n.Number(this.attr('font-size'));

    this.lines().each(function (this: RebuildableElement) {
      if (this.dom.newLined) {
        if (!element.textPath()) {
          this.attr('x', element.attr('x'));
        }

        if (this.text() === '\n') {
          accumulatedOffset += lineHeight;
        } else {
          this.attr('dy', lineHeight + accumulatedOffset);
          accumulatedOffset = 0;
        }
      }
    });

    this.fire('rebuild');
  }

  return this;
}