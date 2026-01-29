const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function isEmail(value: unknown): value is string {
  return typeof value === "string" && EMAIL_REGEX.test(value);
}