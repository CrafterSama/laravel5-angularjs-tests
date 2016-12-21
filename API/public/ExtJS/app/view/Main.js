Ext.define('sad.view.Main', {
    extend: 'Ext.container.Container',
    requires:[
        'Ext.tab.Panel',
        'Ext.layout.container.Border',
        'sad.controller.Company',
        'sad.controller.User',
        'sad.controller.Course',
        'sad.controller.Signer',
        'sad.controller.Attendant',
        'sad.controller.Main'
    ],
    
    xtype: 'app-main',

    itemId: 'main',

    alias: 'widget.mainPage',

    renderTo: Ext.getBody(),

    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    width: 1000,

    items: [{
        xtype: 'toolbar',
        itemId: 'mainToolbar',
        items: [
            "->",
            {
                text: 'Companies',
                itemId: 'companiesButton',
                menu: ['-']
            },
            {
                text: 'Settings',
                itemId: 'settings',
            },
            {
                text: 'Logout',
                itemId: 'logout',
                href: 'auth/logout',
                hrefTarget: '_self'
            }
        ]
    },{
        xtype: 'panel',
        layout: 'card',
        flex: 1,
        itemId: 'main'
    }]
});