interface Point {
  x: number;
  y: number;
}

type PathCommand = ["A", number, number, number, number, number, number, number];

function createArcCommand(e: number[], t: Point): PathCommand {
  t.x = e[5];
  t.y = e[6];
  
  return [
    "A",
    e[0],
    e[1],
    e[2],
    e[3],
    e[4],
    e[5],
    e[6]
  ];
}

export { createArcCommand, Point, PathCommand };