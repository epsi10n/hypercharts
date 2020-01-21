/**
 * Abstract listener for canvas component (container)
 */
export default class CanvasWidgetComponentListener {
    /**
     * Constructor
     *
     * @param canvas - DOM Canvas to attach
     * @param options - Options of handling
     * @param externalCallback - user provided callback function
     */
    constructor(canvas, options, externalCallback) {
        this.canvas = canvas;
        this.options = options;
        this.externalCallback = externalCallback
    }

    /**
     * Release event listener routine
     */
    releaseListener() {}
}