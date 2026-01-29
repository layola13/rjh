function pluralizeRule(count: number): number {
  return Number(count % 10 !== 1 || count % 100 === 11);
}

export default pluralizeRule;