import {
    ORIENTATION,
    SELECTION_MODE,
    VALUE_RENDER_TYPE,
    VALUE_RENDERER_ALIGNMENT,
    ANCHOR,
    PAINT_TYPES,
    SERIES_TYPES,
    SELECTION_STATE
} from './HyperChartsContants';
import {MockUtils} from './';

/**
 * Following constants are used to replace corrupted parts of config with default ones
 */
const DEFAULT_INSETS = {
    top: 20,
    left: 50,
    right: 60,
    bottom: 60
};

const DEFAULT_CALLBACK = () => {};

const DEFAULT_DATA = MockUtils.createTimelineModelPlain();

const DEFAULT_NORMAL_PAINT = {
    type: "solid",
    color: "yellow"
};
const DEFAULT_SELECTED_PAINT = {
    type: "solid",
    color: "blue"
};
const DEFAULT_UNSELECTED_PAINT = {
    type: "solid",
    color: "black"
};

const LEGEND_DEFAULT_PAINTS = {
    strokePaint: {type: "solid", color: "yellow", strokeWidth: 2},
    fillPaint:   {type: "solid", color: "black"},
    markerPaint: {type: "solid", color: "yellow"}
};

const DEFAULT_CONFIG = {
    layerCount: 1,
    orientation : "horizontal",
    callbacks : {
        tapCallback:    DEFAULT_CALLBACK,
        resizeCallback: DEFAULT_CALLBACK,
        panCallback:    DEFAULT_CALLBACK,
        zoomCallback:   DEFAULT_CALLBACK
    },
    selectionMode: "multiple",
    valueLayer:{
        insets: DEFAULT_INSETS,
        minimumVisibleValues: 7,
        maximumVisibleValues: 35,
        series: [{
            render: ["bar"],
            type: 'dynamic',
            fillPaint: [{
                normal: DEFAULT_NORMAL_PAINT,
                selected: DEFAULT_SELECTED_PAINT,
                unselected: DEFAULT_UNSELECTED_PAINT
            }],
            strokePaint: [{
                normal: DEFAULT_NORMAL_PAINT,
                selected: DEFAULT_SELECTED_PAINT,
                unselected: DEFAULT_UNSELECTED_PAINT
            }],
            data: DEFAULT_DATA,
            margin: [0]
        }]
    },
    valueAxis: {
        formatter: x => {return x;},
        font: "600 18px Arial",
        fontColor: "white",
        divisions: 7,
        gridLinesEnabled: false,
        axisLineEnabled: false,
        ticksEnabled: false,
        insets: DEFAULT_INSETS,
        paint: {
            type: "solid",
            color: "black"
        }
    }
};

const VALUE_LAYER_DEFAULT_ANIMATION = {
    preInitial: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                y: 200,
                alpha: 0
            },
            duration: 0
        }]
    },
    postInitial: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                y: 0,
                alpha: 1
            },
            delay: 600,
            duration: 600
        }]
    },
    preUpdate: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                y: 200,
                alpha: 0
            },
            duration: 600
        }]
    },
    postUpdate: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                y: 0,
                alpha: 1
            },
            duration: 600
        }]
    },
    preSwitch: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                /*y: 200,*/
                alpha: 0
            },
            duration: 150
        }]
    },
    postSwitch: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                /*y: 0,*/
                alpha: 1
            },
            duration: 150
        }]
    }
};

const VALUE_AXIS_LAYER_DEFAULT_ANIMATION = {
    preInitial: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                x: 200,
                alpha: 0
            },
            duration: 0
        }]
    },
    postInitial: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                x: 0,
                alpha: 1
            },
            delay: 600,
            duration: 600
        }]
    },
    preUpdate: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                x: 200,
                alpha: 0
            },
            duration: 600
        }]
    },
    postUpdate: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                x: 0,
                alpha: 1
            },
            duration: 600
        }]
    },
    preSwitch: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                /*x: 200,*/
                alpha: 0
            },
            duration: 150
        }]
    },
    postSwitch: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                /*x: 200,*/
                alpha: 1
            },
            duration: 150
        }]
    }
};

