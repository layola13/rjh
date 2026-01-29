import { useTranslation } from './use-translation';

interface TranslationProps {
  ns?: string | string[];
  children: (
    t: (key: string, options?: any) => string,
    context: { i18n: any; lng: string },
    ready: boolean
  ) => React.ReactNode;
  [key: string]: any;
}

export function Translation({ ns, children, ...rest }: TranslationProps) {
  const [t, i18n, ready] = useTranslation(ns, rest);

  return children(t, { i18n, lng: i18n.language }, ready);
}