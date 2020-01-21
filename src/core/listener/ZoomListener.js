import EventUtils from '../util/EventUtils';
import CanvasWidgetComponentListener from './CanvasWidgetComponentListener';

const DEFAULT_OPTIONS = {
    mouseWheelScaleDiff: 0.1
};

/**
 * Zoom gesture listener.
 * Updates related controllers' view scale and controllers state itself
 */
export default class ZoomListener extends CanvasWidgetComponentListener{
    /**
     * Contructor
     *
     * @see CanvasWidgetComponentListener
     */
    constructor(canvas, options, externalCallback) {
        super(canvas, Object.assign({}, DEFAULT_OPTIONS, options), externalCallback);
        this.initListener();
    }

    initListener() {
        if (EventUtils.isTouchDevice()) {
            this.canvas.addEventListener("touchstart", this._handlePress.bind(this));
            this.canvas.addEventListener("touchmove", this._handleMove.bind(this));
        } else {
            this.canvas.addEventListener("touchend", this._handleRelease.bind(this));
            this.canvas.addEventListener("mousewheel", this._handleMouseWheelEvent.bind(this));
        }
    }
    
    releaseListener() {
        if (EventUtils.isTouchDevice()) {
            this.canvas.removeEventListener("touchstart", this._handlePress.bind(this));
            this.canvas.removeEventListener("touchmove", this._handleMove.bind(this));
        } else {
            this.canvas.removeEventListener("touchend", this._handleRelease);
            this.canvas.removeEventListener("mousewheel", this._handleMouseWheelEvent);
        }
    }

    _handlePress = (e) => {
        if (e.touches.length >= 2) {
            this._gestureDistance = EventUtils.gestureDistance(e);
        }
    };

    _handleMove = (e) => {
        if (e.touches.length >= 2) {
            e.preventDefault();
            e.stopPropagation();
            let _currentGestureDistance = EventUtils.gestureDistance(e);
            let _zoomFactor = _currentGestureDistance / this._gestureDistance;
            this._gestureDistance = _currentGestureDistance;
            this.externalCallback(_zoomFactor);
        }
    };

    _handleRelease = (e) => {
        if (e.touches.length === 1) {
            /*for (var idx = 0; idx < this.controllers.length; idx++) {
                this.controllers[idx].handleViewReleased(null);
            }*/
        }
    };

    _handleMouseWheelEvent = (e) => {
        // we can use Alt key if scroll should be blocked (for example chart within the scrollable container)
        if (e.altKey) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        const currentZoomFactor = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))) > 0
            ? (this.options.mouseWheelScaleDiff + 1) : (1 - this.options.mouseWheelScaleDiff);
        this.externalCallback(currentZoomFactor, e.offsetX, e.offsetY);
    };
}