function normalizeHeaderName(headers: Record<string, any>, normalizedName: string): void {
  Object.keys(headers).forEach((currentName: string) => {
    if (
      currentName !== normalizedName &&
      currentName.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[currentName];
      delete headers[currentName];
    }
  });
}

export default normalizeHeaderName;