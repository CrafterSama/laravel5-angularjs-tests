/* global Ext: true, google: true, Promise: true, ExtGMaps: true, RichMarker: true, RichMarkerPosition: true */
/* jshint -W106 */

/** 
 * Wrapper around Google Maps API v3.19
 * 
 * last updated: 2015-05-15
 * 
 * Useful links:
 * http://googlemaps.github.io/libraries.html (same as https://code.google.com/p/google-maps-utility-library-v3/wiki/Libraries )
 * https://developers.google.com/maps/tutorials/customizing/styling-the-base-map
 * https://developers.google.com/maps/documentation/geocoding/
 * 
 * The api loading logic is quite complicated. Both ExtJs and Google Maps APIv3 were designed such 
 * as their own loader script/logic is primary.
 * Luckily google allows async logic, but it still doesn't play nice together with Ext.Loader due to the fact
 * that the latter was implemented in a very simplistic way (especially how it tries to prevent caching by default).
 * 
 * The problem is to load the Google Maps API on demand and only once, but if for some reason this fails,
 * subsequent calls to ExtGMaps should try to load it again.
 * 
 * 
 */
 
Ext.define('Ext.ux.ExtGMaps.ExtGMaps', {
    extend: 'Ext.Component',
    requires: ['Ext.ux.ExtGMaps.Loader'],

    initComponent: function(){
        if ( this.API_KEY == null ) {
            throw new Error('API_KEY is required');
        }

        this.callParent();

        Ext.ux.ExtGMaps.Loader.loadAPI(this).then(this.setupMap.bind(this));

    },

    /**
     * @cfg {Boolean} fitMarkers
     * Zooms and centers the map so it fits the markers tightly. 
     */
    fitMarkers: true,
    
    /**
     * @cfg {String} backgroundColor
     * Color used for the background of the Map div. 
     * This color will be visible when tiles have not yet loaded as the user pans. 
     * This option can only be set when the map is initialized.
     */
    
    /**
     * @cfg {Object} center (required)
     * The initial Map center, given as a LatLng object.  
     */
    center: { lat: 34.290025, lng: 22.612539}, //failsafe, it's in the middle of the mediterranean
    /**
     * @cfg {Boolean} disableDefaultUI 
     * Enables/disables all default UI. May be overridden individually.  
     */
    
    /**
     * @cfg {Boolean} disableDoubleClickZoom 
     * Enables/disables zoom and center on double click. Enabled by default.  
     */
    
    /**
     * @cfg {Boolean} draggableMap 
     * If false, prevents the map from being dragged. Dragging is enabled by default.  
     * Name of this property is draggable, but that collides with the same property of Ext.AbstractComponent
     */
    draggableMap: true,
    
    /**
     * @cfg {String} draggableCursor 
     * The name or url of the cursor to display when mousing over a draggable map. 
     * This property uses the css cursor attribute to change the icon. 
     * As with the css property, you must specify at least one fallback cursor that is not a URL. 
     * For example: draggableCursor: 'url(http://www.example.com/icon.png), auto;'.  
     */
    
    /**
     * @cfg {String} draggingCursor 
     * The name or url of the cursor to display when the map is being dragged. 
     * This property uses the css cursor attribute to change the icon. 
     * As with the css property, you must specify at least one fallback cursor that is not a URL. 
     * For example: draggingCursor: 'url(http://www.example.com/icon.png), auto;'.  
     */
    
    /**
     * @cfg {Number} heading 
     * The heading for aerial imagery in degrees measured clockwise from cardinal direction North. 
     * Headings are snapped to the nearest available angle for which imagery is available.
     */
    
    /**
     * @cfg {Boolean} keyboardShortcuts 
     * If false, prevents the map from being controlled by the keyboard. 
     * Keyboard shortcuts are enabled by default.
     */
    keyboardShortcuts: true,
    
    /**
     * @cfg {Boolean} mapMaker 
     * True if Map Maker tiles should be used instead of regular tiles. 
     */
    
    /**
     * @cfg {Boolean} mapTypeControl 
     * The initial enabled/disabled state of the Map type control. 
                        */
    
    /**
     * @cfg {Boolean} mapTypeControlOptions 
     * MapTypeControlOptions	The initial display options for the Map type control. 
     */
    
    /**
     * @cfg {String} mapTypeId 
     * The initial Map mapTypeId. Defaults to ROADMAP. 
     * https://developers.google.com/maps/documentation/javascript/maptypes
     */
    mapTypeId: 'roadmap', // this is problematic, should use google.maps.MapTypeId.ROADMAP but google.maps isn't initialized yet here
    
    /**
     * @cfg {Number} maxZoom 
     * The maximum zoom level which will be displayed on the map. 
     * If omitted, or set to null, the maximum zoom from the current map type is used instead.
     */
    
    /**
     * @cfg {Number} minZoom 
     * The minimum zoom level which will be displayed on the map. 
     * If omitted, or set to null, the maximum zoom from the current map type is used instead.
     */
    
    /**
     * @cfg {Boolean} noClear 
     * If true, do not clear the contents of the Map div.
     */
    
    /**
     * @cfg {Boolean} overviewMapControl 
     * The enabled/disabled state of the Overview Map control.
     */
    
    /**
     * @cfg {Boolean} overviewMapControlOptions 
     * The display options for the Overview Map control.
     * https://developers.google.com/maps/documentation/javascript/reference#OverviewMapControlOptions
     */
    
    /**
     * @cfg {Boolean} panControl 
     * The enabled/disabled state of the Pan control.
     */
    
    /**
     * @cfg {Object} panControlOptions 
     * The display options for the Pan control.
     * https://developers.google.com/maps/documentation/javascript/reference#PanControlOptions
     */
    
    /**
     * @cfg {Boolean} rotateControl 
     * The enabled/disabled state of the Rotate control.
     */
    
    /**
     * @cfg {Object} rotateControlOptions 
     * The display options for the Rotate control.
     * https://developers.google.com/maps/documentation/javascript/reference#RotateControlOptions
     */
    
    /**
     * @cfg {Boolean} scaleControl 
     * The initial enabled/disabled state of the Scale control.
     */
    
    /**
     * @cfg {Object} scaleControlOptions 
     * The initial display options for the Scale control.
     * https://developers.google.com/maps/documentation/javascript/reference#ScaleControlOptions
     */
    
    /**
     * @cfg {Boolean} scrollwheel 
     * If false, disables scrollwheel zooming on the map. The scrollwheel is enabled by default.
     */
    scrollwheel: true,
    
    /**
     * @cfg {Object} streetView 
     * A StreetViewPanorama to display when the Street View pegman is dropped on the map. 
     * If no panorama is specified, a default StreetViewPanorama will be displayed in the map's div when the pegman is dropped.
     * https://developers.google.com/maps/documentation/javascript/reference#StreetViewPanorama
     */
    
    /**
     * @cfg {Boolean} streetViewControl 
     * The initial enabled/disabled state of the Street View Pegman control. 
     * This control is part of the default UI, and should be set to false when displaying a map type on which the Street View road overlay should not appear (e.g. a non-Earth map type).
     */
    
    /**
     * @cfg {Object} streetViewControlOptions 
     * The initial display options for the Street View Pegman control.
     * https://developers.google.com/maps/documentation/javascript/reference#StreetViewControlOptions
     */
    
    /**
     * @cfg {Array} styles 
     * Styles to apply to each of the default map types. 
     * Note that for Satellite/Hybrid and Terrain modes, these styles will only apply to labels and geometry.
     * Array<MapTypeStyle>
     * TODO: need more info on what can actually be used/configured here
     */
    
    /**
     * @cfg {Number} tilt 
     * Controls the automatic switching behavior for the angle of incidence of the map. 
     * The only allowed values are 0 and 45. 
     * The value 0 causes the map to always use a 0° overhead view regardless of the zoom level and viewport. 
     * The value 45 causes the tilt angle to automatically switch to 45 whenever 45° imagery is available for the current zoom level and viewport, and switch back to 0 whenever 45° imagery is not available (this is the default behavior). 
     * 45° imagery is only available for SATELLITE and HYBRID map types, within some locations, and at some zoom levels. 
     * Note: getTilt returns the current tilt angle, not the value specified by this option. 
     * Because getTilt and this option refer to different things, do not bind() the tilt property; doing so may yield unpredictable effects.
     */
    
    /**
     * @cfg {Number} zoom (required) 
     * The initial Map zoom level. 
     */
    zoom: 2,
    
    /**
     * @cfg {Boolean} zoomControl 
     * The enabled/disabled state of the Zoom control.
     */
    
    /**
     * @cfg {Object} zoomControlOptions 
     * ZoomControlOptions object.	
     * The display options for the Zoom control.
     * https://developers.google.com/maps/documentation/javascript/reference#ZoomControlOptions
     */
    
    /**
     * @cfg {Array} markerConfigs 
     * Array of marker
     */
    markerConfigs: [],

    /**
     * @private geocoder
     */

    /**
     * @private map
     */
    
    /**
     * @private setupMap
     */
    setupMap: function(){
        this.geocoder = new google.maps.Geocoder();
        var mapdiv = this.getEl().dom;
        var mapOptions = Ext.apply({}, this);
        mapOptions.draggable = this.draggableMap; 
        this.map = new google.maps.Map(mapdiv, mapOptions);
        this.map.set('styles', this.styles);
        this.setupMarkers();
    },

    /**
     * @private setupMarkers
     */
    setupMarkers: function setupMarkers(){
        Promise.settle(this.markerConfigs.map(function(m, i){
                           // get the position if it has address
                           var position = Promise.bind(this);
                           if ( !m.position ) {
                               position = position
                                          .then(function(){
                                              // limit is 5 query/sec 
                                              return Promise.delay(m.address, 400*i);
                                          })
                                          .then(this.getPositionByAddress);
                           } else {
                               position.thenReturn(m.position);
                           }
                           
                           return position.then(function(latlng){

                                      if ( this.fitMarkers ) {
                                          if ( ! this.bounds ) {
                                              this.bounds = new google.maps.LatLngBounds();
                                          }
                                          this.bounds.extend(latlng);
                                      }

                                      m.position = latlng;

                                      var tpl = m.tpl;

                                      if ( ! tpl ) {
                                          return new google.maps.Marker(m);
                                      } else {
                                          var opts = Ext.apply(m, m.commonOptions, {
                                              anchor: RichMarkerPosition.MIDDLE,
                                              content: tpl.apply(m.data)
                                          });
                                          return new RichMarker(opts);
                                      }
                                  });
                           
                       }, this))
        .bind(this)
        .then(this.centerMap)
        .then(this.addMarkers);
    },

    /**
     * @private centerMap
     */
    centerMap: function(markers){
        if ( this.fitMarkers && this.bounds ) {
            this.map.fitBounds(this.bounds);
        }
        return Promise.fulfilled(markers);
    },

    /**
     * @private getPositionByAddress
     */
    getPositionByAddress: function(address){
        var resolve,
            reject,
            promise = new Promise(function(){
                                      resolve = arguments[0];
                                      reject = arguments[1];
                                  });

        this.geocoder.geocode( { address: address}, function(results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                resolve(results[0].geometry.location);
            } else {
                reject(new Error('Geocode was not successful for the following reason: ' + status));
            }
        });

        return promise;
    },

    /**
     * @private
     */
    addMarkers: function addMarkers(markers){
        markers.forEach(function(m){
            if ( m.isFulfilled() ) {
                m.value().setMap(this.map);
            }
        }, this);
    },
});
/*
Ext.define('ExtGMaps.Loader', {
    singleton: true,
    removeScripts: function(){
        Array.prototype.forEach.call(document.querySelectorAll('script[src*=maps\\.googleapis\\.com]'), Ext.removeNode);
        Array.prototype.forEach.call(document.querySelectorAll('script[src*=maps\\.gstatic\\.com]'), Ext.removeNode);
    },
    addScripts: function(extgmaps, resolve, reject){
        this.resolver = resolve;

        // This was needed so the url is correct and the API_KEY can be read correctly
        Ext.Loader.setConfig({
            disableCaching: false
        });

        Ext.Loader.loadScript({
            //callback parameter is required so the api knows it's being loaded asynchronously 
            url: 'https://maps.googleapis.com/maps/api/js?key=' + extgmaps.API_KEY + '&callback=ExtGMaps.loader.done', 
            onError: function(){
                reject(new Error('Google Maps API failed to load'));
            }
        });
    },
    done: function(){
        // this.resolver is set in addScripts
        this.resolver(google);
    },
    loadAPI: function(extgmaps){
        // if the api is already loaded, do nothing
        if ( window.google && !this.promise ) {
            this.promise = Promise.resolve(google).bind(extgmaps);
        } else if ( !this.promise || this.promise.isRejected() ) {
            // check if the script tags are already present, and remove if they are
            this.removeScripts();

            // create new promise
            this.promise = new Promise(this.addScripts.bind(this, extgmaps));
        } else {
            this.promise = Promise.reject(new Error('This should never happen'));
        }

        return this.promise;
        
    },
}); */

