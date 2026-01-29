import React from 'react';

interface DropdownItem {
  label: string;
  content: string;
}

interface DropdownProps {
  items: DropdownItem[];
}

export const Dropdown: React.FC<DropdownProps> = ({ items }) => {
  return (
    <div className="dropdown-container">
      {items.map((item, index) => (
        <div key={index} className="dropdown-item">
          <label htmlFor={`toggle${index}`}>
            {`${index + 1}. ${item.label}`}
          </label>
          <div className="dropdown-arrow" />
          <div className="dropdown-content">
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};