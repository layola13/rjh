function pop<T>(this: { members: T[] }): T | undefined {
  return this.members.pop();
}