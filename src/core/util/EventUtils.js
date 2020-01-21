/**
 * Routines for analyzing DOM events' objects
 */
export default class EventUtils {
    /**
     * Determines is device is touch one
     * @returns {boolean}
     */
    static isTouchDevice() {
        return (('ontouchstart' in window)
        || (navigator.MaxTouchPoints > 0)
        || (navigator.msMaxTouchPoints > 0));
    }

    /**
     * Returns between two points
     *
     * @param p1
     * @param p2
     */
    static pointDistance(p1, p2) {
       return Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
    }

    /**
     * Calculates delta between two points
     *
     * @param p1 start point
     * @param p2 end point
     * @param orientation (horizontal|vertical|both) describes whether gesture locked to axis
     *          default both
     * @param speedFactor - multiplier
     * 
     * @returns {*} x and y delta
     */
    static gestureDelta(p1, p2, orientation, speedFactor, threshold) {
        var _orientation = orientation || "both";
        var _threshold   = threshold   || 3;
        var distX = Math.abs(p2.x - p1.x), distY = Math.abs(p2.y - p1.y);
        return {
            x: (_orientation === "vertical" || distX < _threshold ? 0 : p2.x - p1.x) * speedFactor,
            y: (_orientation === "horizontal" || distY < _threshold ? 0 : p2.y - p1.y) * speedFactor
        };
    }
    
    /**
     * Calculates distance between edge fingers
     *
     * @param e DOM event objects
     * @returns {*} average point
     */
    static gestureDistance(e) {
        var fingers = this.getFingersOnSides(e);

        var resultX = fingers.right.pageX  - fingers.left.pageX;
        var resultY = fingers.bottom.pageY - fingers.top.pageY;
        var result = Math.max(resultX, resultY);

        return result * (window.devicePixelRatio || 1);
    }

    /**
     * Calculates center point of gesture
     * 
     * @param e DOM event objects
     * @returns {*} average point
     */
    static gestureCenter(e) {
        var result;
        var fingers;

        if (e.type.indexOf("mouse") !== -1) {
            result = { 
                x: e.clientX, 
                y: e.clientY 
            };
        } else if (e.type.indexOf("touch") !== -1) {
            fingers = this.getFingersOnSides(e);
            if (fingers.total === 1) {
                result = { 
                    x: fingers.left.pageX, 
                    y: fingers.top.pageY 
                };
            } else if (fingers.total >= 2) {
                result = {
                    x: (fingers.left.pageX + fingers.right.pageX) / 2,
                    y: (fingers.top.pageY + fingers.bottom.pageY) / 2
                };
            }
        } 
        // important we should always consider retina display support
        return {
            x: result.x * (window.devicePixelRatio || 1),
            y: result.y * (window.devicePixelRatio || 1)
        };
    }

    /**
     * Calculates left, right, bottom and finger position from all incoming touches
     * 
     * @param e DOM event object
     * @returns {*} edge fingers information
     */
    static getFingersOnSides(e) {
        var result = {}, total;
        var i, length, leftFingerId = 0, rightFingerId = 0, bottomFingerId = 0, topFingerId = 0;
        var leftX, rightX, bottomY, topY;

        console.log(e.type, e.touches.length);

        total = e.touches.length;
        if (total !== 0) {
            leftX = rightX = e.touches[0].pageX;
            bottomY = topY = e.touches[0].pageY;
            for (i = 0, length = total; i < length; i += 1) {
                // X-axis
                if (leftX > e.touches[i].pageX) {
                    leftFingerId = i;
                    leftX = e.touches[i].pageX;
                }
                if (rightX < e.touches[i].pageX) {
                    rightFingerId = i;
                    rightX = e.touches[i].pageX;
                }

                // Y-axis, notice: do not forget that on screen 0 by Y-axis is the highest point
                if (bottomY < e.touches[i].pageY) {
                    bottomFingerId = i;
                    bottomY = e.touches[i].pageY;
                }
                if (topY > e.touches[i].pageY) {
                    topFingerId = i;
                    topY = e.touches[i].pageY;
                }
            }

            result = {
                left: e.touches[leftFingerId],
                right: e.touches[rightFingerId],
                bottom: e.touches[bottomFingerId],
                top: e.touches[topFingerId],
                total: total
            };
        }

        return result;
    }
};
