Ext.define('ExtGMaps.Marker', {
    extend: 'Ext.data.Model',
    /**
     * @cfg data {Array} (required)
     */
    /**
     * @cfg tpl {Object}
     * XTemplate for Markers
     */
    /**
     * @cfg anchorPoint	(Object)
     * type: Point https://developers.google.com/maps/documentation/javascript/reference#Point
     * The offset from the marker's position to the tip of an InfoWindow that has been opened with the marker as anchor.
     */
    /**
     * @cfg animation {Object}
     * type: Animation https://developers.google.com/maps/documentation/javascript/reference#Animation
     * Which animation to play when marker is added to a map. 
     */
    /**
     * @cfg attribution	{Object} 
     * type: Attribution https://developers.google.com/maps/documentation/javascript/reference#Attribution
     * Contains all the information needed to identify your application as the source of a save. 
     * In this context, 'place' means a business, point of interest or geographic location. attribution must be specified with a place in order to enable a save.
     */
    /**
     * @cfg clickable {Boolean}
     * If true, the marker receives mouse and touch events. Default value is true.
     */
    clickable: true,
    /**
     * @cfg crossOnDrag	{Boolean}	
     * If false, disables cross that appears beneath the marker when dragging. This option is true by default.
     */
    crossOnDrag: true,
    /**
     * @cfg cursor {String}	
     * Mouse cursor to show on hover
     */
    /**
     * @cfg draggable {Boolean}	
     * If true, the marker can be dragged. Default value is false.
     */
    draggable: false,
    /**
     * @cfg icon	{String|Icon|Symbol}
     * type: String|Icon|Symbol	
     * https://developers.google.com/maps/documentation/javascript/reference#Icon
     * https://developers.google.com/maps/documentation/javascript/reference#Symbol
     * Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url.
     */
    /**
     * @private map	{Object}
     * type: Map|StreetViewPanorama	
     * https://developers.google.com/maps/documentation/javascript/reference#Map 
     * https://developers.google.com/maps/documentation/javascript/reference#StreetViewPanorama
     * Map on which to display Marker.
     */
    /**
     * @cfg opacity	{Number}	
     * The marker's opacity between 0.0 and 1.0.
     */
    opacity: true,
    /**
     * @cfg optimized {Boolean}	
     * Optimization renders many markers as a single static element. 
     * Optimized rendering is enabled by default. 
     * Disable optimized rendering for animated GIFs or PNGs, or when each marker must be rendered as a separate DOM element (advanced usage only).
     */
    /**
     * @cfg place {Object}
     * type: Place https://developers.google.com/maps/documentation/javascript/reference#Place
     * Place information, used to identify and describe the place associated with this Marker. 
     * In this context, 'place' means a business, point of interest or geographic location. 
     * To allow a user to save this place, open an info window anchored on this marker. 
     * The info window will contain information about the place and an option for the user to save it. 
     * Only one of position or place can be specified.
     */
    /**
     * @cfg position {Object} 
     * type: LatLng | LatLngLiteral
     * https://developers.google.com/maps/documentation/javascript/reference#LatLng
     * https://developers.google.com/maps/documentation/javascript/reference#LatLngLiteral
     * Marker position. Required by Google Maps API. 
     * Either this or `address` has to be specified in the config.
     */
    /**
     * @cfg address {String}
     * Street address. This or `position` has to be specified in the config.
     */
    /**
     * @cfg shape {Object}
     * type: MarkerShape	
     * Image map region definition used for drag/click.
     */
    /**
     * @cfg title {String}	
     * Rollover text
     */
    /**
     * @cfg visible {Boolean}	
     * If true, the marker is visible
     */
    /**
     * @cfg zIndex Number
     * All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. 
     * By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen.
     */

    config: {
        address: undefined,
        tpl: undefined,
        anchorPoint: undefined,
        animation: undefined,
        attribution: undefined,
        clickable: true,
        crossOnDrag: true,
        cursor: undefined,
        draggable: false,
        icon: undefined,
        map: undefined,
        opacity: undefined,
        optimized: undefined,
        place: undefined,
        position: undefined,
        shape: undefined,
        title: undefined,
        visible: undefined,
        zIndex: undefined
        
    },
    initConfig: function(cfg){
        if ( !cfg.address && !cfg.position ) {
            throw new Error('Address or Position has to be defined!');
        }
        this.callParent(arguments);
    },
    constructor: function(cfg){
        this.initConfig(cfg);
    }

    //fields: [
    //    {name: 'address', type: 'string', defaultValue: undefined},
    //    {name: 'tpl', type: 'object', defaultValue: undefined },
    //    {name: 'anchorPoint',type: 'auto', defaultValue: undefined },
    //    {name: 'animation',type: 'auto', defaultValue: undefined },
    //    {name: 'attribution',type: 'auto', defaultValue: undefined },
    //    {name: 'clickable',type:'boolean', defaultValue: true },
    //    {name: 'crossOnDrag',type:'boolean', defaultValue: true },
    //    {name: 'cursor',type:'string', defaultValue: undefined },
    //    {name: 'draggable',type:'boolean', defaultValue: false },
    //    {name: 'icon',type:'auto', defaultValue: undefined },
    //    {name: 'map',type:'auto', defaultValue: undefined },
    //    {name: 'opacity',type:'number', defaultValue: undefined },
    //    {name: 'optimized',type:'boolean', defaultValue: true },
    //    {name: 'place',type:'auto', defaultValue: undefined },
    //    {name: 'position',type:'auto', defaultValue: undefined },
    //    {name: 'shape',type:'auto', defaultValue: undefined },
    //    {name: 'title',type:'string', defaultValue: undefined },
    //    {name: 'visible',type:'boolean', defaultValue: undefined },
    //    {name: 'zIndex',type:'number', defaultValue: undefined },
    //],


});