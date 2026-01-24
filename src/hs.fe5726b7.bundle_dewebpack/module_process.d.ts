/**
 * Parses a semantic version string array into numeric components.
 * 
 * @param versionParts - Array containing version string parts where:
 *   - index 0: unused (likely full match from regex)
 *   - index 1: major version string
 *   - index 2: minor version string
 *   - index 3: patch version string
 * 
 * @returns A tuple of three numbers representing [major, minor, patch] version
 * 
 * @example
 *