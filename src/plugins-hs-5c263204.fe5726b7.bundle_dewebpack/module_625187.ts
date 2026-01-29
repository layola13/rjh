const cssContent = `.feedback-uploader-block-uploader {
    margin-top: 30px;
}
.feedback-uploader-block-uploader-area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    color: #000;
    height: 84px;
    width: 84px;
    border: 1px solid #D4D7E1;
    border-radius: 8px;
    cursor: pointer;
}
.feedback-uploader-block-uploader-area > span.anticon {
    font-size: 20px;
}
.feedback-uploader-block-uploader-area-tip {
    font-size: 12px;
    margin-top: 4px;
}
.feedback-uploader-block-uploader-list {
    display: flex;
    flex-wrap: wrap;
}
.feedback-uploader-block-uploader-item {
    width: 84px;
    height: 84px;
    border: 1px solid #D4D7E1;
    border-radius: 8px;
    overflow: hidden;
    margin-right: 12px;
    position: relative;
}
.feedback-uploader-block-uploader-item > img {
    width: 100%;
    height: 100%;
}
.feedback-uploader-block-uploader-item-close {
    visibility: hidden;
    position: absolute;
    top: 0;
    right: 0;
}
.feedback-uploader-block-uploader-item:hover .feedback-uploader-block-uploader-item-close {
    visibility: visible;
}
.feedback-uploader-block.feedback-black .feedback-uploader-block-uploader-list .feedback-uploader-block-uploader-item, 
.feedback-uploader-block.feedback-black .feedback-uploader-block-uploader-list .feedback-uploader-block-uploader-area {
    border: none;
    background: rgba(255, 255, 255, 0.06);
    color: rgba(255, 255, 255, 0.86);
}`;

interface CssModule {
    push(entry: [string, string]): void;
}

interface CssLoaderFactory {
    (sourceMap: boolean): CssModule;
}

interface ModuleExports {
    id: string;
}

export function initializeCssModule(
    cssLoaderFactory: CssLoaderFactory,
    moduleExports: ModuleExports
): void {
    const cssModule = cssLoaderFactory(false);
    cssModule.push([moduleExports.id, cssContent]);
}