interface CSSExports {
  push(item: [string, string]): void;
  id: string;
}

const imageUrlHelper = require('./image-url-helper');
const cssModuleFactory: (sourceMap: boolean) => CSSExports = require('./css-module-factory');

const cssModule: CSSExports = cssModuleFactory(false);

const guideEzhomeImageUrl = imageUrlHelper(require('./guide-ezhome-image'));
const guideFpImageUrl = imageUrlHelper(require('./guide-fp-image'));
const arrowDefaultImageUrl = imageUrlHelper(require('./arrow-default-image'));
const arrowHoverImageUrl = imageUrlHelper(require('./arrow-hover-image'));

const cssContent = `
.guide-global .popup {
    pointer-events: visible;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.66);
    z-index: 4900;
}

.guide-global .popup .content {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 900px;
    height: 600px;
    text-align: center;
    border-radius: 10px;
    color: #19191e;
}

.guide-global .popup .content .guide-ezhome {
    background: url(${guideEzhomeImageUrl}) center center no-repeat;
}

.guide-global .popup .content .guide-fp {
    background: url(${guideFpImageUrl}) center center no-repeat;
}

.guide-global .popup .content .guidebg {
    width: 900px;
    height: 600px;
    background-size: contain;
    border-radius: 8px;
}

.guide-global .popup .content .guidebg .guidebg-close-btn {
    cursor: pointer;
    display: block;
    position: absolute;
    right: 35px;
    top: 26px;
    width: 30px;
    border-radius: 15px;
    height: 30px;
    background: rgba(0, 0, 0, 0);
}

.guide-global .popup .content .guidebg .guidebg-close-btn:hover {
    background: rgba(0, 0, 0, 0.04);
}

.guide-global .popup .content .guidebg .guidebtn {
    cursor: pointer;
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    bottom: 97px;
    width: 186px;
    height: 56px;
}

.guide-global .popup .new-user-guide-dialog {
    width: 830px;
    top: 50%;
    left: 50%;
    position: relative;
    transform: translate(-50%, -50%);
    box-sizing: content-box;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    background-color: #fff;
    border-radius: 8px;
    color: #19191e;
    flex-direction: column;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-title {
    position: relative;
    width: 100%;
    height: 50px;
    background: linear-gradient(45deg, #e1a26d 0%, #cd9160 100%);
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    align-self: flex-start;
    border-radius: 8px 8px 0 0;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-title span {
    position: relative;
    font-size: 20px;
    color: white;
    left: 30px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 36px 0;
    width: 100%;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-header {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-header .guide-header-checkbox {
    width: 38px;
    height: 38px;
    background: #50c819;
    border-radius: 19px;
    display: inline-flex;
    align-items: center;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-header .guide-header-checkbox::after {
    content: '';
    display: inline-flex;
    position: relative;
    top: -2px;
    left: 14px;
    width: 10px;
    height: 17px;
    border-bottom: 2px solid #fff;
    border-right: 2px solid #fff;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-header .guide-header-label {
    font-size: 24px;
    margin-left: 10px;
    font-weight: bold;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations {
    display: inline-flex;
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 222px;
    margin-top: 58px;
    box-sizing: border-box;
    padding: 0 56px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-head {
    font-size: 12px;
    display: inline-flex;
    font-weight: bold;
    position: relative;
    top: -4px;
    font-family: PingFangSC-Medium !important;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item {
    display: inline-flex;
    align-items: center;
    flex-direction: row;
    padding: 16px 24px;
    height: 60px;
    text-decoration: none;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item:not(:first-child) {
    margin-top: 8px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item .guide-recommendations-item-img {
    background-size: cover;
    margin-right: 20px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item .guide-recommendations-item-info {
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: space-between;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item .guide-recommendations-item-info .guide-recommendations-item-title {
    color: #242429;
    font-size: 24px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item .guide-recommendations-item-info .guide-recommendations-item-desc {
    color: #19191e;
    font-size: 14px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item .guide-recommendations-item-arrow {
    margin-left: 20px;
    display: inline-block;
    width: 28px;
    height: 28px;
    background: url(${arrowDefaultImageUrl});
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item:hover {
    background-color: #f7f8fd;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-item:hover .guide-recommendations-item-arrow {
    background: url(${arrowHoverImageUrl});
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-foot {
    font-family: PingFangSC-Medium !important;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    bottom: -40px;
    color: #327dff;
    position: relative;
    font-weight: bold;
    font-size: 12px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-foot::before {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transform: rotate(45deg);
    border-top: 1px solid #327dff;
    border-right: 1px solid #327dff;
    height: 6px;
    width: 6px;
    content: '';
    right: -13px;
    top: 3px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-recommendations .guide-recommendations-foot::after {
    position: absolute;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    transform: rotate(45deg);
    border-top: 1px solid #327dff;
    border-right: 1px solid #327dff;
    height: 6px;
    width: 6px;
    content: '';
    right: -17px;
    top: 3px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-communications {
    position: relative;
    margin-top: 16px;
    color: #cb7f46;
    font-family: PingFang-SC-Regular !important;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-buttons {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    margin-top: 64px;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-buttons .imageBtn {
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 150px;
    height: 30px;
    font-size: 12px;
    color: #ffa023;
    text-align: center;
    text-decoration: none;
    line-height: 30px;
    border-radius: 2px;
    background: #fff;
    border: 1px solid #ffa023;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-buttons .linkbtn {
    position: relative;
    z-index: 1;
    display: inline-block;
    width: 150px;
    height: 30px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    text-decoration: none;
    line-height: 30px;
    border-radius: 2px;
    background: linear-gradient(270deg, #f8c14f 0%, #ffa023 100%);
    border: none;
}

.guide-global .popup .new-user-guide-dialog .new-user-guide-dialog-content .guide-buttons button {
    background: #242429;
    border-radius: 50px;
    color: #fff;
    font-size: 28px;
    padding: 14px 86px;
    border: none;
    outline: none;
}

.global-en .guide-global .popup .content .guidebg .guidebg-close-btn {
    background: rgba(59, 111, 255, 0.9);
}

.global-en .guide-global .popup .content .guidebg .guidebg-close-btn:hover {
    background: rgba(59, 111, 255, 0.88);
}

.global-en .guide-global .popup .content .guidebg .guidebtn {
    bottom: 90px;
    width: 334px;
    height: 60px;
    opacity: 0;
}
`;

cssModule.push([cssModule.id, cssContent]);

export default cssModule;