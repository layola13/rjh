const cssContent = `.thumbnail-view-container {
    position: relative;
    left: 10px;
    height: calc(100% - 10px);
    width: calc(100% - 16px);
    border-radius: 8px;
    overflow: hidden;
}
.thumbnail-view-container .editor2dContainer, 
.thumbnail-view-container .editor3dContainer {
    width: 100%;
    height: 100%;
}
.thumbnail-view-container .thumbnail-view-editor-container {
    width: 100%;
    height: 100%;
    position: absolute;
}
.thumbnail-view-container .thumbnail-view-editor-container.hidden-container {
    visibility: hidden;
}
.thumbnail-view-container .thumbnail-view-aux-container {
    width: 100%;
    height: 100%;
    position: absolute;
}
.thumbnail-view-container .thumbnail-view-aux-container.hidden-container {
    display: none;
}
.thumbnail-view-container .thumbnail-view-topbar {
    display: flex;
    position: absolute;
    top: 0px;
    right: 0px;
    width: 100%;
    justify-content: center;
    align-items: center;
}
.thumbnail-view-container .thumbnail-view-actions {
    display: flex;
    position: absolute;
    bottom: 8px;
    right: 0;
    max-width: 100%;
    justify-content: flex-end;
    padding-right: 8px;
    align-items: center;
    padding-left: 4px;
}
.thumbnail-view-container .thumbnail-view-actions .thumbnail-view-button.ant-btn {
    min-width: auto;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 26px;
    line-height: 26px;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    padding-left: 0px;
    padding-right: 0px;
    border: none;
    border-radius: 12px;
    background: rgba(204, 204, 204, 0.4);
    color: #33353B;
}
.thumbnail-view-container .thumbnail-view-actions .thumbnail-view-button.ant-btn:hover {
    color: #396EFE;
}
.thumbnail-view-container .thumbnail-view-actions .thumbnail-view-button.ant-btn:hover .anticon {
    color: #396EFE !important;
}
.thumbnail-view-container .thumbnail-view-actions .thumbnail-view-button.ant-btn .buttonText {
    padding-left: 6px;
    padding-right: 4px;
    font-size: 12px;
    width: 100%;
}
.thumbnail-view-container .thumbnail-view-actions .thumbnail-view-button.ant-btn .switcher-icon {
    display: flex;
    align-items: center;
    margin-right: 8px;
}
.thumbnail-view-container .thumbnail-view-actions.thumbnail-view-actions-visible {
    visibility: visible;
}
.thumbnail-view-container .thumbnail-view-actions.thumbnail-view-actions-hidden {
    visibility: hidden;
}
.editor > .editor3dContainer, 
.editor > .editor2dContainer {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0px;
    left: 0px;
}
.thumbnailview-draggable .smart-scroll-content {
    height: 100%;
    width: 100%;
}
.thumbnailview-draggable.thumbnail-view-visible {
    visibility: visible;
}
.thumbnailview-draggable.thumbnail-view-hidden {
    visibility: hidden;
}
.thumbnailview-draggable.thumbnail-view-hidden .thumbnail-view-container .thumbnail-view-actions {
    visibility: hidden;
}
.editor3dContainer #aux3d {
    visibility: hidden;
}`;

export default cssContent;