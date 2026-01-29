export default function isFileAccepted(
  file: File | null | undefined,
  accept: string | string[] | null | undefined
): boolean {
  if (!file || !accept) {
    return true;
  }

  const acceptArray = Array.isArray(accept) ? accept : accept.split(", ");
  const fileName = file.name || "";
  const fileType = file.type || "";
  const baseType = fileType.replace(/\/.*$/, "");

  return acceptArray.some((acceptItem) => {
    const trimmedAccept = acceptItem.trim();

    // File extension matching (e.g., ".jpg")
    if (trimmedAccept.charAt(0) === ".") {
      const lowerFileName = fileName.toLowerCase();
      const lowerExtension = trimmedAccept.toLowerCase();
      return lowerFileName.endsWith(lowerExtension);
    }

    // Wildcard MIME type matching (e.g., "image/*")
    if (/\/\*$/.test(trimmedAccept)) {
      const acceptBaseType = trimmedAccept.replace(/\/.*$/, "");
      return baseType === acceptBaseType;
    }

    // Exact MIME type matching (e.g., "image/jpeg")
    return fileType === trimmedAccept;
  });
}