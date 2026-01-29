interface TimestampProvider {
  now(): number;
  delegate?: DateConstructor;
}

export const dateTimestampProvider: TimestampProvider = {
  now(): number {
    return (dateTimestampProvider.delegate || Date).now();
  },
  delegate: undefined
};