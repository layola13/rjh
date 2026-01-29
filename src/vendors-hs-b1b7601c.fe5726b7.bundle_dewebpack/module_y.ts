interface TransformOptions {
  y: number;
}

interface Transformable {
  y(): number;
  transform(value: string): unknown;
  transform(options: TransformOptions, flag: boolean): unknown;
}

function moduleY(this: Transformable, value: number | null | undefined): unknown {
  return value == null 
    ? this.transform("y") 
    : this.transform({ y: value - this.y() }, true);
}