function moduleV(e: [unknown], t: { y: unknown }): [string, unknown] {
  t.y = e[0];
  return ["V", e[0]];
}