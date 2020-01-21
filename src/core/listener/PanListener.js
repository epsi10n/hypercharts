import EventUtils from '../util/EventUtils';
// import CanvasMomentumTracker from '../physics/CanvasMomentumTracker';
import CanvasWidgetComponentListener from './CanvasWidgetComponentListener';

const DEFAULT_OPTIONS = {
    orientation : "horizontal",
    speedFactor: 1,
    momentumEnabled: true,
    threshold: 1
};

/**
 * Pan gesture listener.
 * Updates related controllers state
 */
export default class PanListener extends CanvasWidgetComponentListener {
    /**
     * Contructor
     * 
     * @see CanvasWidgetComponentListener
     */
    constructor(canvas, options, externalCallback) {
        super(canvas, Object.assign({}, DEFAULT_OPTIONS, options), externalCallback);
        
        /*if (this.options.momentumEnabled) {
            this._momentumTracker = new CanvasMomentumTracker(this.options);
        }*/
        
        this.initListener();
    }

    initListener () {
        if (EventUtils.isTouchDevice()) {
            this.canvas.addEventListener("touchstart", this._handlePress.bind(this));
            this.canvas.addEventListener("touchmove",  this._handleMove.bind(this));
            this.canvas.addEventListener("touchend",   this._handleRelease.bind(this));
        } else {
            this.canvas.addEventListener("mousedown",  this._handlePress.bind(this));
            this.canvas.addEventListener("mousemove",  this._handleMove.bind(this));
            this.canvas.addEventListener("mouseup",    this._handleRelease.bind(this));
            this.canvas.addEventListener("mouseout",   this._handleRelease.bind(this));
        }
    }

    relaseListener() {
        if (EventUtils.isTouchDevice()) {
            this.canvas.removeEventListener("touchstart", this._handlePress);
            this.canvas.removeEventListener("touchmove",  this._handleMove);
            this.canvas.removeEventListener("touchend",   this._handleRelease);
        } else {
            this.canvas.removeEventListener("mousedown",  this._handlePress);
            this.canvas.removeEventListener("mousemove",  this._handleMove);
            this.canvas.removeEventListener("mouseup",    this._handleRelease);
            this.canvas.removeEventListener("mouseout",   this._handleRelease);
        }
    }

    _handlePress(e) {
        this.isPressed = true;
        // start/current/previous gesture points
        this.startPoint = this.currentPoint = this.previousPoint = EventUtils.gestureCenter(e);

        // reset momentum tracker if enabled
        /*if (this._momentumTracker) {
            this._momentumTracker.resetMomentumTracker(this.startPoint);
        }*/
    }

    _handleMove(e){
        if (!this.isPressed) {
            return;
        }
        
        this.previousPoint = this.currentPoint;
        this.currentPoint = EventUtils.gestureCenter(e);

        let rawDelta = EventUtils.gestureDelta(this.previousPoint, this.currentPoint,
            "both", 1, 0);

        // region Axis locking
        if (rawDelta.y * 2 > rawDelta.x && this.options.orientation === "vertical") { // vertical only
            e.preventDefault();
            e.stopPropagation();
        }
        if (rawDelta.x * 2 > rawDelta.y && this.options.orientation === "horizontal") { // horizontal only
            e.preventDefault();
            e.stopPropagation();
        }
        // endregion

        let delta = EventUtils.gestureDelta(this.previousPoint, this.currentPoint,
            this.options.orientation, this.options.speedFactor, this.options.threshold);

        // update momentum position if enabled
        /*if (this._momentumTracker) {
            this._momentumTracker.updateEventCenter(this.currentPoint);
        }*/
        
        this.externalCallback(delta);
    }

    _handleRelease(e){
        if (!this.isPressed) {
            return false;
        }
        if (e.type.indexOf("mouse") !== -1 || (e.touches.length === 0)) {
            this.isPressed = false;
            /*for (var idx = 0; idx < this.controllers.length; idx++) {
                // update momentum position if enabled
                if (this._momentumTracker) {
                    this.controllers[idx].handleViewMomentumMoved(this._momentumTracker.calculateLatestMomentum());
                }
            }*/
        }
    }
}