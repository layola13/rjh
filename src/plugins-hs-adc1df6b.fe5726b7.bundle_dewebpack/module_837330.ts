interface LabelButtonData {
  title: string;
  [key: string]: unknown;
}

interface LabelButtonProps {
  data: LabelButtonData;
}

const LabelButton: React.FC<LabelButtonProps> = ({ data }) => {
  const { title, ...restData } = data;

  return (
    <div className="property-bar-labelbutton-wrapper">
      <span className="property-bar-labelbutton-label">{title}</span>
      <div className="property-bar-labelbutton-button">
        <Button data={restData} />
      </div>
    </div>
  );
};

export default LabelButton;