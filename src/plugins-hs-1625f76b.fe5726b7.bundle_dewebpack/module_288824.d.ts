/**
 * Props for the disabled label-input component
 */
export interface LabelInputDisabledProps {
  /** The label text to display */
  label: string;
  /** The input value to display (read-only) */
  value: string;
}

/**
 * Returns a disabled label-input component
 * @param props - Component properties
 * @returns A React element containing a disabled label and input field
 */
export function getLabelInputDisabledCom(
  props: LabelInputDisabledProps
): React.ReactElement;