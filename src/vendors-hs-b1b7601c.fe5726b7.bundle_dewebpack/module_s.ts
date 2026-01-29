interface Point {
  x: number;
  y: number;
}

type SCommand = ["S", number, number, number, number];

function createSCommand(e: number[], t: Point): SCommand {
  t.x = e[2];
  t.y = e[3];
  
  return ["S", e[0], e[1], e[2], e[3]];
}