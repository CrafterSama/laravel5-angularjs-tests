/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.store.Users', {
    extend: 'Ext.data.Store',

    model: 'sad.model.User',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/users',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});