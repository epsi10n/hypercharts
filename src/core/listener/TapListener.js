import EventUtils from '../util/EventUtils';
import CanvasWidgetComponentListener from './CanvasWidgetComponentListener';

const DEFAULT_OPTIONS = {
    tapCount: 1,
    maxMsDelayOnTap: 300,
    maxMsDelayBetweenTaps: 200,
    threshold: 5
};

/**
 * Configurable click gesture listener 
 */
export default class TapListener extends CanvasWidgetComponentListener {
    /**
     * Contructor
     *
     * @see CanvasWidgetComponentListener
     */
    constructor(canvas, options, externalCallback) {
        super(canvas, Object.assign({}, DEFAULT_OPTIONS, options), externalCallback);

        // TODO momentum implementation
        if (this.options.momentumEnabled) {
            // this._momentumTracker = new CanvasMomentumTracker(this.options);
        }

        this._tapCountertimeoutId = -1;
        this._tapCount = 0;

        this.initListeners();
    }

    initListeners() {
        if (EventUtils.isTouchDevice()) {
            this.canvas.addEventListener("touchstart", this._handlePress.bind(this));
            this.canvas.addEventListener("touchmove", this._handleMove.bind(this));
            this.canvas.addEventListener("touchend", this._handleRelease.bind(this));
        } else {
            this.canvas.addEventListener("mousedown",  this._handlePress.bind(this));
            this.canvas.addEventListener("mousemove",  this._handleMove.bind(this));
            this.canvas.addEventListener("mouseup",  this._handleRelease.bind(this));
        }
    }
    
    releaseListener() {
        if (EventUtils.isTouchDevice()) {
            this.canvas.removeEventListener("touchstart", this._handlePress);
            this.canvas.removeEventListener("touchmove", this._handleMove);
            this.canvas.removeEventListener("touchend", this._handleRelease);
        } else {
            this.canvas.removeEventListener("mousedown",  this._handlePress);
            this.canvas.removeEventListener("mousemove",  this._handleMove);
            this.canvas.removeEventListener("mouseup",  this._handleRelease);
        }
    }

    _handlePress = (e) => {
        this.isPressed = true;
        // start/current/previous gesture points
        this.startPoint = EventUtils.gestureCenter(e);
        this.endPoint = Object.assign({}, this.startPoint);
        this._startTime = Date.now();
        if (this._tapCount === this.options.tapCount) {
            this._tapCount = 0;
        }
        ++this._tapCount;
        clearTimeout(this._tapCountertimeoutId);
        this._tapCountertimeoutId = setTimeout(function() {
            this._tapCount = 0;
        }.bind(this), this.options.maxMsDelayBetweenTaps);
    };

    _handleMove = (e) => {
        this.endPoint = EventUtils.gestureCenter(e);
    };
    
    _handleRelease = (e) => {
        e.preventDefault();
        this._isPressed = false;
        this._endTime = Date.now();
        
        let dist = EventUtils.pointDistance(this.startPoint, this.endPoint);
        let time = this._endTime - this._startTime;
        
        let callbackData = {};
        
        this.externalCallback(callbackData);
    };
}