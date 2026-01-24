/**
 * UUID v3 generator module
 * Generates version 3 UUIDs using MD5 hashing with a namespace
 */

import uuidV3Factory from './uuid-factory'; // module 528290
import md5HashFunction from './md5'; // module 579048

/**
 * UUID v3 generator function
 * Creates a version 3 UUID by hashing a name with MD5 in the context of a namespace
 * 
 * @param name - The name to hash (string or byte array)
 * @param namespace - The UUID namespace (string or byte array)
 * @returns A version 3 UUID string in the format xxxxxxxx-xxxx-3xxx-xxxx-xxxxxxxxxxxx
 * 
 * @example
 *