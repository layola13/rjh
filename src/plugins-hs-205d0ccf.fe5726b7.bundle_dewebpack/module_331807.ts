const imageUrl = require('./path/to/image/751893');

const cssContent = `.spark-pic-image-container {
    position: absolute;
    right: 0;
    top: 44px;
}
.spark-pic-image-container.hide {
    display: none;
}
.spark-pic-image-container .card-container {
    display: flex;
    flex-wrap: wrap;
    padding: 16px 2px 2px 16px;
    border-radius: 10px;
    max-width: 520px;
    max-height: 310px;
    overflow-y: auto;
    /*定义滑块 内阴影+圆角*/
}
.spark-pic-image-container .card-container::-webkit-scrollbar {
    width: 5px;
    height: 6px;
}
.spark-pic-image-container .card-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.3);
}
.spark-pic-image-container .card-container .task {
    margin: 0 16px 12px 0;
}
.spark-pic-image-container .card-container .task:nth-child(3n) {
    margin-right: 4px;
}
.spark-pic-image-container .card-container .task .task-card {
    height: 93px;
    margin-bottom: 0;
}
.spark-pic-image-container .card-container .task .task-card .box {
    width: 150px;
    height: 85px;
}
.spark-pic-image-container .card-container .task .task-card .image-container {
    top: 8px;
}
.spark-pic-image-container .card-container .task .task-card .shadow {
    box-shadow: 2px -2px 6px 0px rgba(0, 0, 0, 0.1);
    top: 4px;
    left: 4px;
}
.spark-pic-image-container .card-container .task .task-card .shadow.index-1 {
    top: 0px;
    left: 8px;
}
.spark-pic-image-container .card-container .task .ant-badge {
    color: white;
}
.spark-pic-image-container .card-container .task:hover .delete-btn {
    opacity: 1;
}
.spark-pic-image-container .card-container .task:hover .click-view-more {
    opacity: 1;
}
.spark-pic-image-container .card-container .task:hover .hover-mask {
    opacity: 1;
}
.spark-pic-image-container .card-container .task .delete-btn {
    position: absolute;
    bottom: 4px;
    right: 4px;
    width: 24px;
    height: 24px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.8);
    opacity: 0;
}
.spark-pic-image-container .card-container .task .click-view-more {
    background-color: #396efe;
    opacity: 0;
    cursor: pointer;
    position: absolute;
    font-size: 12px;
    color: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    height: 30px;
    width: 88px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}
.spark-pic-image-container .card-container .task .hover-mask {
    width: 100%;
    height: calc(100% - 4px*2);
    position: absolute;
    top: 8px;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    border-radius: 10px;
}
.image-browser-icon {
    position: relative;
    height: 30px;
    width: 30px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
}
.image-browser-icon.submitingAnimation {
    animation: submitingAnimationFrame 0.5s ease-in-out;
}
.image-browser-icon .ant-badge {
    margin-top: 5px;
}
.image-browser-icon .ant-badge .ant-badge-dot {
    background: #eb5d46 !important;
    box-shadow: none;
    right: -2px;
}
.image-browser-icon .ribp-btn-badge {
    position: absolute;
    left: 25px;
    background: #eb5d46;
    border-radius: 9px 9px 9px 3px;
    height: 14px;
    font-family: PingFangSC-Regular !important;
    color: #ffffff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0 4px;
    box-sizing: border-box;
    font-size: 12px;
    min-width: 15px;
    max-width: 28px;
}
.image-browser-icon .ribp-btn-badge-doing {
    background-image: url(${imageUrl});
    background-size: 12px 12px;
    width: 12px;
    height: 12px;
    position: absolute;
    margin-left: 30px;
}
.image-browser-icon .doing-icon-move-down {
    top: 15px;
}
.image-browser-tip {
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 12px;
    position: absolute;
    left: -10px;
    width: -moz-fit-content;
    width: fit-content;
    padding: 5px 8px;
    line-height: 16px;
    border-radius: 4px;
    font-weight: 200;
    z-index: 1003;
}
.image-browser-tip::after {
    border: 5px solid transparent;
    border-bottom-color: rgba(0, 0, 0, 0.8);
    content: '';
    position: absolute;
    top: -10px;
    left: 15px;
}
@keyframes submitingAnimationFrame {
    0% {
        background: #4b96ff;
    }
    0% {
        background: linear-gradient(90deg, #327DFF, #4B96FF);
    }
    100% {
        background: white;
    }
}`;

interface CssLoader {
    (useSourceMap: boolean): Array<[string, string, string]>;
    push(data: [string, string, string]): void;
}

const cssLoader: CssLoader = require('./cssLoader');
const result = cssLoader(false);
result.push(['module_331807', cssContent, '']);

export default result;