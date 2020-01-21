import CanvasWidgetComponentListener from './CanvasWidgetComponentListener';

/**
 * Window resize event listener
 */
export default class ResizeListener extends CanvasWidgetComponentListener {
    /**
     * Contructor
     *
     * @see CanvasWidgetComponentListener
     */
    constructor(canvas, externalCallback) {
        super(canvas, {}, externalCallback);
        this.initListener();
        this._resizeTimeoutId = -1;
    }
    
    initListener() {
        window.addEventListener("resize", this._handleResize);
    }
    
    
    
    releaseListener() {
        window.removeEventListener("resize", this._handleResize);
    }
    
    _handleResize = () => {
        clearTimeout(this._resizeTimeoutId);
        this._resizeTimeoutId = setTimeout(this._handleResizeCore, 250);
    };
    
    _handleResizeCore = () => {
        this.canvas.width = this.canvas.offsetWidth * (window.devicePixelRatio || 1);
        this.canvas.height = this.canvas.offsetHeight * (window.devicePixelRatio || 1);

        this.externalCallback();
    };
}