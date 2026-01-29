interface PathCommand {
  x: number;
  y: number;
}

function createArcCommand(e: number[], t: PathCommand): [string, number, number, number, number, number, number, number] {
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