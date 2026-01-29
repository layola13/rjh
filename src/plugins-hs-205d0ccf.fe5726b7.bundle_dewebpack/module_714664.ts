interface CSSModule {
  id: string;
  push: (content: [string, string]) => void;
}

interface CSSExports {
  (hotReload: boolean): CSSModule;
}

const cssContent = `
.recommend-collocations-dialog-container {
  position: absolute;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 4px 16px 0px rgba(25, 25, 50, 0.15);
  border-radius: 10px;
  bottom: 5px;
}

.recommend-collocations-dialog-container span,
.recommend-collocations-dialog-container div {
  box-sizing: border-box;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog {
  transition: 0.2s;
  width: 280px;
  background-color: #ffffff;
  z-index: 110;
  height: 300px;
  display: flex;
  flex-direction: column;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog__nobutton {
  height: auto;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-header {
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  display: grid;
  grid-template-columns: 158px 82px 10px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-header .recommend-header-title {
  color: #33353b;
  font-size: 14px;
  padding: 12px 15px;
  font-weight: bold;
  height: 20px;
  line-height: 20px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-header .recommend-header-noShow {
  font-size: 12px;
  color: #53383B;
  opacity: 50%;
  text-decoration: underline;
  cursor: pointer;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-header .recommend-header-noShow:hover {
  opacity: 100%;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  padding: 3px 15px 11px 15px;
  border-radius: 10px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-auto-recommend,
.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-recommend-accessories {
  height: 30px;
  width: 121px;
  line-height: 30px;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  color: #33353b;
  font-size: 12px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-auto-recommend .recommend-collocations-icon,
.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-recommend-accessories .recommend-collocations-icon {
  margin-top: 3px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-auto-recommend .homestyler-smart-text,
.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-recommend-accessories .homestyler-smart-text {
  text-align: left;
  margin-left: 4px;
  width: 65px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-auto-recommend:hover,
.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-recommend-accessories:hover {
  background: #396efe;
  color: white;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-auto-recommend:hover .anticon,
.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .recommend-collocations-header-recommend-accessories:hover .anticon {
  color: white !important;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog .recommend-collocations-buttons .have-two-btns {
  margin-right: 8px;
}

.recommend-collocations-dialog-container .recommend-collocations-dialog.recommend-collocations-dialog-hide {
  height: 0;
  bottom: -20px;
  position: relative;
}

.recommend-position-ezhome {
  left: 60px;
}

.recommend-position-global {
  left: 66px;
}
`;

export default cssContent;