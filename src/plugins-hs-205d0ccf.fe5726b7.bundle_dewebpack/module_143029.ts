const styles = `
.grid-viewer-card:hover .card-checkbox {
    opacity: 1;
}

.grid-viewer-card:hover .click-view-more {
    opacity: 1;
}

.grid-viewer-card:hover .hover-mask {
    opacity: 1;
}

.grid-viewer-card .card-checkbox {
    position: absolute;
    top: 8px;
    right: 8px;
    opacity: 0;
    z-index: 1;
}

.grid-viewer-card .checked {
    opacity: 1;
}

.grid-viewer-card .click-view-more {
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
    width: -moz-fit-content;
    width: fit-content;
    min-width: 100px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
}

.grid-viewer-card .hover-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: 0;
    border-radius: 8px;
}
`;

export default styles;