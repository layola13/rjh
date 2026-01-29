const styles = `
.queueing-card .card-label {
    position: absolute;
    width: 100%;
    font-size: 14px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 77px;
    font-weight: bold;
    top: 0;
    text-align: center;
    z-index: 1;
}

.queueing-card .hover-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    opacity: 1;
}
`;

export default styles;