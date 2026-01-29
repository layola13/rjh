import React from 'react';

interface Tutorial {
  url: string;
  title: string;
}

interface TutorialListProps {
  tutorials: Tutorial[];
}

export const TutorialList: React.FC<TutorialListProps> = ({ tutorials }) => {
  return (
    <div className="tutorial-list">
      <ul>
        {tutorials.map((tutorial, index) => (
          <li key={index}>
            <a 
              href={tutorial.url} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              {tutorial.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};