const LEGEND_LAYER_DEFAULT_ANIMATION = {
    preInitial: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                alpha: 0
            },
            duration: 0
        }]
    },
    postInitial: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                alpha: 1
            },
            delay: 600,
            duration: 600
        }]
    },
    preUpdate: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                alpha: 0
            },
            duration: 600
        }]
    },
    postUpdate: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                alpha: 1
            },
            duration: 600
        }]
    },
    preSwitch: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                alpha: 0
            },
            duration: 150
        }]
    },
    postSwitch: {
        scope: "container",
        loop: false,
        override: true,
        to: [{
            obj: {
                alpha: 1
            },
            duration: 150
        }]
    }
};

/**
 * Validation routines set
 */
export default class ConfigValidator {
    static showWarnings = false;

    /**
     * Display validation fails warnings is showWarnings flag was set to true
     * @param message Validation error message
     */
    static showWarningMessage(message) {
        if (ConfigValidator.showWarnings === true) {
            console.warn(message);
        }
    }

    /**
     * Applies retina quotient to dependant fields
     * @param config
     */
    static applyRetinaQuotient(config) {
        let _ratio = window.devicePixelRatio || 1;

        // FIXME possible incorrect order in font definition
        const _retinaFontAdjust = (font) => {
            const fontOpts = font.split(' ');
            fontOpts[1] = (fontOpts[1].substr(0, fontOpts[1].length - 2) * _ratio) + 'px';
            return fontOpts.join(' ');
        };

        config.valueLayer.insets.bottom *= _ratio;
        config.valueLayer.insets.top    *= _ratio;
        config.valueLayer.insets.left   *= _ratio;
        config.valueLayer.insets.right  *= _ratio;

        if (config.labelAxis) {
            for (let idx = 0; idx < config.labelAxis.length; idx++) {
                config.labelAxis[idx].font = _retinaFontAdjust(config.labelAxis[idx].font);
            }
        }

        if (config.valueAxis) {
            config.valueAxis.font = _retinaFontAdjust(config.valueAxis.font);
            config.valueAxis.insets.bottom *= _ratio;
            config.valueAxis.insets.top    *= _ratio;
            config.valueAxis.insets.left   *= _ratio;
            config.valueAxis.insets.right  *= _ratio;
        }

        if (config.legend) {
            config.legend.font = _retinaFontAdjust(config.legend.font);
            config.legend.insets.bottom *= _ratio;
            config.legend.insets.top    *= _ratio;
            config.legend.insets.left   *= _ratio;
            config.legend.insets.right  *= _ratio;
        }

        // strokeWidth adjustment
        // margin adjustment
        for (let idx = 0; idx < config.valueLayer.series.length; idx++) {
            if (config.valueLayer.series[idx].margin) {
                for (let mIdx = 0; mIdx < config.valueLayer.series[idx].margin.length; mIdx++) {
                    config.valueLayer.series[idx].margin[mIdx] *= _ratio;
                }
            }

            if (config.valueLayer.series[idx].strokePaint) {
                for (let paintIdx = 0; paintIdx < config.valueLayer.series[idx].strokePaint.length; paintIdx++) {
                    config.valueLayer.series[idx].strokePaint[paintIdx][SELECTION_STATE.NORMAL].strokeWidth *= _ratio;
                    config.valueLayer.series[idx].strokePaint[paintIdx][SELECTION_STATE.SELECTED].strokeWidth *= _ratio;
                    config.valueLayer.series[idx].strokePaint[paintIdx][SELECTION_STATE.UNSELECTED].strokeWidth *= _ratio;
                }
            }

            if (config.valueAxis && config.valueAxis.paint) {
                //config.valueAxis.paint.strokeWidth *= _ratio;
            }
        }

        return config;
    }

