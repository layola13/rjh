function moduleS(context: unknown): void {
  if (typeof context === 'function') {
    context = context.call(this);
  }
}