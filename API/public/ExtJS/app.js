/*
    This file is generated and updated by Sencha Cmd. You can edit this file as
    needed for your application, but these edits will have to be merged by
    Sencha Cmd when upgrading.
*/

Ext.application({
    name: 'sad',

    extend: 'sad.Application',

    controllers: ['Company', 'User', 'Course', 'Signer', 'Attendant', 'Main'],

    views: [
        'sad.view.Main'
    ],
    
    autoCreateViewport: false,

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: {
                type: 'vbox',
                align: 'center'
            },
            //width: 1000,
            items: {
                xtype: 'mainPage',
                flex: 1
            }
        });
    }
});
