import { IconfontView } from './IconfontView';

interface MgmModalProps {
  url?: string;
  onClose?: () => void;
}

export default function MgmModal({ url = "/mgm", onClose }: MgmModalProps): JSX.Element {
  return (
    <div className="mgm-modal">
      <div className="mgm-content">
        {onClose && (
          <div className="close-btn" onClick={onClose}>
            <IconfontView
              showType="hs_shuidian_peidian_duanluqi1"
              customStyle={{
                fontSize: "20px"
              }}
            />
          </div>
        )}
        <iframe className="mgm-iframe" src={url} />
      </div>
    </div>
  );
}