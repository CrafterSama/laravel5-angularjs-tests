/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.store.Courses', {
    extend: 'Ext.data.Store',

    model: 'sad.model.Course',

    autoLoad: false,

    proxy: {
        type: 'ajax',
        url: '/courses',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});