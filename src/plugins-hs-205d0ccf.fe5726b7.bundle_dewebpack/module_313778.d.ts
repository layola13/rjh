/**
 * Icon component props interface
 */
interface IconComponentProps {
  /** Icon type identifier */
  type: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** Click event handler */
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Icon component that renders a themed icon with customizable styling
 * @param props - Component properties
 * @returns React element representing the icon
 */
declare function IconComponent(props: IconComponentProps): React.ReactElement;

export default IconComponent;