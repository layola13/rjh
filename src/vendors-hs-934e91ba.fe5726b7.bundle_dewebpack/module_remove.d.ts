/**
 * Removes a cookie by setting its expiration date to the past.
 * 
 * @remarks
 * This function works by calling the underlying cookie setter with an expiration
 * date set to -1, which instructs the browser to immediately expire and remove the cookie.
 * 
 * @param name - The name of the cookie to remove
 * @param options - Optional cookie attributes (path, domain, etc.) that must match
 *                  the original cookie settings for successful removal
 * 
 * @example
 *