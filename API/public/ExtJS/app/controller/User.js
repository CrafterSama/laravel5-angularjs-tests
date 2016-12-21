/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.controller.User', {
    extend: 'Ext.app.Controller',

    views: [
        'User.list'
    ],

    refs: [{
        ref: 'mainTabs',
        selector: 'viewport tabpanel#mainTabs'
    }],

    stores: ['Users', 'Roles'],

    init: function() {
        var me = this;
        me.control({
            // viewport top toolbar buttons
            'viewport toolbar#mainToolbar > button#users': {
                click: me.usersList
            }
        });
    },

    /**
     * Shows a grid of companies
     */
    usersList: function(){
        var me = this,
            tabs = me.getMainTabs(),
            view = tabs.down('panel#usersList');
            
        if(!view){
            view = tabs.add(me.getView('User.list').create({
                store: me.getStore('Users'),
                roleStore: me.getStore('Roles'),
                closable: true
            }));
        }
        tabs.setActiveTab(view);
    }
});