    /**
     * Validates and convert user config to unified form
     * 
     * @param config user config
     * @returns {*}  converted config
     */
    static validateConfig(config) {
        if (config == null) {
            console.warn("No user config provided. Using default one");
            return DEFAULT_CONFIG;
        }

        ConfigValidator.showWarnings = config.showWarnings || false;

        let _layerCount = ConfigValidator._validateLayerCount('layerCount', config.layerCount, DEFAULT_CONFIG.layerCount);

        let validatedConfig = {
            layerCount    : _layerCount,
            maxUnitWidth  : config.maxUnitWidth || 200,
            snapToPixelEnabled: ConfigValidator._validateBoolean('snapToPixelEnabled', config.snapToPixelEnabled, false),
            startLayerIndex: ConfigValidator._validatePositive('startLayerIndex', config.startLayerIndex, 0),
            orientation   : ConfigValidator._validateOrientation(config.orientation),
            callbacks     : ConfigValidator._validateCallbacks(config.callbacks),
            valueLayer    : ConfigValidator._validateValueLayerParams(config.valueLayer, _layerCount),
            labelAxis     : ConfigValidator._validateLabelAxisOptions(config.labelAxis, _layerCount),
            valueAxis     : ConfigValidator._validateValueAxisParams(config.valueAxis),
            legend        : ConfigValidator._validateLegendParams(config.legend)
        };

        return validatedConfig;
    }

    /**
     * Validates layer Count parameter
     *
     * @param paramName name of provided value
     * @param userValue user provided value
     * @param defaultValue value to return if validation failed
     * @returns {Number} validated value
     * @private Service validation routine
     */
    static _validateLayerCount(paramName, userValue, defaultValue) {
        // TODO validate layered parameters (sereis, axes, option arrays, etc.)
        if (isNaN(userValue) || userValue < 1) {
            ConfigValidator.showWarningMessage("Invalid " + paramName + " provided. Setting it to " + defaultValue);
            return defaultValue;
        }

        return userValue
    }

    /**
     * Validates orientation parameter
     * @param userOrientation user value
     * @returns {string} validated value
     * @private validation service routine
     */
    static _validateOrientation(userOrientation) {
        if (userOrientation === ORIENTATION.HORIZONTAL || 
            userOrientation === ORIENTATION.VERTICAL) {
            return userOrientation;
        }

        ConfigValidator.showWarningMessage("Invalid orientation value provided. Setting to horizontal");
        return ORIENTATION.HORIZONTAL;
    }

    static _validateCallbacks(callbacks) {
        if (!callbacks) {
            return DEFAULT_CONFIG.callbacks;
        }

        let result = Object.assign({}, DEFAULT_CONFIG.callbacks);

        result.tapCallback = ConfigValidator._validateFunction("tapCallback",    callbacks.tapCallback,    DEFAULT_CALLBACK);
        result.resizeCallback = ConfigValidator._validateFunction("resizeCallback", callbacks.resizeCallback, DEFAULT_CALLBACK);
        result.panCallback = ConfigValidator._validateFunction("panCallback",    callbacks.panCallback,    DEFAULT_CALLBACK);
        result.zoomCallback =  ConfigValidator._validateFunction("zoomCallback",   callbacks.zoomCallback,   DEFAULT_CALLBACK);

        return result;
    }

    /**
     * Validates selectionMode parameter
     * @param userSelectionMode user value
     * @private validation service routine
     */
    static _validateSelectionMode(userSelectionMode) {
        let {NONE, SINGLE_SELECTION, INTERVAL_SELECTION, MULTIPLE_SELECTION} = SELECTION_MODE;
        switch (userSelectionMode) {
            case NONE: case SINGLE_SELECTION: case INTERVAL_SELECTION: case MULTIPLE_SELECTION:
                return userSelectionMode;
            default:
                ConfigValidator.showWarningMessage("Invalid selectionMode value provided.Setting to none");
                return NONE;
        }
    }

