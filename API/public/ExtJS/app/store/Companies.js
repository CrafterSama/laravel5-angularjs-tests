/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.store.Companies', {
    extend: 'Ext.data.Store',

    model: 'sad.model.Company',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/companies',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});