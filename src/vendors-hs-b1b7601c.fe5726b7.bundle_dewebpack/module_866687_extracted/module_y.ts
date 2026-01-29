interface TransformOptions {
  y: number;
}

interface Transformable {
  transform(property: string): unknown;
  transform(options: TransformOptions, flag: boolean): unknown;
  y(): number;
}

function moduleY(this: Transformable, e: number | null | undefined): unknown {
  return e == null 
    ? this.transform("y") 
    : this.transform({ y: e - this.y() }, true);
}

export { moduleY };