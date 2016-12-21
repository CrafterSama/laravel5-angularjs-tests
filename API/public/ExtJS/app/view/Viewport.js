Ext.define('sad.view.Viewport', {
    extend: 'Ext.container.Viewport',
    requires:[
        'Ext.layout.container.Auto',
        'sad.view.Main'
    ],

    /*layout: {
        type: 'fit'
    },*/

    items: [{
        xtype: 'app-main'
    }]
});
