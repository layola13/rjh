/**
 * HTML entity decoding utilities
 * Converts HTML entities to their corresponding characters
 */

/**
 * Regular expression matching common HTML entities
 */
declare const HTML_ENTITY_PATTERN: RegExp;

/**
 * Mapping of HTML entities to their decoded character equivalents
 */
declare const HTML_ENTITY_MAP: Readonly<{
  /** Ampersand entity */
  "&amp;": "&";
  /** Ampersand numeric entity */
  "&#38;": "&";
  /** Less than entity */
  "&lt;": "<";
  /** Less than numeric entity */
  "&#60;": "<";
  /** Greater than entity */
  "&gt;": ">";
  /** Greater than numeric entity */
  "&#62;": ">";
  /** Apostrophe entity */
  "&apos;": "'";
  /** Apostrophe numeric entity */
  "&#39;": "'";
  /** Quotation mark entity */
  "&quot;": '"';
  /** Quotation mark numeric entity */
  "&#34;": '"';
  /** Non-breaking space entity */
  "&nbsp;": " ";
  /** Non-breaking space numeric entity */
  "&#160;": " ";
  /** Copyright symbol entity */
  "&copy;": "©";
  /** Copyright symbol numeric entity */
  "&#169;": "©";
  /** Registered trademark entity */
  "&reg;": "®";
  /** Registered trademark numeric entity */
  "&#174;": "®";
  /** Horizontal ellipsis entity */
  "&hellip;": "…";
  /** Horizontal ellipsis numeric entity */
  "&#8230;": "…";
  /** Forward slash hex entity */
  "&#x2F;": "/";
  /** Forward slash numeric entity */
  "&#47;": "/";
}>;

/**
 * Decodes HTML entities in a string to their corresponding characters
 * 
 * @param input - The string containing HTML entities to decode
 * @returns The decoded string with entities replaced by their character equivalents
 * 
 * @example
 *