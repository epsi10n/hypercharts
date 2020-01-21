import {Container} from "createjs-collection";

/**
 * Creates a copy fro given display object
 */
export default class Replicator {
    constructor() {}

    /**
     * Creates a copy of given display object
     *
     * @param displayObject CreateJS display object
     */
    replicate(displayObject) {
        let resObject = displayObject.clone(true);
        this._copySignificantFields(displayObject, resObject);

        if (displayObject instanceof Container) {
            for (let childIdx = 0; childIdx < displayObject.children.length; childIdx++) {
                resObject.addChild(this.replicate(resObject.getChildAt(childIdx)));
            }
        }

        return resObject;
    }

    _copySignificantFields(srcObj, destObj) {
        destObj.x = srcObj.x;
        destObj.y = srcObj.y;
        destObj.scaleX = srcObj.scaleX;
        destObj.scaleY = srcObj.scaleY;
        destObj.alpha = srcObj.alpha;
        destObj.dataSourceIdx = srcObj.dataSourceIdx;
    }
}
