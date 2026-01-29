export class ClipboardUtil {
  /**
   * Copy text to clipboard using legacy document.execCommand method
   * @param text - The text content to copy to clipboard
   * @returns boolean indicating whether the copy operation was successful
   */
  static copyText(text: string): boolean {
    const textarea = document.createElement("textarea");
    
    textarea.style.fontSize = "12pt";
    textarea.style.border = "0";
    textarea.style.padding = "0";
    textarea.style.margin = "0";
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    textarea.style.top = `${scrollTop}px`;
    
    textarea.setAttribute("readonly", "");
    textarea.value = text;
    
    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);
    
    const copySuccessful = document.execCommand("copy");
    
    document.body.removeChild(textarea);
    
    return copySuccessful;
  }
}