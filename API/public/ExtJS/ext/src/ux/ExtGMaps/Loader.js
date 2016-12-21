Ext.Loader.loadScript({
    url: '//cdnjs.cloudflare.com/ajax/libs/bluebird/2.9.25/bluebird.min.js', 
    onError: function(){
        throw new Error('bluebird failed to load');
    },
    onLoad: function(){
        Ext.define('Ext.ux.ExtGMaps.Loader', {

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
                    url: 'https://maps.googleapis.com/maps/api/js?key=' + extgmaps.API_KEY + '&callback=Ext.ux.ExtGMaps.Loader.done', 
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
                } else if ( !window.google && (!this.promise || this.promise.isRejected()) ) {
                    // check if the script tags are already present, and remove if they are
                    this.removeScripts();
                    
                    // create new promise
                    this.promise = new Promise(this.addScripts.bind(this, extgmaps)).bind(extgmaps);
                } else {
                    // all is fine here, we should have a window.google and a this.promise
                    if ( !window.google || !this.promise ) {
                        throw new Error('This should never happen')
                    }
                }
                
                return this.promise.then(this.loadRichMarkers);
            },

            loadRichMarkers: function(){
                return new Promise(function(resolve, reject){
                                       Ext.Loader.loadScript({
                                           //TODO this needs to be configurable
                                           url: '/ui2/ext/src/ux/ExtGMaps/vendor/richmarker-compiled.js', 
                                           onLoad: function(){
                                               resolve();
                                           },
                                           onError: function(){
                                               reject(new Error('RichMarker extension failed to load'));
                                           }
                                       });
                                   });
            },

        });
    }
});