    /**
     * Validates valueLayer options group
     * @param valueLayerParams user value layer options
     * @private validation service routine
     */
    static _validateValueLayerParams(valueLayerParams, layerCount) {
        // Value layer is mandatory
        if (valueLayerParams == null) {
            return DEFAULT_CONFIG.valueLayer;
        }

        let resultParams = {
            insets:    ConfigValidator._validateInsets(valueLayerParams.insets),
            minimumVisibleValues: valueLayerParams.minimumVisibleValues/*ConfigValidator._validatePositive(
                valueLayerParams.minimumVisibleValues, DEFAULT_CONFIG.valueLayer.minimumVisibleValues)*/,
            maximumVisibleValues: valueLayerParams.maximumVisibleValues/*ConfigValidator._validatePositive(
                valueLayerParams.maximumVisibleValues, DEFAULT_CONFIG.valueLayer.maximumVisibleValues)*/,
            series:    ConfigValidator._validateSeriesOptions(valueLayerParams.series, layerCount),
            animation: valueLayerParams.animation || VALUE_LAYER_DEFAULT_ANIMATION
        };

        return resultParams;
    }

    /**
     * Validates valueAxis related options group
     * @param valueAxisParams user options
     * @private validation service routines
     */
    static _validateValueAxisParams(valueAxisParams) {
        // Value Axis layer is optional
        if (valueAxisParams == null) {
            return null;
        }

        let _resultParams = {
            formatter: ConfigValidator._validateFunction("formatter", valueAxisParams.formatter, DEFAULT_CONFIG.valueAxis.formatter),
            font: valueAxisParams.font,
            fontColor: valueAxisParams.fontColor,
            insets: ConfigValidator._validateInsets(valueAxisParams.insets),
            alignment: ConfigValidator._validateSetValue(
                "alignment", valueAxisParams.alignment, VALUE_RENDERER_ALIGNMENT, VALUE_RENDERER_ALIGNMENT.POSITIVE),
            axisLineEnabled: ConfigValidator._validateBoolean(
                "axisLineEnabled", valueAxisParams.axisLineEnabled, DEFAULT_CONFIG.valueAxis.axisLineEnabled),
            ticksEnabled: ConfigValidator._validateBoolean(
                "ticksEnabled", valueAxisParams.ticksEnabled, DEFAULT_CONFIG.valueAxis.ticksEnabled),
            gridLinesEnabled: ConfigValidator._validateBoolean(
                "axisLineEnabled", valueAxisParams.gridLinesEnabled, DEFAULT_CONFIG.valueAxis.gridLinesEnabled),
            divisions: ConfigValidator._validatePositive(
                "divisions", valueAxisParams.divisions, DEFAULT_CONFIG.valueAxis.divisions),
            paint: ConfigValidator._validatePaint(valueAxisParams.paint, DEFAULT_CONFIG.valueAxis.divisions),
            shadow: ConfigValidator._validateShadowOptions(valueAxisParams.shadow, 1),
            animation: valueAxisParams.animation || VALUE_AXIS_LAYER_DEFAULT_ANIMATION
        };
        
        return _resultParams;
    }

    /**
     * Validates legend layer options group
     * @param legendParams user options
     * @returns {*} validated options group
     * @private validation service routines
     */
    static _validateLegendParams(legendParams) {
        // legend layer is optional
        if (legendParams == null) {
            return null;
        }

        // FIXME correct font validation
        let _resultParams = {
            font: legendParams.font,
            fontColor: legendParams.fontColor,
            insets: ConfigValidator._validateInsets(legendParams.insets),
            anchor: ConfigValidator._validateSetValue("anchor", legendParams.anchor, ANCHOR, "north"),
            shadow: ConfigValidator._validateBoolean("legend.shadow", legendParams.shadow, false),
            animation: legendParams.animation || LEGEND_LAYER_DEFAULT_ANIMATION,
            paints: legendParams.paint === null ? LEGEND_DEFAULT_PAINTS : {
                strokePaint: ConfigValidator._validatePaint(legendParams.paint, LEGEND_DEFAULT_PAINTS.strokePaint),
                fillPaint:   ConfigValidator._validatePaint(legendParams.paint, LEGEND_DEFAULT_PAINTS.fillPaint),
                markerPaint: ConfigValidator._validatePaint(legendParams.paint, LEGEND_DEFAULT_PAINTS.markerPaint)
            },
            shadow: ConfigValidator._validateShadowOptions(legendParams.shadow, 1)
        };

        return _resultParams;
    }

