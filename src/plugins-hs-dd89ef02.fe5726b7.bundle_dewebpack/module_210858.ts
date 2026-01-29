interface CSSExports {
  push(item: [string, string, string]): void;
}

const imageUrl: string = require('./803522');

const cssModule = require('./986380')(false) as CSSExports;

cssModule.push([
  module.id,
  `.questionnaire-iframe-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 5000;
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
  .questionnaire-iframe-wrapper .beginner-guide-new-close {
    position: absolute;
    top: 40px;
    right: 40px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 22px;
    height: 22px;
    background-image: url(${imageUrl});
    background-repeat: no-repeat;
    background-position: center;
    cursor: pointer;
  }
  .questionnaire-iframe-wrapper .questionnaire-loading-wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .questionnaire-iframe-wrapper .questionnaire-iframe {
    width: 100%;
    height: 100%;
  }`,
  ''
]);

export default cssModule;