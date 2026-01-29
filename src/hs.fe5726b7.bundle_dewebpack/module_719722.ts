import { requireAsset } from './asset-loader';

interface CSSExport {
  push(item: [string, string, string]): void;
}

const assetLoader = requireAsset(992716);
const cssLoader: CSSExport = requireAsset(986380)(false);

const notSatisfiedIconDefault = requireAsset(595012);
const satisfiedIconDefault = requireAsset(588447);
const notSatisfiedIconHover = requireAsset(194992);
const satisfiedIconHover = requireAsset(941349);

const cssContent = `
.feedback-dialog-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #333;
  padding: 0 28px;
  position: relative;
  font-weight: 500;
}

.feedback-dialog-wrapper .feedback-dialog-title {
  font-size: 14px;
}

.feedback-dialog-wrapper .feedback-dialog-btn {
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span {
  border: 1px solid #d4d7e1;
  border-radius: 2px;
  background-color: #fff;
  margin: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 78px;
  height: 22px;
  cursor: pointer;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span .not-satisfied-icon,
.feedback-dialog-wrapper .feedback-dialog-btn > span .satisfied-icon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 8px;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span .not-satisfied-icon {
  background: url(${assetLoader(notSatisfiedIconDefault)}) center center no-repeat;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span .satisfied-icon {
  background: url(${assetLoader(satisfiedIconDefault)}) center center no-repeat;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span:hover {
  color: #fff;
  background: #396EFE;
  border-color: #396EFE;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span:hover .not-satisfied-icon {
  background: url(${assetLoader(notSatisfiedIconHover)}) center center no-repeat;
}

.feedback-dialog-wrapper .feedback-dialog-btn > span:hover .satisfied-icon {
  background: url(${assetLoader(satisfiedIconHover)}) center center no-repeat;
}

.feedback-dialog-wrapper .close-btn {
  position: absolute;
  top: -5px;
  right: 0;
}
`;

cssLoader.push([module.id, cssContent, ""]);

export default cssLoader;