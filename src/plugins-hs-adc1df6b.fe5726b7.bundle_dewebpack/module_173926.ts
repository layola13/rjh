const cssContent = `#community-share-div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    z-index: 4000;
}
#community-share-div .close-share-area {
    position: absolute;
    top: 0;
    right: 0;
    height: 80px;
    width: 80px;
    z-index: 2;
    cursor: pointer;
    transition: all 0.5s;
}
#community-share-div .close-share-area.disable-access {
    display: none;
}
#community-share-div .close-share-area .close-share {
    position: absolute;
    top: 40px;
    right: 40px;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    padding: 4px;
    color: #33353B;
    font-size: 30px;
    background-color: transparent;
    display: flex;
    justify-content: center;
    align-items: center;
}
#community-share-div .close-share-area:hover .close-share {
    background-color: rgba(0, 0, 0, 0.04);
}
#community-share-div .close-share-area:active .close-share {
    color: #327DFF;
    background-color: rgba(0, 0, 0, 0.04);
}
.community-share-frame-container {
    text-align: center;
    width: 100%;
    height: 100%;
    position: relative;
    top: 0;
    left: 0px;
    transition: all 0.5s;
}
.community-share-frame-container .community-share-frame-mask {
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0.7), #ffffff);
    backdrop-filter: blur(6px);
    left: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    display: block;
}
.community-share-frame-container .community-share-frame {
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #5f5f5f;
    margin: auto;
    top: 0px;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    border-radius: 6px;
    transition: all 0.5s;
}`;

export default cssContent;