function now(): number {
  return (dateTimestampProvider.delegate || Date).now();
}