const DEFAULT_OPTIONS = {
    orientation : "both",
    momentumThresholdX: 500,
    momentumThresholdY: 250
};

/**
 * Tracks movement velocity in order to calculate momentum for UX needs
 */
export default class CanvasMomentumTracker {
    /**
     * Default constructor
     * 
     * @param options- tracker options
     */
    constructor(options) {
        this.options = Object.assign({}, DEFAULT_OPTIONS, options);
        this._momentumClock = -1;
        this._pixelRatio = window.devicePixelRatio || 1;
    }

    /**
     * Turns to default state and starts new session of tracking
     * @param gestureStartPoint - start position of gesture
     */
    resetMomentumTracker = (gestureStartPoint) => {
        this._gestureCenter = gestureStartPoint;
        this._startMovePosition = this._momentumFrame = this._gestureCenter;
        this._momentumVelocity = this._momentumAmplitude = {x: 0, y: 0};
        this._momentumTimestamp = Date.now();
        clearInterval(this._momentumClock);
        this._momentumClock = setInterval(function() {this._trackMomentum() }.bind(this), 25);
     };
      
     /**
      * As usually called implicitly by setInterval() routine
      * Updates current momentum characteristics,
      * during continious user event handling
      * 
      * @private called periodically by tracker itself
      */
     _trackMomentum = () => {
         var elapsed = Date.now() - this._momentumTimestamp;
         var vel = {x: 0, y: 0};

         var delta = {
             x: this._gestureCenter.x - this._momentumFrame.x,
             y: this._gestureCenter.y - this._momentumFrame.y
         };

         this._momentumFrame = this._gestureCenter;

         vel.x = 1000 * delta.x / (1 + elapsed);
         vel.y = 1000 * delta.y / (1 + elapsed);
         this._momentumVelocity = {x: Math.abs(vel.x) < this.options.momentumThresholdX ? 0 : (0.8 * vel.x + 0.2 * this._momentumVelocity.x),
                                  y: Math.abs(vel.y) < this.options.momentumThresholdY ? 0 : (0.8 * vel.y + 0.2 * this._momentumVelocity.y)};
     };

     /**
      * Must be called explicitly by the user of this class
      * whenever move event hadling proceeded
      * 
      * @param currentGesturePoint - movement delta
      */
     updateEventCenter = (currentGesturePoint) => {
         this._gestureCenter = currentGesturePoint;
     };

     /**
      * Must be called when touchend or mouseup events fired
      * applies tween to animate container/shape object
      * 
      * @return {*} distance of momentum
      */
     calculateLatestMomentum = () => {
        clearInterval(this._momentumClock);
        // check the threshold
        this._momentumVelocity = {
          x: (Math.abs(this._gestureCenter.x - this._startMovePosition.x) <= (15 * this._pixelRatio) ? 0 : this._momentumVelocity.x),
          y: (Math.abs(this._gestureCenter.y - this._startMovePosition.y) <= (15 * this._pixelRatio) ? 0 : this._momentumVelocity.y)
        };
        // calculate target momentum point
        // if velocity is large enough to play momentum
        if (Math.sqrt(this._momentumVelocity.x * this._momentumVelocity.x + this._momentumVelocity.y * this._momentumVelocity.y) > 10) { 
            this._momentumAmplitude = {x: 0.8 * this._momentumVelocity.x, 
                                       y: 0.8 * this._momentumVelocity.y};      
            
        }
        
        return {
            x: (this.options.orientation === "vertical"   ? 0 : this._momentumAmplitude.x),
            y: (this.options.orientation === "horizontal" ? 0 : this._momentumAmplitude.y)
        };
     };
}

module.exports = CanvasMomentumTracker;