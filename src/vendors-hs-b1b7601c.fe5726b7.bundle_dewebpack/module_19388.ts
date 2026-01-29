function isValidUUID(uuid: string): boolean {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidPattern.test(uuid);
}

export default function getUUIDVersion(uuid: string): number {
  if (!isValidUUID(uuid)) {
    throw new TypeError("Invalid UUID");
  }
  return parseInt(uuid.slice(14, 15), 16);
}