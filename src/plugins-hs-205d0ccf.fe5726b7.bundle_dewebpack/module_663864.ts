const styles = `
.teaching-view {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: default;
    position: relative;
}

.teaching-view .teaching-top-wrapper {
    flex: 0 0 62px;
}

.teaching-view .teaching-content-wrapper {
    flex-basis: 100%;
    flex-shrink: 1;
    flex-grow: 1;
    position: relative;
    overflow: hidden;
}

.teaching-view .view-wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}

.teaching-view .teaching-loading-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
}

.teaching-view .to-top-btn {
    position: absolute;
    right: 18px;
    bottom: 35px;
}

.teaching-view .ps__rail-y {
    background: transparent !important;
}
`;

export default styles;