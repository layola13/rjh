interface CopyToClipboardOptions {
  debug?: boolean;
  format?: string;
  message?: string;
  onCopy?: (clipboardData: DataTransfer | ClipboardEvent['clipboardData']) => void;
}

interface WindowWithClipboard extends Window {
  clipboardData?: {
    clearData: () => void;
    setData: (format: string, data: string) => void;
  };
}

const CLIPBOARD_FORMATS: Record<string, string> = {
  'text/plain': 'Text',
  'text/html': 'Url',
  default: 'Text'
};

function toggleStyle(): () => void {
  const originalBodyUserSelect = document.body.style.userSelect;
  const originalBodyWebkitUserSelect = document.body.style.webkitUserSelect;
  
  document.body.style.userSelect = 'auto';
  document.body.style.webkitUserSelect = 'auto';
  
  return (): void => {
    document.body.style.userSelect = originalBodyUserSelect;
    document.body.style.webkitUserSelect = originalBodyWebkitUserSelect;
  };
}

function formatPromptMessage(message: string): string {
  const isMac = /mac os x/i.test(navigator.userAgent);
  const keyCommand = isMac ? '⌘' : 'Ctrl';
  const keyShortcut = `${keyCommand}+C`;
  
  return message.replace(/#{\s*key\s*}/g, keyShortcut);
}

function copyToClipboard(text: string, options?: CopyToClipboardOptions): boolean {
  const opts = options ?? {};
  const debug = opts.debug ?? false;
  let success = false;
  let restoreStyle: (() => void) | undefined;
  let range: Range | undefined;
  let selection: Selection | null;
  let span: HTMLSpanElement | undefined;

  try {
    restoreStyle = toggleStyle();
    range = document.createRange();
    selection = document.getSelection();
    
    span = document.createElement('span');
    span.textContent = text;
    span.ariaHidden = 'true';
    span.style.all = 'unset';
    span.style.position = 'fixed';
    span.style.top = '0';
    span.style.clip = 'rect(0, 0, 0, 0)';
    span.style.whiteSpace = 'pre';
    span.style.webkitUserSelect = 'text';
    span.style.MozUserSelect = 'text';
    span.style.msUserSelect = 'text';
    span.style.userSelect = 'text';
    
    span.addEventListener('copy', (event: ClipboardEvent): void => {
      event.stopPropagation();
      
      if (opts.format) {
        if (event.clipboardData === undefined || event.clipboardData === null) {
          if (debug) {
            console.warn('unable to use e.clipboardData');
            console.warn('trying IE specific stuff');
          }
          
          const win = window as WindowWithClipboard;
          win.clipboardData?.clearData();
          const formatType = CLIPBOARD_FORMATS[opts.format] ?? CLIPBOARD_FORMATS.default;
          win.clipboardData?.setData(formatType, text);
        } else {
          event.preventDefault();
          event.clipboardData.clearData();
          event.clipboardData.setData(opts.format, text);
        }
      }
      
      if (opts.onCopy) {
        event.preventDefault();
        opts.onCopy(event.clipboardData);
      }
    });
    
    document.body.appendChild(span);
    range.selectNodeContents(span);
    selection?.addRange(range);
    
    if (!document.execCommand('copy')) {
      throw new Error('copy command was unsuccessful');
    }
    
    success = true;
  } catch (error) {
    if (debug) {
      console.error('unable to copy using execCommand: ', error);
      console.warn('trying IE specific stuff');
    }
    
    try {
      const win = window as WindowWithClipboard;
      win.clipboardData?.setData(opts.format ?? 'text', text);
      
      if (opts.onCopy) {
        opts.onCopy(win.clipboardData as any);
      }
      
      success = true;
    } catch (fallbackError) {
      if (debug) {
        console.error('unable to copy using clipboardData: ', fallbackError);
        console.error('falling back to prompt');
      }
      
      const defaultMessage = 'Copy to clipboard: #{key}, Enter';
      const promptMessage = formatPromptMessage(opts.message ?? defaultMessage);
      window.prompt(promptMessage, text);
    }
  } finally {
    if (selection && range) {
      if (typeof selection.removeRange === 'function') {
        selection.removeRange(range);
      } else {
        selection.removeAllRanges();
      }
    }
    
    if (span && span.parentNode) {
      document.body.removeChild(span);
    }
    
    restoreStyle?.();
  }
  
  return success;
}

export default copyToClipboard;