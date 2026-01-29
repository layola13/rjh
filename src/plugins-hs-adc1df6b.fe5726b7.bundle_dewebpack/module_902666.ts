interface NoChoiceViewData {
  className?: string;
  hint?: string;
  src?: string;
}

interface NoChoiceViewProps {
  data: NoChoiceViewData;
}

export default function NoChoiceView({ data }: NoChoiceViewProps): JSX.Element {
  const { 
    className = "", 
    hint = "No Result", 
    src = "" 
  } = data;

  return (
    <div className={`noChoiceView ${className}`}>
      <img src={src} />
      <div className="hintText">
        <span>{hint}</span>
      </div>
    </div>
  );
}