const styles = `html .popupcontainer .popupwindows-wrapper .md-modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.5s linear;
}
html .popupcontainer .popupwindows-wrapper .md-effect-1 {
    transform: translate(-50%, -50%) scale(0.3);
}
html .popupcontainer .popupwindows-wrapper .md-show.md-effect-1 {
    transform: translate(-50%, -50%) scale(1);
}`;

export default styles;