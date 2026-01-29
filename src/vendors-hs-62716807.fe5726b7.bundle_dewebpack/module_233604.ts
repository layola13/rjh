import { useForm } from './hooks/useForm';
import type { FormInstance, NamePath, ScrollOptions, FieldData } from './types';

interface InternalFormMethods {
  itemRef: (name: NamePath) => (element: HTMLElement | null) => void;
}

interface ExtendedFormInstance extends FormInstance {
  __INTERNAL__: InternalFormMethods;
  scrollToField: (name: NamePath, options?: ScrollOptions) => void;
  getFieldInstance: (name: NamePath) => HTMLElement | undefined;
}

function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

function getFieldId(namePath: string[], formName?: string): string {
  const prefix = formName ? `${formName}_` : '';
  return `${prefix}${namePath.join('_')}`;
}

function scrollIntoView(element: HTMLElement, options: ScrollIntoViewOptions): void {
  element.scrollIntoView(options);
}

function getFieldKey(name: NamePath): string {
  return toArray(name).join('_');
}

export default function useFormInstance(formInstance?: FormInstance): [ExtendedFormInstance] {
  const [defaultForm] = useForm();
  const fieldInstancesRef = React.useRef<Record<string, HTMLElement>>({});

  const extendedFormInstance = React.useMemo<ExtendedFormInstance>(() => {
    const baseForm = formInstance ?? defaultForm;

    return {
      ...baseForm,
      __INTERNAL__: {
        itemRef: (name: NamePath) => {
          return (element: HTMLElement | null) => {
            const key = getFieldKey(name);
            if (element) {
              fieldInstancesRef.current[key] = element;
            } else {
              delete fieldInstancesRef.current[key];
            }
          };
        }
      },
      scrollToField: (name: NamePath, options: ScrollOptions = {}) => {
        const namePath = toArray(name);
        const fieldId = getFieldId(namePath, baseForm.__INTERNAL__.name);
        const fieldElement = fieldId ? document.getElementById(fieldId) : null;

        if (fieldElement) {
          scrollIntoView(fieldElement, {
            scrollMode: 'if-needed',
            block: 'nearest',
            ...options
          });
        }
      },
      getFieldInstance: (name: NamePath) => {
        const key = getFieldKey(name);
        return fieldInstancesRef.current[key];
      }
    };
  }, [formInstance, defaultForm]);

  return [extendedFormInstance];
}