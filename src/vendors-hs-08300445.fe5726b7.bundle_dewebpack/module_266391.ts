export default function(): boolean {
    return !(typeof window === "undefined" || !window.document || !window.document.createElement);
}