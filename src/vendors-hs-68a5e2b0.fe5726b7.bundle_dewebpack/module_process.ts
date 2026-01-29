function parseVersionNumbers(versionParts: string[]): number[] {
  return [
    parseInt(versionParts[1]),
    parseInt(versionParts[2]),
    parseInt(versionParts[3])
  ];
}