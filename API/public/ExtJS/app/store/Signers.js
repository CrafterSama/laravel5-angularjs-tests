/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.store.Signers', {
    extend: 'Ext.data.Store',

    model: 'sad.model.Signer',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/signers',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});