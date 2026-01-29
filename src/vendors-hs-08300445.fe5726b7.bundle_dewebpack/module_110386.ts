import { useState, useEffect, useRef } from 'react';

interface UseTextSyncProps {
  valueTexts: string[];
  onTextChange: (text: string) => void;
}

type UseTextSyncReturn = [
  string,
  (text: string) => void,
  () => void
];

export default function useTextSync({ valueTexts, onTextChange }: UseTextSyncProps): UseTextSyncReturn {
  const [localText, setLocalText] = useState<string>("");
  const textCache = useRef<string[]>([]);

  function syncWithCache(): void {
    setLocalText(textCache.current[0]);
  }

  textCache.current = valueTexts;

  useEffect(() => {
    const hasChanged = valueTexts.every((text) => text !== localText);
    if (hasChanged) {
      syncWithCache();
    }
  }, [valueTexts.join(" || ")]);

  function handleTextChange(text: string): void {
    setLocalText(text);
    onTextChange(text);
  }

  return [localText, handleTextChange, syncWithCache];
}