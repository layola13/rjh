interface LinkComponentProps {
  url: string;
  text: string;
  target?: string;
  onClick?: () => void;
}

export const LinkComponent: React.FC<LinkComponentProps> = ({ url, text, target, onClick }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    
    if (onClick) {
      onClick();
    } else if (target) {
      window.open(url, target);
    } else {
      showTeachingDialog(url, text);
    }
  };

  return (
    <div>
      <a href={url} onClick={handleClick} target={target}>
        {text}
      </a>
    </div>
  );
};

function showTeachingDialog(url: string, text: string): void {
  // Implementation from module 901869
  // Add actual implementation based on your requirements
}