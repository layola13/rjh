interface StepData {
  imageurl?: string;
  txt: string;
  title?: string;
  arrowPosition?: string;
}

interface Position {
  top?: number | string;
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  [key: string]: number | string | undefined;
}

interface StepTipProps {
  showNextStepTip: boolean;
  step: StepData | null;
  position: Position;
  nextStepTip: () => void;
  hideNextbtn?: boolean;
}

declare const ResourceManager: {
  getString(key: string): string;
};

/**
 * StepTip component displays a guided step tooltip with optional image, title, and navigation
 */
export default function StepTip(props: StepTipProps): JSX.Element | null {
  const { showNextStepTip, step, position, nextStepTip, hideNextbtn } = props;

  if (!showNextStepTip || !step) {
    return null;
  }

  const { imageurl, txt, title, arrowPosition } = step;

  return (
    <div className="stepTip" style={{ ...position }}>
      {imageurl && <img className="imageTip" src={imageurl} />}
      
      <div className={`content ${!imageurl && "no-img"}`}>
        {!!title && <div className="title">{title}</div>}
        
        <div className="tipTxt">{txt}</div>
        
        {!hideNextbtn && (
          <div className="nextBtn" onClick={nextStepTip}>
            {ResourceManager.getString("plugin_guide_step_tip_next_btn")}
          </div>
        )}
        
        {arrowPosition && <div className={`dialog-arrow ${arrowPosition}`} />}
      </div>
    </div>
  );
}