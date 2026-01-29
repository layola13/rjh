export class PointError extends Error {
  public name: string;
  public points: unknown[];

  constructor(message?: string, points?: unknown[]) {
    super(message || "Invalid Points!");
    
    this.name = "PointError";
    this.points = points || [];
    
    for (let i = 0; i < this.points.length; i++) {
      this.message += " " + String(this.points[i]);
    }
    
    Object.setPrototypeOf(this, PointError.prototype);
  }
}