// THIS IS WHERE I TRIED TO HAVE A CONFIGURABLE MARKER CLASS TO FEED IT INTO google.maps.Marker AND RichMarker
// Ext.define('ExtGMaps.Marker', {
//     extend: 'Ext.data.Model',
//     /**
//      * @cfg data {Array} (required)
//      */
//     /**
//      * @cfg tpl {Object}
//      * XTemplate for Markers
//      */
//     /**
//      * @cfg anchorPoint	(Object)
//      * type: Point https://developers.google.com/maps/documentation/javascript/reference#Point
//      * The offset from the marker's position to the tip of an InfoWindow that has been opened with the marker as anchor.
//      */
//     /**
//      * @cfg animation {Object}
//      * type: Animation https://developers.google.com/maps/documentation/javascript/reference#Animation
//      * Which animation to play when marker is added to a map. 
//      */
//     /**
//      * @cfg attribution	{Object} 
//      * type: Attribution https://developers.google.com/maps/documentation/javascript/reference#Attribution
//      * Contains all the information needed to identify your application as the source of a save. 
//      * In this context, 'place' means a business, point of interest or geographic location. attribution must be specified with a place in order to enable a save.
//      */
//     /**
//      * @cfg clickable {Boolean}
//      * If true, the marker receives mouse and touch events. Default value is true.
//      */
//     clickable: true,
//     /**
//      * @cfg crossOnDrag	{Boolean}	
//      * If false, disables cross that appears beneath the marker when dragging. This option is true by default.
//      */
//     crossOnDrag: true,
//     /**
//      * @cfg cursor {String}	
//      * Mouse cursor to show on hover
//      */
//     /**
//      * @cfg draggable {Boolean}	
//      * If true, the marker can be dragged. Default value is false.
//      */
//     draggable: false,
//     /**
//      * @cfg icon	{String|Icon|Symbol}
//      * type: String|Icon|Symbol	
//      * https://developers.google.com/maps/documentation/javascript/reference#Icon
//      * https://developers.google.com/maps/documentation/javascript/reference#Symbol
//      * Icon for the foreground. If a string is provided, it is treated as though it were an Icon with the string as url.
//      */
//     /**
//      * @private map	{Object}
//      * type: Map|StreetViewPanorama	
//      * https://developers.google.com/maps/documentation/javascript/reference#Map 
//      * https://developers.google.com/maps/documentation/javascript/reference#StreetViewPanorama
//      * Map on which to display Marker.
//      */
//     /**
//      * @cfg opacity	{Number}	
//      * The marker's opacity between 0.0 and 1.0.
//      */
//     opacity: true,
//     /**
//      * @cfg optimized {Boolean}	
//      * Optimization renders many markers as a single static element. 
//      * Optimized rendering is enabled by default. 
//      * Disable optimized rendering for animated GIFs or PNGs, or when each marker must be rendered as a separate DOM element (advanced usage only).
//      */
//     /**
//      * @cfg place {Object}
//      * type: Place https://developers.google.com/maps/documentation/javascript/reference#Place
//      * Place information, used to identify and describe the place associated with this Marker. 
//      * In this context, 'place' means a business, point of interest or geographic location. 
//      * To allow a user to save this place, open an info window anchored on this marker. 
//      * The info window will contain information about the place and an option for the user to save it. 
//      * Only one of position or place can be specified.
//      */
//     /**
//      * @cfg position {Object} 
//      * type: LatLng | LatLngLiteral
//      * https://developers.google.com/maps/documentation/javascript/reference#LatLng
//      * https://developers.google.com/maps/documentation/javascript/reference#LatLngLiteral
//      * Marker position. Required by Google Maps API. 
//      * Either this or `address` has to be specified in the config.
//      */
//     /**
//      * @cfg address {String}
//      * Street address. This or `position` has to be specified in the config.
//      */
//     /**
//      * @cfg shape {Object}
//      * type: MarkerShape	
//      * Image map region definition used for drag/click.
//      */
//     /**
//      * @cfg title {String}	
//      * Rollover text
//      */
//     /**
//      * @cfg visible {Boolean}	
//      * If true, the marker is visible
//      */
//     /**
//      * @cfg zIndex Number
//      * All markers are displayed on the map in order of their zIndex, with higher values displaying in front of markers with lower values. 
//      * By default, markers are displayed according to their vertical position on screen, with lower markers appearing in front of markers further up the screen.
//      */
// 
//     config: {
//         address: undefined,
//         tpl: undefined,
//         anchorPoint: undefined,
//         animation: undefined,
//         attribution: undefined,
//         clickable: true,
//         crossOnDrag: true,
//         cursor: undefined,
//         draggable: false,
//         icon: undefined,
//         map: undefined,
//         opacity: undefined,
//         optimized: undefined,
//         place: undefined,
//         position: undefined,
//         shape: undefined,
//         title: undefined,
//         visible: undefined,
//         zIndex: undefined
//         
//     },
//     initConfig: function(cfg){
//         if ( !cfg.address && !cfg.position ) {
//             throw new Error('Address or Position has to be defined!');
//         }
//         this.callParent(arguments);
//     },
//     constructor: function(cfg){
//         this.initConfig(cfg);
//     }
// 
//     //fields: [
//     //    {name: 'address', type: 'string', defaultValue: undefined},
//     //    {name: 'tpl', type: 'object', defaultValue: undefined },
//     //    {name: 'anchorPoint',type: 'auto', defaultValue: undefined },
//     //    {name: 'animation',type: 'auto', defaultValue: undefined },
//     //    {name: 'attribution',type: 'auto', defaultValue: undefined },
//     //    {name: 'clickable',type:'boolean', defaultValue: true },
//     //    {name: 'crossOnDrag',type:'boolean', defaultValue: true },
//     //    {name: 'cursor',type:'string', defaultValue: undefined },
//     //    {name: 'draggable',type:'boolean', defaultValue: false },
//     //    {name: 'icon',type:'auto', defaultValue: undefined },
//     //    {name: 'map',type:'auto', defaultValue: undefined },
//     //    {name: 'opacity',type:'number', defaultValue: undefined },
//     //    {name: 'optimized',type:'boolean', defaultValue: true },
//     //    {name: 'place',type:'auto', defaultValue: undefined },
//     //    {name: 'position',type:'auto', defaultValue: undefined },
//     //    {name: 'shape',type:'auto', defaultValue: undefined },
//     //    {name: 'title',type:'string', defaultValue: undefined },
//     //    {name: 'visible',type:'boolean', defaultValue: undefined },
//     //    {name: 'zIndex',type:'number', defaultValue: undefined },
//     //],
// 
// 
// });