    /**
     * Validates insets
     * @param userInsets user provided value
     * @private validation service routine
     */
    static _validateInsets(userInsets) {
        if (userInsets == null) {
            return DEFAULT_INSETS;
        }

        let resultParam = {
            top:    ConfigValidator._validatePositive("top", userInsets.top),
            bottom: ConfigValidator._validatePositive("bottom", userInsets.bottom),
            left:   ConfigValidator._validatePositive("left", userInsets.left),
            right:  ConfigValidator._validatePositive("right", userInsets.right)
        };
        return resultParam;
    }

    /**
     * Validates series options
     * @param userSeriesArray user provided values
     * @private service validation routine
     */
    static _validateSeriesOptions(userSeriesArray, layerCount) {
        let {series} = DEFAULT_CONFIG.valueLayer;

        if (userSeriesArray == null) {
            return series;
        }
        
        let resultParams = [];
        // series[0]... validation fail-safe default value
        for (let seriesIdx = 0; seriesIdx < userSeriesArray.length; seriesIdx++) {
            let userSeries = userSeriesArray[seriesIdx];
            let _type = ConfigValidator._validateSetValue("series.type", userSeries.type, SERIES_TYPES, SERIES_TYPES.STATIC);
            let _render = ConfigValidator._validateRenderType(userSeries.render, series[0].render);
            let resultParamsEntry = {
                selectionMode : ConfigValidator._validateSelectionMode(userSeries.selectionMode),
                name: userSeries.name,
                type: _type,
                render: _render,
                // TODO provide data validation routine
                data: (!!userSeries.data) ? userSeries.data : MockUtils.createZeroModel(
                    _render, _type === SERIES_TYPES.STATIC),
                fillPaint: ConfigValidator._validatePaints(
                    'fillPaint', userSeries.fillPaint, series[0].fillPaint),
                strokePaint: ConfigValidator._validatePaints(
                    'strokePaint', userSeries.strokePaint, series[0].strokePaint),
                shadow: ConfigValidator._validateShadowOptions(userSeries.shadow, layerCount),
                margin: userSeries.margin || series[0].margin
            };
            resultParams.push(resultParamsEntry);
        }
        
        return resultParams;
    }

