import {Ease, Tween} from 'createjs-collection';

/**
 * Various tweening routines
 */
export default class AnimationUtils {
    /**
     * Applies momentum effect to scroll container of given display controller
     * 
     * @param controller controller instance to apply
     * @param amplitude momentum distance
     */
    static playMomentumTween(controller, amplitude) {
        var targetX, targetY;
        var tweenObj = controller.view.getScrollContainer();
        targetX = tweenObj.x + amplitude.x;
        targetY = tweenObj.y + amplitude.y;
        Tween.get(tweenObj, {loop: false, override: true, onChange: function() {
           controller.relocateContainers();
        }}).to({x: targetX, y: targetY}, 1250, Ease.quartOut);
    }

    /**
     * Overrides animation flow on scroll container of given controller
     * in order to stop momentum or bounce effect
     * 
     * @param controller controller instance to override
     */
    static stopMomentumOrBounceTween(controller) {
        Tween.get(controller.view.getScrollContainer(), {loop: false, override: true}).wait(0);
    }

    /**
     * Applies bounce effect to scroll container of given display controller
     * 
     * @param controller controller instance to apply
     * @param amplitude bounce distance
     */
    static playBounceTween(controller, amplitude, callback) {
        var targetX, targetY;
        var tweenObj = controller.view.getScrollContainer();
        targetX = tweenObj.x - amplitude.x;
        targetY = tweenObj.y - amplitude.y;
        Tween.get(tweenObj, {loop: false, override: true})
            .to({x: targetX, y: targetY}, 250, Ease.quartOut).call(function() {
        }).call(() => {if (callback) {callback();}});
    }
};