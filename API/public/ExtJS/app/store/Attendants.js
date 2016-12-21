/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.store.Attendants', {
    extend: 'Ext.data.Store',

    model: 'sad.model.Attendant',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/attendants',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});