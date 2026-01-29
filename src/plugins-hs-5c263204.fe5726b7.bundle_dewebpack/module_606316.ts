const styles = `
.new-guide-wrapper {
    position: fixed;
    z-index: 8888;
    left: 0;
    top: 0;
}

.new-guide-wrapper .mask {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 8888;
}

.new-guide-wrapper .frame {
    outline-style: solid;
    outline-color: rgba(0, 0, 0, 0.4);
    position: absolute;
    border-radius: 8px;
    border: 2px solid #396efe;
    z-index: 8888;
    pointer-events: none;
}

.new-guide-wrapper .popup {
    position: absolute;
    background: #FFFFFF;
    box-shadow: 6px 6px 30px 0px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    pointer-events: all;
}

.new-guide-wrapper .popup.RightTop {
    top: 0;
    left: calc(100% + 8px);
}

.new-guide-wrapper .popup.TopLeft {
    bottom: calc(100% + 8px);
    left: 0;
}

.new-guide-wrapper .popup.BottomRight {
    top: calc(100% + 8px);
    right: 0;
}

.mask-wrapper .mask-item {
    position: fixed;
    z-index: 8888;
}
`;

export default styles;