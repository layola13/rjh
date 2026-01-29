function formatMinute(
  count: string,
  nominative: boolean,
  accusative: boolean
): string {
  if (count === "m") {
    return nominative ? "jedna minuta" : accusative ? "jednu minutu" : "jedne minute";
  }
  return "";
}