interface BoundingBox {
  x: number;
  x2: number;
  cx: number;
  y: number;
  y2: number;
  cy: number;
}

interface Transform {
  x: number;
  y: number;
}

interface SVGElement {
  bbox(): BoundingBox;
  transform(): Transform;
}

function gbox(this: SVGElement): BoundingBox {
  const boundingBox = this.bbox();
  const transform = this.transform();
  
  boundingBox.x += transform.x;
  boundingBox.x2 += transform.x;
  boundingBox.cx += transform.x;
  boundingBox.y += transform.y;
  boundingBox.y2 += transform.y;
  boundingBox.cy += transform.y;
  
  return boundingBox;
}