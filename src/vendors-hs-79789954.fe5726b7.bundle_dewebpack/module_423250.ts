class Vertex {
  pos: Vector3;
  normal: Vector3;
  uv: Vector3;

  constructor(position: Vector3, normal: Vector3, uv: Vector3) {
    this.pos = new Vector3(position);
    this.normal = new Vector3(normal);
    this.uv = new Vector3(uv);
  }

  clone(): Vertex {
    return new Vertex(this.pos.clone(), this.normal.clone(), this.uv.clone());
  }

  flip(): void {
    this.normal = this.normal.negated();
  }

  interpolate(other: Vertex, t: number): Vertex {
    return new Vertex(
      this.pos.lerp(other.pos, t),
      this.normal.lerp(other.normal, t),
      this.uv.lerp(other.uv, t)
    );
  }
}

export default Vertex;