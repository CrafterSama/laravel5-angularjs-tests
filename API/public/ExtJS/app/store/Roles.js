/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.store.Roles', {
    extend: 'Ext.data.Store',

    model: 'sad.model.Role',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/roles',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});