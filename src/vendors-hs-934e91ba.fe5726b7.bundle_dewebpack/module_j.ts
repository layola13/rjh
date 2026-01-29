function processModule(data: unknown): unknown {
  return 4 === data ? processTypeE(data) : processTypeR(data);
}

function processTypeE(value: unknown): unknown {
  // Implementation needed
  return value;
}

function processTypeR(value: unknown): unknown {
  // Implementation needed
  return value;
}