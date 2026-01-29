const EPSILON = 1e-5;

interface Vector3Like {
  minus(other: Vector3Like): Vector3Like;
  cross(other: Vector3Like): Vector3Like;
  unit(): Vector3Like;
  dot(other: Vector3Like): number;
  clone(): Vector3Like;
  negated(): Vector3Like;
}

interface VertexLike {
  pos: Vector3Like;
  clone(): VertexLike;
  flip(): void;
  interpolate(other: VertexLike, t: number): VertexLike;
}

class Plane {
  static readonly EPSILON = EPSILON;

  normal: Vector3Like;
  w: number;

  constructor(normal: Vector3Like, w: number) {
    this.normal = normal;
    this.w = w;
  }

  static fromPoints(
    point1: Vector3Like,
    point2: Vector3Like,
    point3: Vector3Like
  ): Plane {
    const normal = point2.minus(point1).cross(point3.minus(point1)).unit();
    return new Plane(normal, normal.dot(point1));
  }

  clone(): Plane {
    return new Plane(this.normal.clone(), this.w);
  }

  flip(): void {
    this.normal = this.normal.negated();
    this.w = -this.w;
  }

  splitPolygon(
    polygon: Polygon,
    coplanarFront: Polygon[],
    coplanarBack: Polygon[],
    front: Polygon[],
    back: Polygon[]
  ): void {
    const COPLANAR = 0;
    const FRONT = 1;
    const BACK = 2;
    const SPANNING = 3;

    let polygonType = 0;
    const types: number[] = [];

    for (let i = 0; i < polygon.vertices.length; i++) {
      const distance = this.normal.dot(polygon.vertices[i].pos) - this.w;
      const type = distance < -EPSILON ? BACK : distance > EPSILON ? FRONT : COPLANAR;
      polygonType |= type;
      types.push(type);
    }

    switch (polygonType) {
      case COPLANAR:
        (this.normal.dot(polygon.plane.normal) > 0 ? coplanarFront : coplanarBack).push(polygon);
        break;
      case FRONT:
        front.push(polygon);
        break;
      case BACK:
        back.push(polygon);
        break;
      case SPANNING:
        const frontVertices: VertexLike[] = [];
        const backVertices: VertexLike[] = [];

        for (let i = 0; i < polygon.vertices.length; i++) {
          const nextIndex = (i + 1) % polygon.vertices.length;
          const currentType = types[i];
          const nextType = types[nextIndex];
          const currentVertex = polygon.vertices[i];
          const nextVertex = polygon.vertices[nextIndex];

          if (currentType !== BACK) {
            frontVertices.push(currentVertex);
          }
          if (currentType !== FRONT) {
            backVertices.push(currentType !== BACK ? currentVertex.clone() : currentVertex);
          }

          if ((currentType | nextType) === SPANNING) {
            const t =
              (this.w - this.normal.dot(currentVertex.pos)) /
              this.normal.dot(nextVertex.pos.minus(currentVertex.pos));
            const interpolatedVertex = currentVertex.interpolate(nextVertex, t);
            frontVertices.push(interpolatedVertex);
            backVertices.push(interpolatedVertex.clone());
          }
        }

        if (frontVertices.length >= 3) {
          front.push(new Polygon(frontVertices, polygon.shared, polygon.material));
        }
        if (backVertices.length >= 3) {
          back.push(new Polygon(backVertices, polygon.shared, polygon.material));
        }
    }
  }
}

class Polygon {
  vertices: VertexLike[];
  shared: unknown;
  plane: Plane;
  tag: string;
  material: unknown;

  constructor(vertices: VertexLike[], shared: unknown, material: unknown) {
    this.vertices = vertices;
    this.shared = shared;
    this.plane = Plane.fromPoints(vertices[0].pos, vertices[1].pos, vertices[2].pos);
    this.tag = (typeof THREE !== 'undefined' && THREE.Math?.generateUUID) 
      ? THREE.Math.generateUUID() 
      : crypto.randomUUID();
    this.material = material;
  }

  clone(): Polygon {
    const clonedVertices = this.vertices.map((vertex) => vertex.clone());
    return new Polygon(clonedVertices, this.shared, this.material);
  }

  flip(): void {
    this.vertices.reverse().forEach((vertex) => {
      vertex.flip();
    });
    this.plane.flip();
  }
}

export default Polygon;