import { useState, useEffect, ReactElement } from 'react';
import { Button, IconfontView } from './ui-components';

interface Block {
  label: string;
  icon: string;
  checked: boolean;
}

interface CheckBlockData {
  label: string;
  className?: string;
  disabled?: boolean;
  blocks: Block[];
  onChange?: (index: number, checked: boolean) => void;
}

interface CheckBlockProps {
  data: CheckBlockData;
}

export default function CheckBlock({ data }: CheckBlockProps): ReactElement {
  const { label, className = '', disabled = false, onChange } = data;
  const [blocks, setBlocks] = useState<Block[]>(data.blocks);

  useEffect(() => {
    setBlocks(data.blocks);
  }, [data.blocks]);

  const handleBlockClick = (index: number): void => {
    const updatedBlocks = [...blocks];
    updatedBlocks[index].checked = !updatedBlocks[index].checked;
    setBlocks(updatedBlocks);
    onChange?.(index, updatedBlocks[index].checked);
  };

  return (
    <div className={`property-bar-checkblock-wrapper ${className}${disabled ? ' disabled' : ''}`}>
      <span className="property-bar-label checkblock-label">{label}</span>
      <div className="property-bar-checkblock-blocks">
        {blocks.map((block, index) => (
          <Button
            key={block.label}
            disabled={disabled}
            className={`property-bar-checkblock-block ${block.checked ? 'selected' : ''}`}
            onClick={() => handleBlockClick(index)}
            level="forth"
            type="icon"
            icon={
              <IconfontView
                showType={block.icon}
                customStyle={{
                  color: block.checked ? '#396EFE' : '#33353b'
                }}
              />
            }
          >
            {block.label}
          </Button>
        ))}
      </div>
    </div>
  );
}