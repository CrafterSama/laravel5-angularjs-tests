/**
 * Created by javierrincon on 12/3/15.
 */
Ext.define('sad.model.User', {
    extend: 'Ext.data.Model',

    fields: ['id', 'name', 'email', 'id_rol', 'created_at', 'updated_at']
});