    static _validateShadowOptions(shadowOptionsArray, layerCount) {
        const checkShadowEntry = function(entry) {
            const DEFAULT_SHADOW_PARAM = ["rgba(0, 0, 0, 0.5)", 2, 3, 3];
            const SHADOW_COLOR_REGEX =  /(#[\d\w]+|\w+\((?:\d+%?(?:,\s)*){3}(?:\d*\.?\d+)?\))/i;

            if (entry == null) {
                return false;
            }

            if (typeof entry !== 'string') {
                ConfigValidator.showWarningMessage('Invalid type of shadow parameter at layer '
                    + idx + '. Using defaults.');
                return DEFAULT_SHADOW_PARAM;
            }

            let _matches = entry.match(SHADOW_COLOR_REGEX);

            if (!_matches) {
                shadowOptionsArray[idx] = DEFAULT_SHADOW_PARAM;
            }

            let shadowColor = _matches[0];
            let restPart = entry.substring(shadowColor.length, entry.length);
            let parts = restPart.trim().split(/\s+/);
            let curResArray = [];
            curResArray.push(shadowColor);
            curResArray = curResArray.concat(parts);

            if (curResArray.length !== 4) {
                ConfigValidator.showWarningMessage("Shadow:invalid count of parameters");
                return DEFAULT_SHADOW_PARAM;
            }

            curResArray[1] = ConfigValidator._validatePositive(
                "offsetX", curResArray[1], DEFAULT_SHADOW_PARAM[1]);
            curResArray[2] = ConfigValidator._validatePositive(
                "offsetY", curResArray[2], DEFAULT_SHADOW_PARAM[2]);
            curResArray[3] = ConfigValidator._validatePositive(
                "blur", curResArray[3], DEFAULT_SHADOW_PARAM[3]);

            return curResArray;
        };

        // shadows is optional
        if (!shadowOptionsArray) {
            if (layerCount > 1) {
                return Array(layerCount).fill(false);
            } else {
                return false;
            }
        }

        if (!Array.isArray(shadowOptionsArray) && typeof shadowOptionsArray === 'string'
            && layerCount === 1) {
            return checkShadowEntry(shadowOptionsArray);
        }

        if ((!Array.isArray(shadowOptionsArray)
            || shadowOptionsArray.length !== layerCount) && layerCount > 1) {
            return Array(layerCount).fill(false);
        }

        let validationResult = [];

        for (let idx = 0; idx < layerCount; idx++) {
            validationResult.push(checkShadowEntry(shadowOptionsArray[idx]));
        }

        return validationResult;
    }

    /**
     * Validates label axes options
     * @param labelAxisOptionsArray options array
     * @returns {Array} validated object
     * @private service validation routine
     */
    static _validateLabelAxisOptions(labelAxisOptionsArray, layerCount) {
        if (labelAxisOptionsArray == null || labelAxisOptionsArray.length === 0) {
            return null;
        }

        let _resultParams = [];
        let _render = [];
        for (let sIdx = 0; sIdx < layerCount; sIdx++) {
            _render.push("bar");
        }
        for (let axisIdx = 0; axisIdx < labelAxisOptionsArray.length; axisIdx++) {
            let _userEntry = labelAxisOptionsArray[axisIdx];
            let _type = ConfigValidator._validateSetValue("labelAxis.type", _userEntry.type, SERIES_TYPES, SERIES_TYPES.STATIC);
            let _resultParamEntry = {
                name: _userEntry.name,
                insets: ConfigValidator._validateInsets(_userEntry.insets),
                type: _type,
                data: _userEntry.data ? _userEntry.data : MockUtils.createZeroModel(
                    _render, _type === SERIES_TYPES.STATIC),
                font: _userEntry.font,
                fontColor: _userEntry.fontColor,
                shadow: ConfigValidator._validateShadowOptions(_userEntry.shadow, layerCount)
        };
            _resultParams.push(_resultParamEntry);
        }

        return _resultParams;
    }

    /**
     * Validates renderer type
     * @param type Array or single renderer type as string value
     * @private service validation routine
     */
    static _validateRenderType(type, defaultValue) {
        if (type == null) {
            return defaultValue;
        }

        let result = [];

        if (Array.isArray(type)) {
            for (let typeIdx = 0; typeIdx < type.length; typeIdx++) {
                result.push(ConfigValidator._validateSetValue("renderType["+typeIdx+"]", type[typeIdx], VALUE_RENDER_TYPE,
                    defaultValue[typeIdx]));
            }
        } else {
            result.push(ConfigValidator._validateSetValue("renderType", type, VALUE_RENDER_TYPE, defaultValue));
        }

        return result;
    }

    /**
     * Validates an array of given paints' options
     * @param paints test array
     * @param defaultValue default values array
     * @returns {*} validated paints array
     * @private service validation routine
     */
    static _validatePaints(paramName, paints, defaultValue) {
        let result = [];

        if (paints == null) {
            ConfigValidator.showWarningMessage("No paints for " + paramName + " provided using default paints array");
            return defaultValue;
        }

        for (let idx = 0; idx < paints.length; idx++) {
            result.push(ConfigValidator._validatePaintBundle(paints[idx], defaultValue[idx]));
        }

        return result;
    }

    /**
     * Validates paint options
     */
    static _validatePaintBundle(paint, defaultValue) {
        if (paint == null) {
            return defaultValue;
        }
        
        let result = {};

        Object.keys(paint).forEach((paintKey) => {
            result[paintKey] = ConfigValidator._validatePaint(paint[paintKey], defaultValue);
        });
        

        return result;
    }

    static _validatePaint(paint, defaultValue) {
        if (paint == null) {
            return defaultValue;
        }

        if (Array.isArray(paint)) {
            let _arrResult = [];
            for (let paintIdx = 0; paintIdx < paint.length; paintIdx++) {
                _arrResult.push(ConfigValidator._validatePaint(paint[paintIdx], defaultValue));
            }
            return _arrResult;
        }

        let result = {
            type: ConfigValidator._validateSetValue("paint.type", paint.type, PAINT_TYPES, defaultValue),
            strokeWidth: ConfigValidator._validateNumber("paint.strokeWidth", paint.strokeWidth, 1),
            color: paint.color,
            colors: paint.colors,
            coefs: paint.coefs,
            startAnchor: paint.startAnchor,
            endAnchor: paint.endAnchor,
            anchor: paint.anchor,
            radius: paint.radius
        };

        return result;
    }

    /**
     * Checks if given parama is a function
     * @param paramName name of parameter
     * @param paramValue actual value
     * @param defaultValue value to replace if validation failed
     * @private validation service routine
     */
    static _validateFunction(paramName, paramValue, defaultValue) {
        if (paramValue == null || typeof paramValue !== 'function') {
            ConfigValidator.showWarningMessage("No or invalid function for" + paramName + " provided. A default one will be used.");
            return defaultValue;
        }
        
        return paramValue;
    }
    
    /**
     * Checks if given value belongs to set
     * @private validation service routine
     */
    static _validateSetValue(paramName, paramValue, validationSet, defaultValue) {
        if (paramValue == null) {
            ConfigValidator.showWarningMessage("Invalid " + paramName + " as " + paramValue + " value provided. Setting to default as " + defaultValue);
            return defaultValue;
        }

        let _keys = Object.keys(validationSet);

        for (let itemIdx = 0; itemIdx < _keys.length; itemIdx++) {
            if (paramValue === validationSet[_keys[itemIdx]]) {
                return paramValue;
            }
        }

        ConfigValidator.showWarningMessage("Invalid " + paramName + " as " + paramValue + " value provided. Setting to default as " + defaultValue);
        return defaultValue;
    }

    /**
     * Checks if provided number array contains positive values only
     * @param paramName name of parameter
     * @param userNumberArr provided array
     * @param defaultValue default placeholder number
     * @private validation service routine
     */
    static _validatePositiveArray(paramName, userNumberArr, defaultValue) {
        if (Array.isArray(userNumberArr)) {
            let result = [];
            for (let idx = 0; idx < userNumberArr.length; idx++) {
                result.push(ConfigValidator._validatePositive(paramName, userNumberArr[idx], defaultValue));
            }
            return result;
        }

        return ConfigValidator._validatePositive(paramName, userNumberArr, defaultValue);
    }

    /**
     * Checks if provided value is positive
     * @param paramName  name of checked parameter
     * @param userNumber user value
     * @returns {number} userNumber if valid, otherwise 0
     * @private sevice validation routine
     */
    static _validatePositive(paramName, userNumber, defaultValue) {
        let parsed = ConfigValidator._validateNumber(paramName, userNumber, defaultValue || 0);
        if (parsed < 0) {
            ConfigValidator.showWarningMessage("Negative value for " + paramName + " is not allowed. Setting to 0.");
            return 0;
        }

        return parsed;
    }

    /**
     * Validates number parameter value
     * @param userNumber user value
     * @param defaultNumber default value if invalid value given
     * @private service validation routine
     */
    static _validateNumber(paramName, userNumber, defaultNumber) {
        let parsed = userNumber;

        if (isNaN(parsed)) {
            ConfigValidator.showWarningMessage("Invalid " + paramName + " value given. Using default value " + defaultNumber + ".");
            return defaultNumber;
        }

        return parsed;
    }

    /**
     * Validates boolean value
     * 
     * @param paramName
     * @param userValue
     * @param defaultValue
     * @private
     */
    static _validateBoolean(paramName, userValue, defaultValue) {
        if (userValue === true || userValue === false) {
            return userValue;
        }

        ConfigValidator.showWarningMessage("Invalid " + paramName + " provided. Setting to " + defaultValue);
        return false;
    }
}