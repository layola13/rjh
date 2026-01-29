export function escapeUrl(value: string | unknown): string | unknown {
  if (typeof value !== "string") {
    return value;
  }

  let processedValue = value;

  // Remove surrounding quotes if present
  if (/^['"].*['"]$/.test(processedValue)) {
    processedValue = processedValue.slice(1, -1);
  }

  // Check if value needs escaping (contains special characters)
  const needsEscaping = /["'() \t\n]/.test(processedValue);

  if (needsEscaping) {
    const escapedValue = processedValue
      .replace(/"/g, '\\"')
      .replace(/\n/g, "\\n");
    return `"${escapedValue}"`;
  }

  return processedValue;
}