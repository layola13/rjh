export interface FileMapping {
  [key: string]: unknown;
}

export type URLFormatter = (value: unknown) => string | undefined;

/**
 * Checks if the HTML string contains img tags with src attributes
 */
function hasImageTags(html: string): boolean {
  return /<img.*?src=\\?"(.*?)\\?".*?\/?>/.test(html);
}

/**
 * Extracts all img tag matches from HTML content
 */
function extractImageMatches(html: string): RegExpExecArray[] {
  const matches: RegExpExecArray[] = [];
  const imgRegex = /<img.*?src=\\?"(.*?)\\?".*?\/?>/gi;
  const normalizedHtml = html.replace('\\"', '"');
  
  let match: RegExpExecArray | null;
  while ((match = imgRegex.exec(normalizedHtml)) !== null) {
    matches.push(match);
  }
  
  return matches;
}

/**
 * Default formatter that converts values to strings
 */
const defaultFormatter: URLFormatter = (value: unknown): string | undefined => {
  return value !== undefined ? String(value) : undefined;
};

/**
 * Replaces blob URLs in HTML img tags with mapped file URLs
 * @param content - HTML content string
 * @param files - Mapping of blob URLs to replacement URLs
 * @param formatter - Optional formatter function to transform replacement values
 * @returns Modified HTML string with replaced URLs
 */
export function replaceHTMLImgBlobURL(
  content: unknown,
  files: FileMapping,
  formatter: URLFormatter = defaultFormatter
): string {
  if (typeof content !== "string") {
    console.error("[Type Error]: content is not string");
    return "";
  }

  if (Object.keys(files).length === 0 && hasImageTags(content)) {
    console.error("[File Error]: files is empty");
    return content;
  }

  const hasHTMLTags = /<(\S*?) [^>]*>.*?<\/\1>|<.*?>/gm.test(content);
  
  if (hasHTMLTags && hasImageTags(content)) {
    const imageMatches = extractImageMatches(content);
    
    if (imageMatches.length > 0) {
      let result = content;
      
      imageMatches.forEach((match) => {
        if (match?.[0] && match[1]) {
          const blobUrl = match[1];
          const replacementValue = files[blobUrl];
          
          if (replacementValue !== undefined) {
            const formattedUrl = formatter(replacementValue);
            if (formattedUrl !== undefined) {
              result = result.replace(match[1], formattedUrl);
            }
          }
        }
      });
      
      return result;
    }
  }

  return content;
}