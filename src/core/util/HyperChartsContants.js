module.exports = {
    SELECTION_MODE: {
        NONE: "none",
        SINGLE_SELECTION: "single",
        INTERVAL_SELECTION: "interval",
        MULTIPLE_SELECTION: "multiple"
    },
    SELECTION_STATE: {
        NORMAL:     "normal",
        SELECTED:   "selected",
        UNSELECTED: "unselected"
    },
    ORIENTATION: {
        HORIZONTAL: "horizontal",
        VERTICAL: "vertical",
        BOTH: "both"
    },
    ANCHOR: {
        NORTH: "north",
        SOUTH: "south",
        WEST:  "west",
        EAST:  "east",
        NORTH_WEST: "north-west",
        NORTH_EAST: "north-east",
        SOUTH_WEST: "south-west",
        SOUTH_EAST: "south-east",
        MIDDLE: "middle"
    },
    VALUE_RENDER_TYPE: {
        EMPTY: "empty",
        BAR: "bar",
        AERIAL_BAR: "aerial-bar",
        LINE: "line",
        AERIAL_LINE: "aerial-line",
        SPLINE: "spline",
        AERIAL_SPLINE: "aerial-spline",
        CANDLESTICK: "candlestick",
        SCATTER: "scatter",
        HEIGHT_FUNNEL: "height-funnel",
        AREA_FUNNEL: "area-funnel",
        ALERT: "alert",
        CUSTOM: "custom",
        TEXT: "text"
    },
    SCATTER_SHAPE_TYPES: {
        CIRCLE:  "circle",
        DIAMOND: "diamond",
        SQUARE:  "square",
        TRIANGLE: "triangle"
    },
    VALUE_RENDERER_ALIGNMENT: {
        POSITIVE: "positive",
        NEGATIVE: "negative",
        CENTER:   "center"
    },
    QUALITY: {
        LOW: "low",
        MEDIUM: "medium",
        HIGH: "high"
    },
    PAINT_TYPES: {
        SOLID: "solid",
        LINEAR_GRADIENT: "linear-gradient",
        RADIAL_GRADIENT: "radial-gradient",
        TEXTURE: "texture"
    },
    SERIES_TYPES: {
        STATIC: "static",
        DYNAMIC: "dynamic"
    },
    ANIMATION_SCOPE: {
        CHILDREN:  "children",
        CONTAINER: "container"
    },
    ANIMATION_STATE: {
        PRE_INITIAL:  "preInitial",
        POST_INITIAL: "postInitial",
        PRE_UPDATE:   "preUpdate",
        POST_UPDATE:  "postUpdate",
        PRE_SWITCH:   "preSwitch",
        POST_SWITCH:  "postSwitch"
    },
    DATA_TYPE: {
        SERIES: "series",
        AXIS: "axis"
    },
    FUNNEL_TYPE: {
        HEIGHT_BASED: "heightBased",
        AREA_BASED: "areaBased"
    },
    ZOOM_TYPE: {
        NORMAL:   "normal",
        INVERSED: "inversed"
    },
    VISIBLE_BOUNDARIES: {
        HOUR:   {min: 9 , max: 216},
        DAY:    {min: 9 , max: 65 },
        WEEK:   {min: 10, max: 39 },
        MONTH:  {min: 9 , max: 118},
        YEAR:   {min: 9 , max: 42 },
        DECADE: {min: 4 , max: 8  }
    }
};