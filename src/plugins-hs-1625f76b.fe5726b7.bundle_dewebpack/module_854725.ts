const cssContent = `.ceiling-large-view {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0px 2px 16px 0px rgba(144, 149, 163, 0.15);
    z-index: 103;
    overflow: hidden;
}

.ceiling-large-view .ceiling-large-view-content-img {
    width: 320px;
    height: 320px;
    position: relative;
}

.ceiling-large-view .ceiling-large-view-content-info {
    align-items: center;
    flex-direction: row;
    display: flex;
    height: 80px;
    justify-content: flex-start;
}

.ceiling-large-view .ceiling-large-view-content-info .ceiling-large-view-logo {
    margin-left: 16px;
    background-image: url(${require('./assets/logo.png')});
    width: 48px;
    height: 48px;
    background-size: contain;
}

.ceiling-large-view .ceiling-large-view-content-info .ceiling-large-view-label {
    margin: 0 16px;
    font-size: 14px;
    font-weight: bold;
    width: 220px;
}

.ceiling-large-view.ceiling-large-view-hide {
    display: none;
}

.global-en .ceiling-large-view .ceiling-large-view-logo {
    background-image: url(${require('./assets/logo-en.png')});
}`;

export default cssContent;